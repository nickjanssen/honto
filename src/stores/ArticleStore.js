
import Dispatcher from '../core/Dispatcher';
import Signal from 'signals';

import ArticleActionCreators from '../actions/ArticleActionCreators';

let _articles = [];
let _lastPullTime = 0;

class ArticleStore {
    constructor() {
        this.onChangeSignal = new Signal();

        this.onChangeSignal.add(this.saveToStorage);
    }
    saveToStorage() {
        let storageObject = localStorage.getItem('hontoStorage');

        // Put the object into storage
        let serializedStorageObject = storageObject ? JSON.parse(storageObject) : {};

        serializedStorageObject.articles = _articles;
        serializedStorageObject.lastPullTime = _lastPullTime;

        localStorage.setItem('hontoStorage', JSON.stringify(serializedStorageObject));
    }
    getAll() {
        return _articles;
    }
}

const articleStore = new ArticleStore();

Dispatcher.register(({type, id, articles, content, title, lastPullTime}) => {
    switch (type) {
        case 'ARTICLE_SETARTICLES':
            _articles = [];

            articles.forEach(({id, title, starred}) => {
                _articles.push({
                    id,
                    title,
                    starred: starred ? true : false
                });
            });

            _lastPullTime = lastPullTime;

            articleStore.onChangeSignal.dispatch();
        break;
        case 'ARTICLE_LOADARTICLEWITHCONTENT':
            let article = _articles.find((a) => {
                return a.id === parseInt(id);
            });

            // We either provide details to an existing article in the list
            // or we push one if it doesn't exist yet, in the case
            // someone tries to load an article with an ID after the list
            // was reset to 10 new articles.

            if (!article) {
                article = { id: parseInt(id) };
                _articles.push(article);
            }

            article.title = title;
            article.content = content;

            articleStore.onChangeSignal.dispatch();
        break;
        case 'ARTICLE_STAR':
            _articles.find((a) => {
                if (a.id === parseInt(id)) {
                    a.starred = true;
                }
            });

            articleStore.onChangeSignal.dispatch();
        break;
        case 'ARTICLE_UNSTAR':
            _articles.find((a) => {
                if (a.id === parseInt(id)) {
                    a.starred = false;
                }
            });

            articleStore.onChangeSignal.dispatch();
        break;
    };
});

export default articleStore;