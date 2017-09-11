import { ADMIN_ARTICLE_LIST } from "../action"
const nameInitialState = []

export default function (state = nameInitialState, action) {
    const { type } = action;
    switch (type) {
        case ADMIN_ARTICLE_LIST:
            return {
                ...state,
                lists:action.lists.data
            }
        default:
            return state
    }
}