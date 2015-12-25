
import Dispatcher from '../core/Dispatcher';

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