import { NavLink, useNavigate } from 'react-router-dom'
import { useTokenContext } from '../../context/tokenContext'
import { useBooksContext } from '../../context/booksContext'

export const NavBar = () => {
    const { token, deleteToken } = useTokenContext()
    const { resetBooks } = useBooksContext()
    const navigate = useNavigate()

    function logout () {
        deleteToken()
        navigate('/')
    }
    return (
        <header className='bg-transparent text-white font-medium'>
            <nav className='flex items-center gap-10 justify-between px-10 md:px-28 lg:px-10 xl:mx-48 py-7 text-lg '>
                <ul className='flex gap-3'>
                    <li className='text-shadow text-primary hover:text-primary-saturated transition-colors duration-1000'><NavLink to={'/'}>
                        BA</NavLink></li>
                </ul>
                <ul className='flex gap-5 md:gap-20'>
                    { token ?
                        <>
                            <li className='hover:text-gray-300 transition-tos duration-1000' ><NavLink to="/books" onClick={resetBooks}>Books</NavLink></li>
                            <li className='hover:text-gray-300 transition-tos duration-1000' ><NavLink to="/shelf/action">Shelf</NavLink></li>
                            <li className='hover:text-gray-300 transition-colors duration-1000' ><button onClick={logout}>Logout</button></li>
                        </>
                        : <>
                            <li className='hover:text-gray-300 transition-colors duration-1000'><NavLink to={'/signup'}>Sign Up</NavLink></li>
                            <li className='hover:text-gray-300 transition-colors duration-1000'><NavLink to={'/signin'}>Sign In</NavLink></li>
                        </>}

                </ul>


            </nav>
        </header>
    )
}
