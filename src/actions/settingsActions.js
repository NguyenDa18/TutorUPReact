import { DISABLE_ON_ADD, DISABLE_ON_EDIT, ALLOW_REGISTRATION }from './types';

export const setDisableOnAdd = () => {
    return {
        type: DISABLE_ON_ADD
    }
}

export const setDisableOnEdit = () => {
    return {
        type: DISABLE_ON_EDIT
    }
}

export const setAllowRegistration = () => {
    return {
        type: ALLOW_REGISTRATION
    }
}

