
import { Component } from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from './App';
import ArticleList from './ArticleList';
import ArticleDetails from './ArticleDetails';

class StarredList extends Component {
    render() {
        return (
            <ArticleList starred={true} />
        )
    }
}

export default class Routes extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Route path="/" component={App}>
                    <IndexRoute component={ArticleList} />
                    <Route path="details/:articleId" component={ArticleDetails}/>
                    <Route path="starred" component={StarredList}/>
                </Route>
            </Router>
        );
    }
}
