import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form'; // Lets us bring form state into store, so form state can persist across views (contrast to LocalForm)
import { Comments } from './comments';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger'; // Logs action nicely to console (prev state, action, next state)
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            comments: Comments,
            dishes: Dishes,
            leaders: Leaders,
            promotions: Promotions,
            ...createForms({
                feedback: InitialFeedback,
            }),
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}