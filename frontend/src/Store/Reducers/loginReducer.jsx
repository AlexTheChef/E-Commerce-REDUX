import actionTypes from '../Action-creators/action-types'

const loginReducer = (state = 0, action) => {
    if(action.type === actionTypes.LOGED_IN) {
            return (state = action.payload) 
    } else {
        return state
    }
}

export default loginReducer