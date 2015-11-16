
import Dispatcher from '../core/Dispatcher';

export default {
    add({title, description}) {
        Dispatcher.dispatch({
          type: 'ARTICLE_ADD',
          title,
          description
        });
    }
}