import axios from 'axios'
const factory = async (method, slug = null, authToken, body = null) => {

    if (slug)
        return await axios({
            method,
            url: `${process.env.REACT_APP_API}/categories/${slug}`,
            data: { ...body },
            headers: { authToken }
        })
    return await axios({
        method,
        url: `${process.env.REACT_APP_API}/categories/`,
        data: body,
        headers: { authToken }
    })
}
export const getCategories = () => factory('get')
export const getCategory = (slug) => factory('get', slug)
export const updateCategory = (authToken, body, slug) => factory('patch', slug, authToken, body)
export const createCategory = (authToken, body) => factory('post', null, authToken, body)
export const deleteCategory = (authToken, slug) => factory('delete', slug, authToken)
export const getCategorySubs = async (id) => {
    return await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API}/categories/${id}/subCategories`
    }
    )
}