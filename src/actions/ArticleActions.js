
import Dispatcher from '../core/Dispatcher';

export default {
    loadList(articles) {
        Dispatcher.dispatch({
            type: 'ARTICLE_LOADLIST',
            articles
        });
    },
    loadContent({id, content}) {
        Dispatcher.dispatch({
            type: 'ARTICLE_LOADCONTENT',
            id,
            content
        });
    }
}