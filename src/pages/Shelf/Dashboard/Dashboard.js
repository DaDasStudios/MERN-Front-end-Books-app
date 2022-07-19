import { Route, Routes } from 'react-router-dom'
import BookForm from "../Form/BookForm";
import UserForm from "../Form/UserForm"
import Shelf from "../Shelf/Shelf";
import DashboardNavBar from './DashboardNavBar'
import { BooksViewProvider } from '../../../context/booksViewContext'

const Dashboard = () => {

  return (
    <div className="bg-black/10 border border-dashed border-gray-400/25 rounded-md shadow-md mb-48">
      <BooksViewProvider>
        <DashboardNavBar></DashboardNavBar>
        <div className='flex w-full'>
          <Routes>
            <Route path="/action" element={<BookForm/>}></Route>
            <Route path="/user" element={<UserForm />}></Route>
          </Routes>
          <Shelf></Shelf>
        </div>
      </BooksViewProvider>

    </div>

  )

};

export default Dashboard;
