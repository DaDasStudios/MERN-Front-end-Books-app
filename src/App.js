import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { BooksContextProvider } from './context/booksContext'
import { useTokenContext } from './context/tokenContext'
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import BooksPage from './pages/Books/BooksPage'
import ShelfPage from "./pages/Shelf/Shelf/ShelfPage";
import { NavBar } from "./components/layout/NavBar";
import Footer from './components/layout/Footer'

const App = () => {
  const { token } = useTokenContext()
  return (
    <main>
      <ToastContainer></ToastContainer>
      <BooksContextProvider>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="*" element={<Homepage/>}></Route>
          {token === '' && <>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
          </>
          }
          {token && <>
            <Route path="/shelf/*" element={<ShelfPage />}></Route>
            <Route path="/books" element={<BooksPage />}></Route>
          </>
          }
        </Routes>
        <Footer></Footer>
      </BooksContextProvider>

    </main>
  )
}

export default App;
