
import { Component } from 'react';

export default class ArticleDetails extends Component {
    render() {
        return (
            <div>
                <p>{this.props.title}</p>
                <p>{this.props.description}</p>
            </div>
        );
    }
}