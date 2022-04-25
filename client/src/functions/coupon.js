import axios from 'axios'
const factory = async (method, couponId = null, authToken, body = null) => {

    if (couponId)
        return await axios({
            method,
            url: `${process.env.REACT_APP_API}/coupons/${couponId}`,
            data: { ...body },
            headers: { authToken }
        })
    return await axios({
        method,
        url: `${process.env.REACT_APP_API}/coupons/`,
        data: body,
        headers: { authToken }
    })
}
export const listAllCoupons = () => factory('GET')
export const createCoupon = (authToken, body) => factory('POST', undefined, authToken, body)
export const deleteCoupon = (authToken, couponId) => factory('DELETE', couponId, authToken)
