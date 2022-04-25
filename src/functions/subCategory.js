import axios from 'axios'
const factory = async (method, slug = null, authToken, body = null) => {

    if (slug)
        return await axios({
            method,
            url: `${process.env.REACT_APP_API}/subCategories/${slug}`,
            data: { ...body },
            headers: { authToken }
        })
    return await axios({
        method,
        url: `${process.env.REACT_APP_API}/subCategories/`,
        data: body,
        headers: { authToken }
    })
}

export const getSubCategories = () => factory('get')
export const getSubCategory = (slug) => factory('get', slug)
export const updateSubCategory = (authToken, body, slug) => factory('patch', slug, authToken, body)
export const createSubCategory = (authToken, body) => factory('post', null, authToken, body)
export const deleteSubCategory = (authToken, slug) => factory('delete', slug, authToken)