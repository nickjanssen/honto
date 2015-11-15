
import { Component } from 'react';

import ArticleList from './ArticleList';

var articles = [
    {
        id: 1,
        title: 'Saturn',
        description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of'
    },
    {
        id: 2,
        title: 'Mercury',
        description: 'Mercury is the smallest and closest to the Sun of the eight planets in the Solar System, with an orbital period of about 88 Earth days. Seen from Earth, it appears'
    }
];

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Honto</h1>
                <ArticleList articles={articles} />
            </div>
        );
    }
}
