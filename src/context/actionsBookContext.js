import { useState, createContext, useContext } from 'react'

const ActionsBooksContext = createContext()

export const useActionsBooksContext = () => useContext(ActionsBooksContext)

const EMPTY_FORM = {
    id: "",
    name: "",
    author: "",
    description: "",
    category: "",
    published: "",
    imgUrl: "",
    visibility: "Private",
}

export const ActionsBooksProvider = ({ children }) => {

    const [action, setAction] = useState("create")
    const [formValues, setFormValues] = useState(EMPTY_FORM)

    function setFormToEdit(book) {
        setFormValues(book)
    }

    function resetAction() {
        setAction("create")
        setFormValues(EMPTY_FORM)
    }

    return (
        <ActionsBooksContext.Provider value={{
            action,
            formValues,
            setAction,
            resetAction,
            setFormToEdit,
        }}>
            {children}
        </ActionsBooksContext.Provider>
    )
}