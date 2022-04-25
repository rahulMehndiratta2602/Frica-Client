
import { useEffect } from "react"
import CartPopup from "../components/CartPopup"
import HomeImage from "../components/HomeImage"
import HomeSection from "../components/HomeSection"


const Home = () => {
    return (
        <div className="pt-8 space-y-8 bg-slate-800 bg-opacity-80  ">
            < CartPopup />
            <HomeImage />
            <HomeSection heading="Our Products" headingBackground="bg-[#6d0a9b]" sort="updatedAt" />
            <HomeSection heading="New Arrivals" headingBackground="bg-[#6d0a9b]" sort="-createdAt" />
            <HomeSection heading="Best Sellers" headingBackground="bg-[#6d0a9b]" sort="-sold" />
        </div>
    )
}

export default Home
