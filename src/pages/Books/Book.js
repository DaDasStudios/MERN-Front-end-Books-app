import { toast } from 'react-toastify'
import { BOOK_TOAST } from '../../util/toast.options'
import { toCapitalize } from '../../util/shelf'

const MoreInfoToast = ({ book }) => {
    return(
        <div>
            <h5 className='font-bold'> {toCapitalize(book.category)}</h5>
            {book.name}
            <p className='text-sm'>{book.description}</p>
            <p className='text-sm'>{book.published}</p>
        </div>
    )
}

const Book = ({ book }) => {

    function showMoreInformation() {
        toast(<MoreInfoToast book={book}/>, BOOK_TOAST)
    }

    return (
        <article className='text-gray-400 text-center gap-10 transform transition-transform duration-500 hover:scale-105 cursor-pointer shadow-3xl rounded-xl' onClick={showMoreInformation}>
            <img className='w-full aspect-2/3 rounded-lg opacity-85' src={book.imgUrl} alt={book.name} />
            <div className='mt-3 px-2 pb-3'>
                <h6>{book.name}</h6>
                <h5 className='font-medium'>{book.author}</h5>
            </div>
        </article>
    )
}

export default Book