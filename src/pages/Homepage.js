import Container from "../components/ui/Container"
import { useTokenContext } from '../context/tokenContext'
import { NavLink } from 'react-router-dom'

const Homepage = () => {
    const { token } = useTokenContext()
    return (
        <Container>
            <div className="flex md:gap-10 xl:gap-15 2xl:gap-10 justify-between items-center mt-36 text-center md:text-start px-3 md:px-6 2xl:px-0 max-w-7xl 2xl:mx-48 mb-72">
                <article className="flex flex-col gap-6">
                    <h4 className="text-lg text-gray-300">Welcome ✋ to this application</h4>
                    <h1 className="brand-title">The Most Modern Books<br />App In Internet</h1>
                    <p className="text-lg text-gray-300">Here you can save your prefered books and you can see the other's list <br /> so this is the perfect alternative for your needs</p>
                    <NavLink className="btn btn-primary mx-auto md:mx-0 block" to={token ? "/books" : "/signup"}>Get Started</NavLink>
                </article>
                <article className='hidden md:block rounded-[30%] w-[450px] aspect-square shadow-3xl'>
                    <img src="https://www.sicos.es/wp-content/uploads/2021/03/bfedec2f38d9382eccb735a176aa5b29-sticker.png" alt="girl-custom-emoji" />
                </article>
            </div>

        </Container>
    )
}

export default Homepage