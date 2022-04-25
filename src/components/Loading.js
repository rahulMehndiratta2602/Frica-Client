const Loading = ({ number }) => {
    return (

        <div className="loader w-70 bg-white p-1">
            {[...new Array(number ? number : 6)].map((_, i) => <span key={i} ></span>)}
        </div>

    )
}

export default Loading
