const loginReducer = (state = 0, action) => {
    if(action.type === 'isLogin') {
            return (state = action.payload) 
    } else {
        return state
    }
}

export default loginReducer