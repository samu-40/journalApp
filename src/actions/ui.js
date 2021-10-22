import { types } from "../types/types";

export const setError = (msgError) => ({

    type: types.uiSetError,
    payload: msgError

});

export const unsetError = () => ({

    type: types.uiUnsetError

});

export const startLoading = () => (

    {
        type: types.uiStartLoading
    }

);

export const finishLoading = () => (

    {
        type: types.uiFinishLoading
    }

);