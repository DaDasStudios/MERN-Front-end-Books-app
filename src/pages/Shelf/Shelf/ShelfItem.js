import { useState } from 'react'
import { toast } from 'react-toastify'
import Confirm from '../Toast/Confirm'
import { useActionsBooksContext } from '../../../context/actionsBookContext'
import { useTokenContext } from '../../../context/tokenContext'
import { BOOK_SUCCESS_TOAST, CONFIRM_WINDOW_TOAST, ERROR_TOAST } from '../../../util/toast.options'
import { deleteBookReq } from '../../../api/books'

const ImageModal = ({ active, image, alt, close }) => {

    function stopPropagationImgClick(e) {
        e.stopPropagation()
    }

    function closeModal() {
        close(false)
    }

    return (
        <div className={`${active ? "flex justify-center items-center" : "hidden"} z-10 transition-all bg-white inset-0 fixed bg-black/50 px-10`} onClick={closeModal}>
            <img src={image} alt={alt} className="h-3/5 rounded-xl p-1 overflow-hidden shadow-4xl opacity-90" onClick={stopPropagationImgClick} />
        </div>
    )
}

const ShelfItem = ({ book }) => {
    const [active, setActive] = useState(false)
    const { action, setFormToEdit, setAction } = useActionsBooksContext()
    const { token } = useTokenContext()

    const handleAction = () => {
        switch (action) {
            case "create":
                setActive(!active)
                break;
            case "edit":
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
                break
            case "delete":
                const deleteBookCallback = async () => {
                    const res = await deleteBookReq(book._id, token)
                    if (res.status === 204) {
                        toast("Book deleted successfully. Reload for see changes", BOOK_SUCCESS_TOAST)
                        setAction("create")
                    } else {
                        toast("Upps... something went wrong", ERROR_TOAST)
                    }
                }
                toast(<Confirm callback={deleteBookCallback}/>, CONFIRM_WINDOW_TOAST)
                break;

            default:
                break;
        }

    }

    return (
        <>
            <tr className={action === "edit" ? 'text-sm cursor-pointer hover:bg-white/30 transition-colors' : 'text-sm cursor-pointer hover:bg-white/10 transition-colors'} onClick={handleAction}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>{book.category}</td>
                <td>{book.visibility}</td>
                <td>{book.published}</td>
                <td>{book.imgUrl}</td>
            </tr>
            <ImageModal active={active} image={book.imgUrl} alt={book.name} close={setActive} />
        </>
    )
}

export default ShelfItem