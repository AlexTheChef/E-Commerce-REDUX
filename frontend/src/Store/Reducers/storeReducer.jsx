import actionTypes from '../Action-creators/action-types'

const reducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const exist = state.find((item) => item.id === action.payload.id)
            return (exist ? state.map((item) => item.id === action.payload.id ? { ...exist, quantity: exist.quantity + 1 } : item) : [...state, { ...action.payload, quantity: 1 }])
        case actionTypes.REMOVE_CART_ITEM:
            const contain = state.find((item) => item.id === action.payload.id)
            return (contain.quantity === 1 ? state.filter((item) => item.id !== action.payload.id) : state.map((item) => item.id === action.payload.id ? { ...contain, quantity: contain.quantity - 1 } : item))
        case actionTypes.EMPTY_CART:
            return (state = [])
        default:
            return state
    }
}

export default reducer