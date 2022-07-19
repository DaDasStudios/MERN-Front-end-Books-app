import axios from 'axios'

export async function getAllBooksReq(token) {
    try {
        const res = await axios.get('/api/books/', { headers: { 'x-access-token': token } })
        return res
    } catch (error) {
        return error.response
    }
}

export async function getBooksByUserIdReq(token, id) {
    try {
        const res = await axios.get(`/api/books/user/${id}`, {
            headers: {
                'x-access-token': token
            }
        })
        return res
    } catch (error) {
        return error.response
    }
}

export async function createBookReq(book, token) {
    try {
        const res = await axios.post('/api/books/', book, { headers: { 'x-access-token': token } })
        return res
    } catch (error) {
        return error.response
    }
}

export async function updateBookReq(book, id, token) {
    try {
        const res = await axios.put(`/api/books/${id}`, book, {
            headers: {
                'x-access-token': token
            }
        })
        return res
    } catch (error) {
        return error.response
    }
}

export async function deleteBookReq(id, token) {
    try {
        const res = await axios.delete(`/api/books/${id}`, { headers: {
            'x-access-token': token
        }})
        return res
    } catch (error) {
        return error.response
    }
}