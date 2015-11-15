
import { Component } from 'react';

import ArticleStarButton from './ArticleStarButton';
import ArticleLink from './ArticleLink';

export default class ArticleList extends Component {
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