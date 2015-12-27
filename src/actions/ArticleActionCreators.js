
import Dispatcher from '../core/Dispatcher';

import ArticleStore from '../stores/ArticleStore';

// Action creators are the helper methods defined in this file
// The actual actions are the data structures that are passed
// to the dispatcher and then propagated to the stores

export default {
    loadFromStorage() {
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
            });

            Dispatcher.dispatch({
                type: 'ARTICLE_SETARTICLES',
                articles: articlesToBeLoaded,
                lastPullTime: parsedObject.lastPullTime
            });
        }
    },
    getNewArticles() {
        $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&grnlimit=10&callback=?',
            (result) => {
                let pages = result.query.pages;
                let allArticles = ArticleStore.getAll();

                // First remove the unstarred ones since these will be
                // replaced by the new articles from the call above
                allArticles = allArticles.filter((article) => {
                     return article.starred === true
                });

                Object.keys(pages).forEach((key) => {
                    let page = pages[key];
                    allArticles.push({
                        id: page.pageid,
                        title: page.title,
                        starred: false
                    });
                });

                Dispatcher.dispatch({
                    type: 'ARTICLE_SETARTICLES',
                    articles: allArticles,
                    lastPullTime: new Date().getTime()
                });
            });
    },
    star(id) {
        Dispatcher.dispatch({
            type: 'ARTICLE_STAR',
            id
        });
    },
    unstar(id) {
        Dispatcher.dispatch({
            type: 'ARTICLE_UNSTAR',
            id
        });
    },
    loadArticleWithContent({id, content, title}) {
        Dispatcher.dispatch({
            type: 'ARTICLE_LOADARTICLEWITHCONTENT',
            id,
            content,
            title
        });
    }
}