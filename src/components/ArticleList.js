
import { Component } from 'react';

import ArticleStarButton from './ArticleStarButton';
import ArticleLink from './ArticleLink';
import ArticleStore from '../stores/ArticleStore';

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
        this.setState(this._buildStateFromStore());
    }
    render() {
        var renderedArticles = [];

        this.state.articles.forEach(article => {
            let { id, title, content } = article;
            if (article.starred === this.props.starred) {
                renderedArticles.push(
                    <div key={id}>
                        <div className="starArticle">
                            <i className="fa fa-star-o"></i>
                        </div>
                        <ArticleLink id={id} title={title} content={content} articles={this.state.articles}/>
                    </div>
                );
            }
        });

        return (
            <div>
                {this.props.starred ? 'Starred' : 'Not starred'}
                {renderedArticles}
            </div>
        );
    }
}

// For now the only way to specify default props in ES2015
ArticleList.defaultProps = {
    starred: false
}
