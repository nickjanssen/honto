
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

        if (!storageObject) {
            $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&grnlimit=10&callback=?',
                (result) => {
                    let pages = result.query.pages;
                    Object.keys(pages).forEach((key) => {
                        let page = pages[key];
                        ArticleActions.add({
                            id: page.pageid,
                            title: page.title
                        });
                    });

                    this.save();
                });
        }
        else {
            let storedArticles = JSON.parse(storageObject);

            storedArticles.forEach(({id, title}) => {
                ArticleActions.add({
                    id,
                    title
                });
            })
        }
    }
    save() {
        // Put the object into storage
        localStorage.setItem('hontoStorage', JSON.stringify(_articles));
    }
    getAll() {
        return _articles
    }
}

const articleStore = new ArticleStore();

Dispatcher.register(({type, id, title, description}) => {
    switch (type) {
        case 'ARTICLE_ADD':
            _articles.push({
                id,
                title,
                description
            });
            articleStore.onChangeSignal.dispatch();
        break;
        case 'ARTICLE_LOAD':
            _articles.find((a) => {
                if (a.id === parseInt(id)) {
                    a.description = description;
                }
            });
            articleStore.onChangeSignal.dispatch();
        break;
    };
});

export default articleStore;