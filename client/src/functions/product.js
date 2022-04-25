import axios from 'axios'
const factory = async (method, slug = null, authToken, body = null) => {

    if (slug)
        return await axios({
            method,
            url: `${process.env.REACT_APP_API}/products/slug/${slug}`,
            data: { ...body },
            headers: { authToken }
        })
    return await axios({
        method,
        url: `${process.env.REACT_APP_API}/products/`,
        data: body,
        headers: { authToken }
    })
}
export const getProducts = () => factory('get')
export const getProduct = (slug, populate) => factory('post', slug, undefined, { populate })
export const updateProduct = (authToken, body, slug) => factory('patch', slug, authToken, body)
export const createProduct = (authToken, body) => factory('post', null, authToken, body)
export const deleteProduct = (authToken, slug) => factory('delete', slug, authToken)
export const getProductsByQuery = async (body) => {
    return await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/products/list`,
        data: { ...body }

    })
}
export const getFilteredProducts = async (body) => {
    return await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API}/products/filter`,
        data: { ...body }

    })
}