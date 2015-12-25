
import { Component } from 'react';

import ArticleStar from './ArticleStar';
import ArticleStore from '../stores/ArticleStore';
import ArticleActions from '../actions/ArticleActions';

export default class ArticleDetails extends Component {
    constructor() {
        super();
        this.state = this._buildStateFromStore();

        // React components using ES6 classes no longer autobind this to non React methods
        this._onChange = this._onChange.bind(this);
    }
    _buildStateFromStore() {
        return {
            articles: ArticleStore.getAll()
        };
    }
    componentDidMount() {
        var id = this.props.params.articleId;
        $.getJSON(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&rvparse&rvsection=0&pageids=${id}&callback=?`,
            (result) => {
                let page = result.query.pages[id];
                let content = page.revisions[0]['*'];
                ArticleActions.loadArticleWithContent({
                    id: id,
                    title: page.title,
                    content: content
                });
            });

        ArticleStore.onChangeSignal.add(this._onChange);
    }
    componentWillUnmount() {
        ArticleStore.onChangeSignal.remove(this._onChange);
    }
    _onChange() {
        this.setState(this._buildStateFromStore());
    }
    getSanitizedWikiContent(content) {
        // We trust Wikipedia though
        // https://facebook.github.io/react/tips/dangerously-set-inner-html.html

        // Convert hrefs so they refer to Wikipedia's domain
        // and add a target="_blank" so links open in a new window
        if (content) {
            content = content.replace(/href="\/wiki/g, "target=\"_blank\" href=\"https://en.wikipedia.org/wiki");
        }

        return {
            __html: content
        }
    }
    render() {

        let articles = ArticleStore.getAll();

        let foundArticle = articles.find((a) => {
            if (a.id === parseInt(this.props.params.articleId)) {
                return a;
            }
        });

        if (foundArticle) {
            let { id, starred, title, content } = foundArticle;

            return (
                <div>
                    <h2><ArticleStar id={id} starred={starred} /> {title}</h2>
                    <div dangerouslySetInnerHTML={this.getSanitizedWikiContent(content)}></div>
                </div>
            );
        }
        else {
            return (
                <div>Loading    </div>
            );
        }
    }
}