import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useBooksContext } from '../../context/booksContext'

const Description = ({ alt, show }) => {
    return (
        <div className={`
        absolute -bottom-14 -left-1/2 bg-white text-gray-500 py-3 px-8 rounded-lg w-[200px] ${show ? "block" : "hidden"}
        `}>{alt}</div>
    )
}

const Category = ({ y, x, translate, image, alt, category }) => {
    const [show, setShow] = useState(false)
    const { filterBooksByCategory } = useBooksContext()

    const filterCategory = () => {
        filterBooksByCategory(category)
    }

    return (
        <NavLink
            className={`rounded-[30%] shadow-3xl z-10 p-5 aspect-square max-w-[100px] absolute ${x} ${y} transform ${translate} transition-transform duration-500 hover:scale-110 cursor-pointer `}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={filterCategory}
            to={`/books`}
        >
            <img src={image} alt={alt} />
            <Description show={show} alt={alt} />
        </NavLink>
    )
}

export default Category