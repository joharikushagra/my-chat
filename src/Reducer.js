export const initialState = {
    user:null,
}

export const actionTypes = {
    SET_USER:"SET_USER",
    UNSET_USER:"UNSET__USER"
};

const reducer = (state,action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user:action.user
            };
        case actionTypes.UNSET_USER:
            return {
                ...state,
                user:action.user
            };
        default: 
           return state;
    }
};

export default reducer;