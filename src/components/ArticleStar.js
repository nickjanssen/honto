
import { Component } from 'react';

import { Link } from 'react-router'
import ArticleActionCreators from '../actions/ArticleActionCreators';

require('./ArticleStar.less');

export default class ArticleStar extends Component {
    handleClick() {
        if (this.props.starred) {
            ArticleActionCreators.unstar(this.props.id);
        }
        else {
            ArticleActionCreators.star(this.props.id);
        }
    }
    render() {
        return (
            <div>
                <div className="articleStar">
                    <i onClick={this.handleClick.bind(this)} className={this.props.starred ? "fa fa-star" : "fa fa-star-o"}></i>
                </div>
            </div>
        );
    }
}