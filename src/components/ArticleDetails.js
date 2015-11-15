
import { Component } from 'react';
import { articles } from '../core/Articles'

export default class ArticleDetails extends Component {
    render() {

        let { title, description } = articles.find((a) => {
            if (a.id === parseInt(this.props.params.articleId)) {
                return a;
            }
        })

        return (
            <div>
                <p>Details {title}</p>
                <p>{description}</p>
            </div>
        );
    }
}