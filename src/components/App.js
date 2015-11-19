
import { Component } from 'react';

import { Router, Route, Link, IndexLink } from 'react-router'

require('../lib/font-awesome-4.4.0/css/font-awesome.css');
require('./App.less');

export default class App extends Component {
    render() {

        return (
            <div>
                <h1>Hontō</h1>
                <p>Learn 10 new facts every day!</p>
                <ul className="nav">
                  <li><IndexLink to="/" activeClassName="active">Articles</IndexLink></li>
                  <li><IndexLink to="/starred" activeClassName="active">Starred</IndexLink></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}
