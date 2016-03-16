import { createStore } from 'redux';

const store = createStore((state = {}, action) => {
    state = action.data;
    
    return state;
});

export default store;