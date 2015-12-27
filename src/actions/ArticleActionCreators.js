
import Dispatcher from '../core/Dispatcher';

// Action creators are the helper methods defined in this file
// The actual actions are the data structures that are passed
// to the dispatcher and then propagated to the stores

export default {
    loadList(articles) {
        Dispatcher.dispatch({
            type: 'ARTICLE_LOADLIST',
            articles
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