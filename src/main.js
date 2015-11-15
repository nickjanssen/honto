
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ArticleList from './components/ArticleList';

class HontoApp extends Component {
    render() {
        return (
            <div>
                <h1>Honto</h1>
                <ArticleList />
            </div>
        );
    }
}

ReactDOM.render(<HontoApp />, document.getElementById('container'));