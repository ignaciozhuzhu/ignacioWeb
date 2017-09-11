export const LOADED = "loaded"

export default function loaded(isLoading) {
    return function (dispatch) {
        dispatch({
            type: LOADED,
            isLoading
        })
    }
}
