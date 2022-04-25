import { SearchOutlined } from "@ant-design/icons"
import { Radio } from "antd"
import { Row, Slider, Col, Checkbox } from "antd"
import { useEffect, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import StarRatings from "react-star-ratings"
import { getCategorySubs, getCategories } from "../functions/category"
import Loading from "./Loading"


function ShopSideNav() {
    const [showPrice, setShowPrice] = useState(true)
    const [showCategory, setShowCategory] = useState(true)
    const [showSubCategory, setShowSubCategory] = useState(true)
    const [showRating, setShowRating] = useState(true)
    const [showBrand, setShowBrand] = useState(true)
    const [showColor, setShowColor] = useState(true)
    const [showSort, setShowSort] = useState(true)
    const [showShipping, setShowShipping] = useState(true)
    const [width, setWidth] = useState(window.innerWidth)
    const filter = useSelector(state => state.filter)
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const [locationState, setLocationState] = useState(true)

    const fetchCategories = async () => {
        return await getCategories()
    }
    useEffect(() => {
        const event = window.addEventListener('resize', () => setWidth(window.innerWidth))
        return () => window.removeEventListener('resize', event)
    }, [])
    useEffect(() => {
        let cancel = false
        fetchCategories()
            .then(res => {
                if (cancel) return
                setCategories(res.data.data.categories)
                setLoading(false)
            })
            .catch(err => {
                if (cancel) return
                console.log(err.response)
                setLoading(false)
            })
        return () => {
            cancel = true
        }
    }, [])
    useEffect(() => {
        let cancel = false
        if (filter.category) {
            getCategorySubs(filter.category)
                .then(res => {
                    if (cancel) return
                    let newFilter = {}
                    if (location?.state?.from === "singleProduct" && locationState) {
                        newFilter = { ...filter, subCategories: res.data.data.subCategories }
                        setLocationState(false)
                    }
                    else {
                        newFilter = { ...filter, subCategories: res.data.data.subCategories, chosenSubCategories: [] }
                    }
                    dispatch({
                        type: 'UPDATE_FILTER',
                        payload: newFilter
                    })
                })
                .catch(err => {
                    if (cancel) return
                    console.log(err.response?.data)
                }
                )
            return () => {
                cancel = true
            }
        }
    }, [filter.category])

    function handleClear() {
        dispatch({
            type: 'RESET_FILTER',
        })
    }
    function handleChange(e, name = undefined, value = undefined) {
        dispatch({
            type: 'UPDATE_FILTER',
            payload: { ...filter, [name ? name : e.target.name]: ((value === 0 || value) ? value : e.target.value) }
        })
    }
    return (
        loading ? <div><Loading /></div> :
            <div className='lg:px-2 xs:px-8 px-2 xl:px-4 font-montserrat lg:pt-10
                        lg:flex lg:flex-col space-y-4
                        grid md:grid-cols-3 xs:grid-cols-2 items-start justify-center gap-x-8  grid-dense'>
                {/* Clear Filters */}
                <button className="col-span-1 lg:mt-0 mt-4 bg-red-500 text-white px-2 py-1  w-full hover:opacity-60 rounded-sm"
                    onClick={handleClear}
                >Clear Filters</button>
                {/* Search */}
                <div className="flex justify-center w-full relative bg-slate-500 col-span-1 xs:col-span-1 md:col-span-2 lg:mt-0 mt-4">
                    <input
                        type="text"
                        className="w-full lg:h-[30px] h-[24px] text-sm relative rounded-sm pl-2 focus:ring-2 focus:ring-slate-500 focus:outline-none ring-1 ring-slate-300"
                        placeholder="Search"
                        value={filter.search}
                        name="search"
                        onChange={handleChange}
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <label htmlFor="search" className="absolute right-2 text-xs sm:text-sm  text-gray-400 top-[50%] translate-y-[-50%]"><span><SearchOutlined /></span></label>
                </div>
                {/* Price */}
                <div className="flex flex-col items-center w-full relative  ">
                    <div className='flex w-full items-center space-between'>
                        <span className="text-primary font-[750] text-[17px]">Price</span>
                        <span className="ml-auto cursor-pointer ">
                            {!showPrice && <FaChevronDown className='text-primary ' onClick={() => setShowPrice(true)} />}
                            {showPrice && <FaChevronUp className='text-primary ' onClick={() => setShowPrice(false)} />}
                        </span>
                    </div>
                    <div className={` w-full top-[100%] origin-top ${showPrice ? "scale-y-100 max-h-[500px]" : "scale-y-0 max-h-0"} transition-all duration-200 ease-linear `} >
                        <Slider range
                            value={filter.priceRange}
                            onChange={(val) => handleChange(undefined, 'priceRange', val)}
                            max={50000}
                            step={500}
                            tipFormatter={(v) => `Rs${v}`}
                        />
                    </div>
                </div>
                {/* sort */}
                <div className="flex flex-col items-center w-full relative  ">
                    <div className='flex w-full items-center space-between'>
                        <span className="text-primary font-[750] text-[17px]">SortBy</span>
                        <span className="ml-auto cursor-pointer ">
                            {!showSort && <FaChevronDown className='text-primary ' onClick={() => setShowSort(true)} />}
                            {showSort && <FaChevronUp className='text-primary ' onClick={() => setShowSort(false)} />}
                        </span>
                    </div>
                    <div className={` w-full top-[100%] origin-top ${showSort ? "scale-y-100 max-h-[500px]" : "scale-y-0 max-h-0"} transition-all duration-200 ease-linear`} >
                        <Radio.Group style={{ width: '100%' }} value={filter.sort} onChange={handleChange} name="sort">
                            <Row >
                                <Col span={24} >
                                    <Radio value={'-price'}>Price High to Low</Radio>
                                </Col>
                                <Col span={24} >
                                    <Radio value={'price'}>Price Low to High</Radio>
                                </Col>
                                <Col span={24} >
                                    <Radio value={'-ratingsAverage'}>Rating High to Low</Radio>
                                </Col>
                                <Col span={24} >
                                    <Radio value={'ratingsAverage'}>Rating Low to High</Radio>
                                </Col>
                                <Col span={24} >
                                    <Radio value={'-createdAt'}>Newest First</Radio>
                                </Col>
                                <Col span={24} >
                                    <Radio value={'createdAt'}>Oldest First</Radio>
                                </Col>
                                <Col span={24} >
                                    <Radio value={'-sold'}>Best Sellers</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </div>
                </div>
                {/* category*/}
                <div className="flex flex-col items-center w-full relative ">
                    <div className='flex w-full items-center space-between'>
                        <span className="text-primary font-[750] text-[17px]">Category</span>
                        <span className="ml-auto cursor-pointer ">
                            {!showCategory && <FaChevronDown className='text-primary ' onClick={() => setShowCategory(true)} />}
                            {showCategory && <FaChevronUp className='text-primary ' onClick={() => setShowCategory(false)} />}
                        </span>
                    </div>
                    <div className={` w-full left-0 top-[100%] origin-top ${showCategory ? "scale-y-100 max-h-[500px]" : "scale-y-0 max-h-0"} transition-all duration-200 ease-linear  `} >
                        <Radio.Group style={{ width: '100%' }} name="category" value={filter.category}
                            onChange={handleChange}>
                            <Row>
                                {
                                    categories?.map((cat) => (
                                        <Col span={width < '380' ? 24 : 12} key={cat._id}>
                                            <Radio value={cat._id}>{cat.name}</Radio>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Radio.Group>
                    </div>
                </div>
                {/* subCategory */}
                <div className="flex flex-col items-center w-full relative ">
                    <div className='flex w-full items-center space-between'>
                        <span className="text-primary font-[750] text-[17px]">Sub Categories</span>
                        <span className="ml-auto cursor-pointer ">
                            {!showSubCategory && <FaChevronDown className='text-primary ' onClick={() => setShowSubCategory(true)} />}
                            {showSubCategory && <FaChevronUp className='text-primary ' onClick={() => setShowSubCategory(false)} />}
                        </span>
                    </div>
                    <div className={` w-full left-0 top-[100%] origin-top ${showSubCategory ? "scale-y-100 max-h-[800px]" : "scale-y-0 max-h-0"} transition-all duration-100 ease-linear`} >
                        <Checkbox.Group
                            style={{ width: '100%' }}
                            onChange={(val) => handleChange(undefined, "chosenSubCategories", val)}
                            value={filter.chosenSubCategories}
                        >
                            <Row>
                                {
                                    filter.subCategories?.map((subCat) => (
                                        <Col span={width < '380' || (width < '600' && width > '540') || (width < '920' && width > '770') ? 24 : 12} key={subCat._id}>
                                            <Checkbox value={subCat._id}>{subCat.name}</Checkbox>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
                {/* rating */}
                <div className="flex flex-col items-center w-full relative ">
                    <div className='flex w-full items-center space-between'>
                        <span className="text-primary font-[750] text-[17px]">Rating</span>
                        <span className="ml-auto cursor-pointer ">
                            {!showRating && <FaChevronDown className='text-primary ' onClick={() => setShowRating(true)} />}
                            {showRating && <FaChevronUp className='text-primary ' onClick={() => setShowRating(false)} />}
                        </span>
                    </div>
                    <div className={` w-full left-0 top-[100%] origin-top ${showRating ? "scale-y-100 max-h-[500px]" : "scale-y-0 max-h-0"} transition-all duration-100 ease-linear`} >
                        {
                            Array.from({ length: 4 }, (v, i) => 4 - i).map((val, index) => {
                                return (<div
                                    key={index}
                                    className={`flex items-center space-x-2 hover:text-secondary cursor-pointer ${filter.minRating === val && "text-secondary"}`}
                                    onClick={() => {
                                        handleChange(undefined, "minRating", val)
                                    }}
                                >
                                    <StarRatings
                                        rating={val}
                                        starRatedColor="#ee6c4d"
                                        numberOfStars={5}
                                        name='minRating'
                                        isSelectable='false'
                                        starSpacing="1px"
                                        starDimension={width < 260 ? '16px' : '24px'}
                                    />
                                    <span className="xxs:text-base text-xs relative top-1"> & up</span>
                                </div>)

                            })
                        }
                        <button className={`flex items-center justify-center mt-1 hover:text-secondary cursor-pointer ${filter.minRating === 0 && "text-secondary"} `}
                            onClick={() => {
                                handleChange(undefined, "minRating", 0)
                            }}>Unrated</button>
                    </div>
                </div>
                {/* brand */}
                <div className="flex flex-col items-center w-full relative ">
                    <div className='flex w-full items-center space-between'>
                        <span className="text-primary font-[750] text-[17px]">Brands</span>
                        <span className="ml-auto cursor-pointer ">
                            {!showBrand && <FaChevronDown className='text-primary ' onClick={() => setShowBrand(true)} />}
                            {showBrand && <FaChevronUp className='text-primary ' onClick={() => setShowBrand(false)} />}
                        </span>
                    </div>
                    <div className={` w-full left-0 top-[100%] origin-top ${showBrand ? "scale-y-100 max-h-[500px]" : "scale-y-0 max-h-0"} transition-all duration-100 ease-linear`} >
                        <Checkbox.Group style={{ width: '100%' }} value={filter.chosenBrands} onChange={(val) => handleChange(undefined, 'chosenBrands', val)}>
                            <Row>
                                {
                                    filter.brands?.map((brand) => (
                                        <Col span={width < '380' ? 24 : 12} key={brand}>
                                            <Checkbox value={brand}>{brand}</Checkbox>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
                {/* Color */}
                <div className="flex flex-col items-center w-full relative ">
                    <div className='flex w-full items-center space-between'>
                        <span className="text-primary font-[750] text-[17px]">Colors</span>
                        <span className="ml-auto cursor-pointer ">
                            {!showColor && <FaChevronDown className='text-primary ' onClick={() => setShowColor(true)} />}
                            {showColor && <FaChevronUp className='text-primary ' onClick={() => setShowColor(false)} />}
                        </span>
                    </div>
                    <div className={` w-full left-0 top-[100%] origin-top ${showColor ? "scale-y-100 max-h-[500px]" : "scale-y-0 max-h-0"} transition-all duration-100 ease-linear`} >
                        <Checkbox.Group style={{ width: '100%' }} value={filter.chosenColors} onChange={(val) => handleChange(undefined, "chosenColors", val)}>
                            <Row>
                                {
                                    filter.colors?.map((brand) => (
                                        <Col span={width < '280' ? 24 : 12} key={brand}>
                                            <Checkbox value={brand}>{brand}</Checkbox>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
                {/* delivery */}
                <div className="flex flex-col items-center w-full relative ">
                    <div className='flex w-full items-center space-between'>
                        <span className="text-primary font-[750] text-[17px]">Fast Delivery</span>
                        <span className="ml-auto cursor-pointer ">
                            {!showShipping && <FaChevronDown className='text-primary ' onClick={() => setShowShipping(true)} />}
                            {showShipping && <FaChevronUp className='text-primary ' onClick={() => setShowShipping(false)} />}
                        </span>
                    </div>
                    <div className={` w-full left-0 top-[100%] origin-top ${showShipping ? "scale-y-100 max-h-[500px]" : "scale-y-0 max-h-0"} transition-all duration-100 ease-linear`} >
                        <Radio.Group style={{ width: '100%' }} name="shipping" value={filter.shipping} onChange={handleChange}>
                            <Row >
                                <Col span={12} >
                                    <Radio value={'Yes'}>Yes</Radio>
                                </Col>
                                <Col span={12} >
                                    <Radio value={'No'}>No</Radio>
                                </Col>
                                <Col span={24} >
                                    <Radio value={'any'}>Don't Care</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </div>
                </div>
            </div>
    )
}

export default ShopSideNav
