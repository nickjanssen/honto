
import { Component } from 'react';

import ArticleStore from '../stores/ArticleStore';

import { Router, Route, Link, IndexLink } from 'react-router'

const ACTIVE = { color: 'red' }
require('./App.less');

export default class App extends Component {
    componentDidMount() {
        ArticleStore.load();
    }
    render() {

        return (
            <div>
                <h1>Honto</h1>
                <ul className="nav">
                  <li><IndexLink to="/"           activeStyle={ACTIVE}>Articles</IndexLink></li>
                  <li><IndexLink to="/starred"    activeStyle={ACTIVE}>Starred</IndexLink></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}
