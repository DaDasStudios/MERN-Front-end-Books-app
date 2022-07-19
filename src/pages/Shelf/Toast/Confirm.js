
const Confirm = ({ closeToast, callback }) => {
    return (
        <>
            <p className="text-center">Are you sure you want to delete this book?</p>
            <div className="flex w-full justify-between px-5 text-white mt-2 gap-2">
                <button className="bg-lime-500 hover:bg-lime-500/80 px-8 py-1 rounded-lg" onClick={() => {
                    callback()
                    closeToast()
                }}>Yes</button>
                <button className="bg-red-500 hover:bg-red-400 px-8 py-1 rounded-lg" onClick={closeToast}>No</button>
            </div>
        </>

    )
}

export default Confirm