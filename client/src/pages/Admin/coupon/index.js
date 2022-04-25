import { createCoupon, listAllCoupons, deleteCoupon } from "../../../functions/coupon"
import { DeleteFilled } from "@ant-design/icons"
import { useEffect, useState } from "react"
import Search from "../../../components/Search"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg"


const initialBody = {
    name: "",
    expiry: "",
    discount: ""
}
const initialSort = {
    createdAt: 0,
    expiry: 0,
    discount: 0,
}
const Coupon = () => {
    const [body, setBody] = useState(initialBody)
    const [coupons, setCoupons] = useState([])
    const [keyword, setKeyword] = useState('')
    const [discountRange, setDiscountRange] = useState(``)
    const [sort, setSort] = useState({ ...initialSort, createdAt: -1 })


    const { user } = useSelector(state => ({ ...state }))

    const handleChange = (e) => {
        setBody({ ...body, [e.target.name]: e.target.value })
    }
    const handleCreate = () => {
        createCoupon(user.token, { ...body }).then(res => {
            fetchCoupons()
            setBody(initialBody)
        }).catch(err => {
            console.log(err.response.data.message)
        })
    }
    const deleteCoupClicked = (coupon) => {
        deleteCoupon(user.token, coupon._id).then(res => {
            toast.success(`${coupon.name} deleted successfully`)
            fetchCoupons()
        }).catch(err => console.log(err.response.data.message))
    }
    const search = (keyword) => (c) => {
        return c.name.toLowerCase().includes(keyword)
    }
    const filterByDiscount = (discountRange) => c => {
        let minDiscount = discountRange.split(",")[0] * 1
        minDiscount = minDiscount >= 0 ? minDiscount : 0
        let maxDiscount = discountRange.split(",")[1] * 1
        maxDiscount = maxDiscount <= 100 ? maxDiscount : 100
        return c.discount >= minDiscount && c.discount <= maxDiscount
    }
    const sortFunction = sort => (a, b) => {
        const sortKey = Object.keys(sort).find(key => sort[key] !== 0)
        if (sortKey === "expiry" || sortKey === "createdAt")
            return (new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime()) * sort[sortKey]
        else
            return (a[sortKey] - b[sortKey]) * sort[sortKey]
    }
    const fetchCoupons = () => {
        listAllCoupons().then(res => setCoupons(res.data.data.coupons)).catch(err => console.log(err.response.data.message))
    }
    const handleSortClick = (e) => {
        // console.log(e.target.parentElement.parentElement.dataset.name)
        // console.log(e.target.parentElement.dataset.name)
        // console.log(e.target.dataset.name)
        const clickedButtonName = e.target.dataset.name || e.target.parentElement.dataset.name || e.target.parentElement.parentElement.dataset.name
        sort[clickedButtonName] === 0
            ? setSort({ ...initialSort, [clickedButtonName]: -1 })
            : setSort({ ...sort, [clickedButtonName]: -1 * sort[clickedButtonName] })
    }

    useEffect(() => {
        fetchCoupons()
    }, [])
    return (
        <div className="w-full relative h-full bg-primary flex flex-col px-2 sm:px-8 pt-4 border-light sm:border-[4px] xs:space-y-3 space-y-2 pb-1 overflow-hidden ">
            <div className="w-full lg:grid lg:grid-cols-2 justify-items-center lg:gap-y-1 lg:gap-x-2 items-center text-center lg:space-y-0 space-y-1">
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={`coupon name eg:"CHRISTMAS 2020"`}
                    className="w-full form-admin-input"
                    spellCheck="false"
                    value={body.name}
                    onChange={e => handleChange(e)}
                    required
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="discount"
                    id="discount"
                    placeholder={`discount in % eg:"50"`}
                    className="w-full form-admin-input"
                    spellCheck="false"
                    value={body.discount}
                    onChange={e => handleChange(e)}
                    required
                    autoComplete="off"
                />
                <input
                    type="date"
                    name="expiry"
                    id="expiry"
                    placeholder={`Expiry Date eg: "17/02/2023"`}
                    className="w-full form-admin-input"
                    value={body.expiry}
                    onChange={e => handleChange(e)}
                    required
                />
                <button className="form-submit h-[30px] text-xs sm:text-sm w-max ml-auto mr-auto block" onClick={() => handleCreate()}>Create</button>
            </div>
            <div className="sm:flex block w-full relative space-y-2 sm:space-x-2 sm:space-y-0">

                <Search keyword={keyword} setKeyword={setKeyword} placeholder="Search by Name..." width="45%" />
                <Search keyword={discountRange} setKeyword={setDiscountRange} placeholder={`Discount Range eg: 0,100 `} width="45%" />


            </div>
            <div className="bg-white py-1 px-2 flex justify-between space-x-2">
                <span >Sort</span>
                <div className="grid grid-cols-2 gap-y-1 gap-x-1 xxs:flex xxs:flex-row xxs:space-x-1 xxs:space-y-0 ">
                    <button data-name="createdAt" id="createdAt" className="py-[1px] text-xs bg-primary text-lightest rounded-sm px-2 flex items-center space-x-1" onClick={e => handleSortClick(e)}>
                        <span>{sort.createdAt === -1 ? <CgArrowLongDown /> : (sort.createdAt === 1 && <CgArrowLongUp />)}</span>
                        <span>CreatedAt</span>
                    </button>
                    <button data-name="expiry" id="expiry" className="py-[1px] text-xs bg-secondary text-lightest rounded-sm px-2 flex items-center space-x-1" onClick={e => handleSortClick(e)}>
                        <span>{sort.expiry === -1 ? <CgArrowLongDown /> : (sort.expiry === 1 && <CgArrowLongUp />)}</span>
                        <span>ExpiringOn</span>
                    </button>
                    <button data-name="discount" id="discount" className="py-[1px] text-xs bg-tertiary text-lightest rounded-sm px-2 flex items-center space-x-1" onClick={e => handleSortClick(e)}>
                        <span>{sort.discount === -1 ? <CgArrowLongDown /> : (sort.discount === 1 && <CgArrowLongUp />)}</span>
                        <span>Discount</span>
                    </button>
                </div>

            </div>
            <h1 className="text-lg text-white">All Coupons({coupons.length}):</h1>
            <div className="flex w-full relative flex-col space-y-2 overflow-hidden overflow-y-scroll scrollhost">
                {coupons.filter(search(keyword.toLowerCase())).filter(filterByDiscount(discountRange)).sort(sortFunction(sort)).map((coup, i) => {
                    const expiry = new Date(coup.expiry)
                    return <div className="w-full relative bg-lightest text-secondary rounded-sm px-4 space-x-1 py-1 flex justify-start items-center " key={coup._id}>
                        <span className="text-primary">{i + 1}.</span>
                        <span className="font-semibold font-montserrat">{coup.name}
                            <div className={`text-xs ${expiry.getTime() > new Date().getTime() ? "text-primary" : "text-red-600"}`}>
                                {expiry.getTime() > new Date().getTime()
                                    ? `(expiringOn: ${expiry.getDate().toString().padStart(2, 0)}-${expiry.getMonth().toString().padStart(2, 0)}-${expiry.getFullYear()})`
                                    : "Coupon Expired"}

                            </div>
                        </span>

                        <span className="xs:absolute xs:left-[50%] !mr-1 xs:mr-0 xs:translate-x-[-50%] text-tertiary font-montserrat font-semibold">{coup.discount}%</span>
                        <DeleteFilled className="!text-red-600 
                    !ml-auto cursor-pointer h-[16px]"
                            onClick={() => deleteCoupClicked(coup)} />
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default Coupon
