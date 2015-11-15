
import { Component } from 'react';

import { Link } from 'react-router'

export default class ArticleLink extends Component {
    render() {
        return (
            <div>
                <Link to={`/details/${this.props.id}`}>{this.props.title}</Link>
            </div>
        );
    }
}