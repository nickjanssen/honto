
import { Component } from 'react';

import ArticleLink from './ArticleLink';
import ArticleStar from './ArticleStar';
import ArticleStore from '../stores/ArticleStore';
import ArticleActionCreators from '../actions/ArticleActionCreators';

require('./ArticleList.less');

export default class ArticleList extends Component {
    _buildStateFromStore() {
        return {
            articles: ArticleStore.getAll()
        };
    }
    constructor() {
        super();
        this.state = this._buildStateFromStore();

        // React components using ES6 classes no longer autobind this to non React methods
        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
        ArticleStore.onChangeSignal.add(this._onChange);
    }
    componentWillUnmount() {
        ArticleStore.onChangeSignal.remove(this._onChange);
    }
    _onChange() {
        let storeState = this._buildStateFromStore();
        this.setState(storeState);

        this.setState({loading: false});
    }
    _getNewArticles() {
        ArticleActionCreators.getNewArticles();

        this.setState({loading: true});
    }
    render() {
        var renderedArticles = [];

        this.state.articles.forEach((article, index) => {
            let { id, title, content } = article;
            if (article.starred === this.props.starred) {
                renderedArticles.push(
                    <div key={id}>
                        <ArticleStar id={id} starred={article.starred} />
                        <ArticleLink id={id} title={title} content={content}/>
                    </div>
                );
            }
        });

        let now = new Date();
        let lastPullTime = ArticleStore.getLastPullTime();
        let waitMessage;
        let secondsPast = ((lastPullTime + 86400 * 1000) - now.getTime()) / 1000;

        if (secondsPast < 60) {
            waitMessage = parseInt(secondsPast) + ' seconds';
        }
        else if (secondsPast < 3600) {
            waitMessage = parseInt(secondsPast / 60) + ' minutes';
        }
        else if (secondsPast <= 86400) {
            waitMessage = parseInt(secondsPast / 3600) + ' hours';
        }

        let loadingSpinner = this.state.loading ? (<i className="fa fa-spin fa-refresh fa-spacer"></i>) : '';
        let getFreshArticlesLink = null;
        if (!this.props.starred) {
            getFreshArticlesLink = (
                <div>
                    <p>10 new articles will be shown in {waitMessage}.&nbsp;
                    <a href="#" onClick={this._getNewArticles.bind(this)}>Show me now</a>
                    {loadingSpinner}</p>
                </div>
            );
        }

        return (
            <div>
                {getFreshArticlesLink}
                <div className="articles">
                    {renderedArticles}
                </div>
            </div>
        );
    }
}

// For now the only way to specify default props in ES2015
ArticleList.defaultProps = {
    starred: false
}
