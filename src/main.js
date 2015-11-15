
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ArticleList from './components/ArticleList';

var articles = [
    {
        title: 'Saturn',
        description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of'
    },
    {
        title: 'Mercury',
        description: 'Mercury is the smallest and closest to the Sun of the eight planets in the Solar System, with an orbital period of about 88 Earth days. Seen from Earth, it appears'
    }
];

class HontoApp extends Component {
    render() {
        return (
            <div>
                <h1>Honto</h1>
                <ArticleList articles={articles} />
            </div>
        );
    }
}

ReactDOM.render(<HontoApp />, document.getElementById('container'));