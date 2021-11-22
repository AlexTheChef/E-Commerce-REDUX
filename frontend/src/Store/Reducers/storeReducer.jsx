const reducer = (state = [], action) => {
    switch (action.type) {
        case 'addToCart':
            const exist = state.find((item) => item.id === action.payload.id)
            return (exist ? state.map((item) => item.id === action.payload.id ? { ...exist, quantity: exist.quantity + 1 } : item) : [...state, { ...action.payload, quantity: 1 }])
        case 'onRemove':
            const contain = state.find((item) => item.id === action.payload.id)
            return (contain.quantity === 1 ? state.filter((item) => item.id !== action.payload.id) : state.map((item) => item.id === action.payload.id ? { ...contain, quantity: contain.quantity - 1 } : item))
        case 'emptyCart':
            return (state = [])
        default:
            return state
    }
}

export default reducer