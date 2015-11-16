
import { Component } from 'react';

import ArticleStarButton from './ArticleStarButton';
import ArticleLink from './ArticleLink';
import ArticleStore from '../stores/ArticleStore';

import ArticleActions from '../actions/ArticleActions';

export default class ArticleList extends Component {
    _buildStateFromStore() {
        return {
            articles: ArticleStore.getAll()
        };
    }
    constructor() {
        super();
        this.state = this._buildStateFromStore();
    }
    componentDidMount() {
        $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&grnlimit=10&callback=?',
            (result) => {
                console.log(result.query.pages);
            });

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

        this.props.articles.forEach(article => {
            let { id, title, description } = article;
            renderedArticles.push(
                <ArticleLink key={id} id={id} title={title} description={description} />
            );
        });

        return (
            <div>
                {renderedArticles}
            </div>
        );
    }
}