import ShelfItem from "./ShelfItem"

const ShelfTable = ({books}) => {

    return (
        <div className='flex-1 max-h-[700px] overflow-auto scroll'>
            <table className="w-full dashed-table">
                <thead>
                    <tr className='text-sm'>
                        <th >Name</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Visibility</th>
                        <th>Published</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <ShelfItem key={book._id} book={book}/>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ShelfTable