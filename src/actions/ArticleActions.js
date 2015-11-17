
import Dispatcher from '../core/Dispatcher';

export default {
    add({id, title}) {
        Dispatcher.dispatch({
            type: 'ARTICLE_ADD',
            id,
            title
        });
    },
    load({id, description}) {
        Dispatcher.dispatch({
            type: 'ARTICLE_LOAD',
            id,
            description
        });
    }
}