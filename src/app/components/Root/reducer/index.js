import {LOADED} from "../action"

export default function (state = {}, action) {
    const {type,isLoading} = action;
    switch (type) {
        case LOADED:
            return {
                ...state,
                isLoading
            }
        default:
            return {
                ...state,
                weather:true
            }
    }
}