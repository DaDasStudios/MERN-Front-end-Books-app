import { useEffect, useState } from 'react'
import { AiOutlineCoffee } from 'react-icons/ai'
import ShelfTable from './ShelfTable'
import BooksGrid from '../Book/BooksGrid'
import { useTokenContext } from '../../../context/tokenContext'
import { useBooksViewContext } from '../../../context/booksViewContext'
import { getBooksByUserIdReq } from '../../../api/books'

const Shelf = () => {
  const { token, user } = useTokenContext()
  const { view } = useBooksViewContext()

  const [userBooks, setUserBooks] = useState([])
  async function fetchUserBooks() {
    if (user._id) {
      const res = await getBooksByUserIdReq(token, user._id)
      if (res.status === 200) {
        setUserBooks(res.data)
      }
    }
  }



  useEffect(() => {
    fetchUserBooks()
    // eslint-disable-next-line
  }, [user])

  // If user doesn't have any book addded, we show a different content
  if (userBooks.length === 0) {
    return (
      <div className="flex flex-col gap-6 flex-1 justify-center items-center text-gray-400/80">
        <AiOutlineCoffee className='text-9xl'></AiOutlineCoffee>
        <h3 className='text-3xl font-bold opacity-70'>You don't have any book</h3>
      </div>
    )
  }

  // Depeding of the view state, we can return a different component
  if (view) {
    // Return a grid
    return (
      <BooksGrid books={userBooks}></BooksGrid>
    )
  }

  // Return a table
  return (
    <ShelfTable books={userBooks}></ShelfTable>
  )
}

export default Shelf