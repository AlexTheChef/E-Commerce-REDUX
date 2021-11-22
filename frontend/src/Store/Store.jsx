import { applyMiddleware, createStore } from 'redux'
import reducers from './Reducers/index'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)

export const Login = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)

export const persistor = persistStore(store, Login)

