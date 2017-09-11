import helper from "libs/helper"
export const ARTICLE_LIST = "article_list"
export const ARTICLE_RANKING = "article_ranking"
export const ARTICLE_UPLOAD = "article_upload"
export const PAGE_VIEW = "pageView"

/*export default function getInfosLists(params) {
  return async function(dispatch) {
    const lists = await helper.getJson("/infos/lists", params)
    dispatch({
      type: INFOS_LIST,
      lists
    })
  }
}
*/
export default function getArticleLists(params) {
  return async function(dispatch) {
    const lists = await helper.getJson("/article/lists", params)
    dispatch({
      type: ARTICLE_LIST,
      lists
    })
  }
}

//默认 喜欢 降序排列
export function getArticleRanking(type = "like") {
  return async function(dispatch) {
    const ranking = await helper.getJson("/article/ranking", { type })
    dispatch({
      type: ARTICLE_RANKING,
      ranking
    })
  }
}

//上传文章
export function uploadArticle(articleInfo) {
  return async function(dispatch) {
    const info = await helper.postJson('/article/add-article', articleInfo)
    dispatch({
      type: ARTICLE_UPLOAD,
      info
    })
  }
}

//pv统计
export function addPageView(id, countTime) {
  return async function(dispatch) {
    const info = await helper.postJson("/article/addPageView", { articleId: id, countTime })
    dispatch({
      type: PAGE_VIEW,
      info
    })
  }
}