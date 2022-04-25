import { Tabs } from "antd"
import StarRatings from 'react-star-ratings'
const { TabPane } = Tabs

const Footer = ({ product }) => {
    return (
        <div className="relative w-full min-h-[300px] mb-20 font-montserrat  bg-[#c4c4c4] lg:col-span-7">
            <Tabs defaultActiveKey="1" type="card" style={{ backgroundColor: "#c4c4c4" }} >
                <TabPane tab="Description" key="1" style={{ paddingLeft: "20px", textAlign: "justify", paddingRight: "20px" }}>
                    {product?.description}
                </TabPane>
                <TabPane tab="Reviews" key="2" style={{ paddingLeft: "20px", textAlign: "justify", paddingRight: "20px" }}>
                    {
                        <div className="flex flex-col space-y-2 ">
                            {product?.reviews?.map((review) => (
                                <div className="bg-slate-200 flex flex-row space-x-2 py-2  px-2 font-montserrat text-xs items-start" key={review._id}>
                                    {/* review.user.picture || */}
                                    <img src={"/img/defaultAvatar.png"} alt="User Image" className="w-12 h-12 rounded-full" crossOrigin="use-credentials" />
                                    <div className="">
                                        <StarRatings
                                            rating={review.rating}
                                            starRatedColor="#ee6c4d"
                                            // changeRating={(val) => setRating(val)}
                                            numberOfStars={5}
                                            name='rating'
                                            isSelectable='false'
                                            starSpacing="1px"
                                            starDimension='24px'
                                        />
                                        <div className=''>{review.review}</div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    }
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Footer
