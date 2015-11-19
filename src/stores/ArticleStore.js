
import Dispatcher from '../core/Dispatcher';
import Signal from 'signals';

import ArticleActions from '../actions/ArticleActions';

let _articles = [];

class ArticleStore {
    constructor() {
        this.onChangeSignal = new Signal();
    }
    load() {
        // Retrieve the object from storage
        let storageObject = localStorage.getItem('hontoStorage');

        let isExpired = false;

        // If we have anything stored locally, load it
        if (storageObject) {
            let parsedObject = JSON.parse(storageObject);
            let articlesToBeLoaded = [];

            parsedObject.articles.forEach(({id, title}) => {
                articlesToBeLoaded.push({
                    id,
                    title
                });
            })

            // Check if we need to pull new articles
            if (parsedObject.lastPull < new Date().getTime() - 10000) {
                isExpired = true;
            }

            ArticleActions.loadList(articlesToBeLoaded);
        }

        if (!storageObject || isExpired) {

            $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&grnlimit=10&callback=?',
                (result) => {
                    let pages = result.query.pages;
                    let articlesToBeLoaded = [];

                    Object.keys(pages).forEach((key) => {
                        let page = pages[key];
                        articlesToBeLoaded.push({
                            id: page.pageid,
                            title: page.title
                        });
                    });

                    ArticleActions.loadList(articlesToBeLoaded);

                    this.save();
                });
        }

    }
    save() {
        // Put the object into storage
        localStorage.setItem('hontoStorage', JSON.stringify({
            lastPull: new Date().getTime(),
            articles: _articles
        }));
    }
    getAll() {
        return _articles
    }
}

const articleStore = new ArticleStore();

Dispatcher.register(({type, id, articles, content}) => {
    switch (type) {
        case 'ARTICLE_LOADLIST':

            // First remove the unstarred ones
            _articles = _articles.filter((article) => {
                 return article.starred === true
            });

            articles.forEach(({id, title, starred}) => {
                _articles.push({
                    id,
                    title,
                    starred: starred ? true : false
                });
            });

            articleStore.onChangeSignal.dispatch();
        break;
        case 'ARTICLE_LOADCONTENT':
            _articles.find((a) => {
                if (a.id === parseInt(id)) {
                    a.content = content;
                }
            });

            articleStore.onChangeSignal.dispatch();
        break;
    };
});

export default articleStore;