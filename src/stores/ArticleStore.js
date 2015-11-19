
import Dispatcher from '../core/Dispatcher';
import Signal from 'signals';

import ArticleActions from '../actions/ArticleActions';

let _articles = [];

class ArticleStore {
    constructor() {
        this.onChangeSignal = new Signal();
    }
    load({ forceNewArticles }) {
        let isExpired = forceNewArticles || false;

        let storageObject = localStorage.getItem('hontoStorage');

        // If we have anything stored locally, load it
        if (storageObject) {
            let parsedObject = JSON.parse(storageObject);
            let articlesToBeLoaded = [];

            parsedObject.articles.forEach(({id, title, starred}) => {
                articlesToBeLoaded.push({
                    id,
                    title,
                    starred
                });
            })

            ArticleActions.loadList(articlesToBeLoaded);

            // Check if we need to pull new articles
            if (parsedObject.lastPullTime < new Date().getTime() - 30000) {
                isExpired = true;
            }
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
                            title: page.title,
                            starred: false
                        });
                    });

                    ArticleActions.loadList(articlesToBeLoaded);

                    this.save({ updateLastPullTime: true });
                });
        }

    }
    save({ updateLastPullTime }) {
        let storageObject = localStorage.getItem('hontoStorage');

        // Put the object into storage
        let serializedStorageObject = storageObject ? JSON.parse(storageObject) : {};

        if (updateLastPullTime) {
            serializedStorageObject.lastPullTime = new Date().getTime();
        }

        serializedStorageObject.articles = _articles;

        localStorage.setItem('hontoStorage', JSON.stringify(serializedStorageObject));
    }
    getAll() {
        return _articles;
    }
}

const articleStore = new ArticleStore();

Dispatcher.register(({type, id, articles, content, title}) => {
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

            articleStore.save({ updateLastPullTime: false });

            articleStore.onChangeSignal.dispatch();
        break;
        case 'ARTICLE_UNSTAR':
            _articles.find((a) => {
                if (a.id === parseInt(id)) {
                    a.starred = false;
                }
            });

            articleStore.save({ updateLastPullTime: false });

            articleStore.onChangeSignal.dispatch();
        break;
    };
});

export default articleStore;