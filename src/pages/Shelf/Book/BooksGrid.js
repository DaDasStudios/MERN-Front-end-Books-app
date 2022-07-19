import Book from "./Book"

const BooksGrid = ({ books }) => {
    return (
        <div className='flex-1 p-5 mx-5 lg:px-0 grid items-stretch grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-10 lg:grid-rows-2 grid-rows-2'>
            {books.map(book => <Book key={book._id} book={book}/> )}
        </div>
    )
}

export default BooksGrid