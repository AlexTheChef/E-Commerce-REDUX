import {combineReducers} from 'redux'
import storeReducer from './storeReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer from './loginReducer'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['store', 'isLogin']
}

const reducers = combineReducers({
    store: storeReducer,
    isLogin: loginReducer
})

export default persistReducer(persistConfig, reducers)