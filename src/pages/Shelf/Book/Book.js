import { toast } from 'react-toastify'
import Confirm from '../Toast/Confirm'
import { useActionsBooksContext } from '../../../context/actionsBookContext'
import { useTokenContext } from '../../../context/tokenContext'
import { toCapitalize } from '../../../util/shelf'
import { BOOK_SUCCESS_TOAST, CONFIRM_WINDOW_TOAST, ERROR_TOAST } from '../../../util/toast.options'
import { deleteBookReq } from '../../../api/books'

const Book = ({ book }) => {
    const { action, setFormToEdit, setAction } = useActionsBooksContext()
    const { token } = useTokenContext()

    function handleClick() {
        if (action === "edit") {
            const formValues = {
                id: book._id,
                name: book.name,
                author: book.author,
                description: book.description,
                published: book.published,
                imgUrl: book.imgUrl,
                visibility: book.visibility,
                category: book.category
            }
            setFormToEdit(formValues)
        } else if (action === "delete") {
            const deleteBookCallback = async () => {
                const res = await deleteBookReq(book._id, token)
                if (res.status === 204) {
                    toast("Book deleted successfully. Reload for see changes", BOOK_SUCCESS_TOAST)
                    setAction("create")
                } else {
                    toast("Upps... something went wrong", ERROR_TOAST)
                }
            }
            toast(<Confirm callback={deleteBookCallback} />, CONFIRM_WINDOW_TOAST)
        }
    }

    return (
        <article className='text-gray-400 text-center gap-10 duration-500 cursor-pointer shadow-3xl rounded-xl text-sm hover:col-span-2 hover:flex hover:bg-white/10 transition-colors group justify-center items-center'
            onClick={handleClick}
        >
            <img className='max-h-[255px] aspect-2/3 rounded-lg opacity-85 mx-auto group-hover:mx-0' src={book.imgUrl} alt={book.name} />
            <div className='mt-3 px-2 pb-3 group-hover:hidden'>
                <h6>{book.name}</h6>
                <h5 className='font-medium'>{book.author}</h5>
            </div>
            <div className="hidden my-7 -ml-4 group-hover:flex text-left flex-col gap-2 text-white font-medium">
                <h5 className='font-medium'>{book.author}</h5>
                <h6>{book.name}</h6>
                <div className="contents italic">
                    <h6>{toCapitalize(book.category)}</h6>
                    <p>{book.visibility}</p>
                    <p>{book.published}</p>
                </div>
            </div>
        </article>
    )
}

export default Book