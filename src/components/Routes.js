
import { Component } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from './App';
import ArticleList from './ArticleList';
import ArticleDetails from './ArticleDetails';

export default class Routes extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Route path="/" component={App}>
                    <IndexRoute component={ArticleList} />
                    <Route path="details/:articleId" component={ArticleDetails}/>
                    {/* <Route path="starred" component={StarredArticles}/> */}
                </Route>

            </Router>
        );
    }
}
