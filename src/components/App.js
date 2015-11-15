
import { Component } from 'react';

import ArticleList from './ArticleList';
import { articles } from '../core/Articles'

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Honto</h1>
                <ArticleList articles={articles} />
                {this.props.children}
            </div>
        );
    }
}
