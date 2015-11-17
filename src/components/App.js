
import { Component } from 'react';

import ArticleStore from '../stores/ArticleStore';

export default class App extends Component {
    componentDidMount() {
        ArticleStore.load();
    }
    render() {
        return (
            <div>
                <h1>Honto</h1>
                {this.props.children}
            </div>
        );
    }
}
