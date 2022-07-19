import { useState, useContext, createContext, useEffect } from 'react'
import { logoutRequest, getUser } from '../api/auth'

const TokenContext = createContext()

export const useTokenContext = () => useContext(TokenContext)

export const TokenContextProvider = ({ children }) => {
    const [token, setToken] = useState("")
    const [user, setUser] = useState({})
    
    async function deleteToken() {
        const res = await logoutRequest(token)
        if (res.status === 200) {
            setToken('')
        }        
    }

    function setTokenTo(token) {
        setToken(token)
    }

    const fetchUser = async () => {
        const res = await getUser(token)
        if (res.status === 200){ 
            setUser(res.data)
        }
        
    }

    useEffect(() => {
        fetchUser()
    // eslint-disable-next-line
    }, [token])

    return (
        <TokenContext.Provider value={{
            token, 
            user,
            deleteToken,
            setTokenTo,
            setUser
        }}>
            {children}
        </TokenContext.Provider>
    )
}