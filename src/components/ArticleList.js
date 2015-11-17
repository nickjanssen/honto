
import { Component } from 'react';

import ArticleStarButton from './ArticleStarButton';
import ArticleLink from './ArticleLink';
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
            renderedArticles.push(
                <ArticleLink key={id} id={id} title={title} content={content} articles={this.state.articles}/>
            );
        });

        return (
            <div>
                {renderedArticles}
            </div>
        );
    }
}