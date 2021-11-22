export const addToCart = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'addToCart',
            payload: data
        })
    }
}

export const onRemove = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'onRemove',
            payload: data
        })
    }
}

export const emptyCart = () => {
    return (dispatch) => {
        dispatch({
            type: 'emptyCart',
        })
    }
}

export const isLogin = (value) => {
    return (dispatch) => {
        dispatch({
            type: 'isLogin',
            payload: value
        })
    }
}
