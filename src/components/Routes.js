
import { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from './App';
import ArticleDetails from './ArticleDetails';

export default class Routes extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Route path="/" component={App}>
                    <Route path="details/:articleId" component={ArticleDetails}/>
                    {/* <Route path="starred" component={StarredArticles}/> */}
                </Route>
            </Router>
        );
    }
}
