
import { Component } from 'react';

import ArticleStarButton from './ArticleStarButton';
import ArticleLink from './ArticleLink';

export default class ArticleList extends Component {
    render() {
        var renderedArticles = [];

        this.props.articles.forEach(article => {
            let { title, description } = article;
            renderedArticles.push(
                <ArticleLink key={title} title={title} description={description} />
            );
        });

        return (
            <div>
                {renderedArticles}
            </div>
        );
    }
}