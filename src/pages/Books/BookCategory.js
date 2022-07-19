import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Category from "./Category"
import { CATEGORY_TOAST } from '../../util/toast.options'
import nerdImg from '../../assets/nerd-image.png'
import killerImg from '../../assets/asesino-en-serie.png'

const BookCategory = () => {

  useEffect(() => {
    toast("Choose the category you want", CATEGORY_TOAST)
  }, [])

  return (
    <div className="flex flex-col justify-center items-center my-14 pb-72">
      <h1 className="font-extrabold text-5xl mb-5 opacity-80">Categories</h1>
      <div className="rounded-[30%] w-[450px] aspect-square shadow-3xl relative transform transition-transform duration-700 hover:scale-105">
        <img src={nerdImg} alt="An appasionant books reader" />

        <Category y="top-1/2" x="-left-28" translate="-translate-y-1/2" image="https://cdn-icons-png.flaticon.com/512/2368/2368182.png" alt="Science fiction category" category="science"></Category>

        <Category y="top-1/2" x="-right-28" translate="-translate-y-1/2" image="https://cdn-icons-png.flaticon.com/512/2368/2368173.png" alt="Fantasy category" category="fantasy"></Category>

        <Category y="-bottom-28" x="left-1/2" translate="-translate-x-1/2" image={killerImg} alt="Horror category" category="horror"></Category>

        <Category y="-bottom-14" x="-left-20" image="/history.png" alt="History category" category="history"></Category>

        <Category y="-bottom-14" x="-right-20" image="https://cdn-icons-png.flaticon.com/512/3851/3851831.png" alt="Police novel category" category="police"></Category>

      </div>

    </div>
  )
}


export default BookCategory