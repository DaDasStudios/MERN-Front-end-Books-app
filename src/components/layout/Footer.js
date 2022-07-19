import { AiFillGithub, AiFillFacebook, AiFillTwitterSquare, AiFillYoutube } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='shadow-3xl h-[400px] py-16 px-36 flex flex-col items-center justify-center footer'>
      <div className="grid grid-cols-3 justify-between w-10/12">
        <div>
          <ul>
            <li><h3>About</h3></li>
            <li>Legal notices</li>
            <li>Privacity notices</li>
            <li>Security information</li>
            <li>Map of the site</li>
          </ul>
        </div>
        <div>
          <ul>
            <li><h3>Support</h3></li>
            <li>Contact</li>
            <li>Clients portal</li>
            <li>Payment assistance</li>
          </ul>
        </div>
        <div>
          <ul>
            <li><h3>Social</h3></li>
            <li><i><AiFillGithub /></i></li>
            <li><i><AiFillFacebook/></i></li>
            <li><i><AiFillTwitterSquare/></i></li>
            <li><i><AiFillYoutube/></i></li>
          </ul>
        </div>
      </div>
      <h6 className='text-sm text-gray-500'>Made with 💚 by Dadastudios</h6>
    </footer>
  )
}

export default Footer