const LoadingCard = () => {
    return (
        <div className={`aspect-auto 
        w-[100%] 
        xxs:w-[90%]
        xs:w-[100%] 
        sm:w-[100%]
        md:w-[100%]
        lg:w-[100%] rounded-lg bg-white space-y-2`
        }>
            <div className="w-full aspect-[16/12]  rounded-t-lg bg-gray-300" alt="" />
            <div className="sm:h-[50px] sm:leading-6 md:leading-7 flex items-baseline h-[60px] mt-2 bg-gray-300 relative justify-center"></div>
            <div className="bg-gray-300 h-[24px]  md:text-sm !leading-3 font-mono "></div>
            <div className=" h-[100px] bg-gray-300 "></div>
            <div className=" ">
                {
                    <div className="w-full  text-lg  flex">
                        <div
                            className="cursor-pointer bg-slate-300
                    rounded-bl-md h-10 border-[#020327d2]
                    w-[50%] border-r-[1px]" ></div>
                        <div
                            className="cursor-pointer bg-slate-300
                      ml-auto text-red-500
                    rounded-br-md 
                      w-[50%] h-10 ">
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default LoadingCard
