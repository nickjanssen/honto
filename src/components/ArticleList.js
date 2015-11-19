
import { Component } from 'react';

import ArticleLink from './ArticleLink';
import ArticleStar from './ArticleStar';
import ArticleStore from '../stores/ArticleStore';

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

        this.setState({loading: true});

        ArticleStore.load({});
    }
    componentWillUnmount() {
        ArticleStore.onChangeSignal.remove(this._onChange);
    }
    _onChange() {
        this.setState(this._buildStateFromStore());
        this.setState({loading: false});
    }
    _flushArticles() {
        ArticleStore.load({ forceNewArticles: true });
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
        let loadingSpinner = this.state.loading ? (<i className="fa fa-spin fa-refresh fa-spacer"></i>) : '';
        let getFreshArticlesLink = null;
        if (!this.props.starred) {
            getFreshArticlesLink = (
                <div>
                    <a href="#" onClick={this._flushArticles.bind(this)}>Get fresh articles</a>
                    {loadingSpinner}
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
