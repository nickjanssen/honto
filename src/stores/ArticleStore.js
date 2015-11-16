
import Dispatcher from '../core/Dispatcher';

import Signal from 'signals';

let _articles = [];

class ArticleStore {
    constructor() {
        this.onChangeSignal = new Signal();
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
            })
            articleStore.onChangeSignal.emit();
        break;
    };
});

export default articleStore;