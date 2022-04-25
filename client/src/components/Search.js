import { SearchOutlined } from "@ant-design/icons"
const Search = ({ keyword, setKeyword, placeholder, width }) => {
    return (
        <div className="w-full relative">
            <input
                type="text"
                name="search"
                id="search"
                placeholder={placeholder} className={`w-[100%] !sm:w-[${width}] py-1 text-xs sm:text-sm relative rounded-sm pl-6 sm:pl-10 sm:placeholder:hidden focus:ring-2 focus:ring-slate-500 focus:outline-none  `} spellCheck="false"
                value={keyword.toLowerCase()}
                onChange={(e) => {
                    setKeyword(e.target.value)
                }}
                autoComplete="off"
            />
            <label htmlFor="search" className="absolute left-2 text-xs sm:text-sm  sm:left-4 text-gray-400  top-[50%] translate-y-[-50%]"><span><SearchOutlined /></span></label>
        </div>
    )
}

export default Search
