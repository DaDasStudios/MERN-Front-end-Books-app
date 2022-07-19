import { useState, createContext, useContext } from 'react'

/* 
    This is a context just for the view of the books in the shelf.
    So the user shall toggle between a grid or a table.

    in the state "false" means table and "true" a grid
    by default is in false (a table)
*/

const BooksViewContext = createContext()

export const useBooksViewContext = () => useContext(BooksViewContext)

export const BooksViewProvider = ({ children }) => {
    const [view, setView] = useState(false)

    function toggleView() {
        setView(!view)
    }

    return (
        <BooksViewContext.Provider value={{
            view,
            setView,
            toggleView
        }}>
            {children}
        </BooksViewContext.Provider>
    )
}
