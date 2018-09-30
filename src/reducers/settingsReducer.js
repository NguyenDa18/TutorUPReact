import { DISABLE_ON_ADD, DISABLE_ON_EDIT, ALLOW_REGISTRATION }from '../actions/types';

const initialState = {
    disableonAdd: true,
    disableonEdit: false,
    allowRegistration: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case DISABLE_ON_ADD:
            return {
                ...state,
                disableonAdd: !state.disableonAdd
            }
        case DISABLE_ON_EDIT:
            return {
                ...state,
                disableonEdit: !state.disableonEdit
            }
        case ALLOW_REGISTRATION:
            return {
                ...state,
                allowRegistration: !state.allowRegistration
            }
        default: 
            return state
    }
    
}