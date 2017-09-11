
import helper from "libs/helper"
export const ADMIN_ARTICLE_LIST = "admin_article_list"

export default function getArticleLists(params) {
    return async function (dispatch) {
        const lists = await helper.getJson("/admin/articleList", params)
        dispatch({
            type: ADMIN_ARTICLE_LIST,
            lists
        })
    }
}
