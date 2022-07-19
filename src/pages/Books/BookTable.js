import Book from './Book'
import { useBooksContext } from '../../context/booksContext'

const BookTable = () => {
    const { books } = useBooksContext()
    return (
        <div className='px-4 lg:px-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
            {books.map(book => (
                <Book key={book._id} book={book}></Book>
            ))}
        </div>
    )
}

export default BookTable