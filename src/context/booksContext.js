import { useContext, createContext, useState } from 'react'

const booksContext = createContext()

export const useBooksContext = () => useContext(booksContext)

export const BooksContextProvider = ({ children }) => {
    const [initBooks, setInitBooks] = useState([])
    const [books, setBooks] = useState([])

    function addBook (book) {
        setBooks([...books, book])
    }

    function setInitialBooks (initiaBooks) {
        setInitBooks(initiaBooks)
    }

    function setBooksForUsage (books) {
        setBooks(books)
    }

    function filterBooksByCategory (category) {
        setBooks(initBooks.filter(book => book.category.toLowerCase() === category))
    }
    
    function resetBooks () {
        setBooks(initBooks)
    }

    return (
        <booksContext.Provider
            value={{
                books,
                addBook,
                setInitialBooks,
                setBooksForUsage,
                filterBooksByCategory,
                resetBooks
            }}>
            {children}
        </booksContext.Provider>
    )
}