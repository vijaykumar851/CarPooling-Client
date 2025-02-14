import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <>
            <div className="navBar">
                <p>CarP🚗🚘L</p>
                <ul className="list-items">
                    <NavLink className='item1'to="/login"><li>Login</li></NavLink>
                    <NavLink className='item2'to="/"><li>Home</li></NavLink>
                    <NavLink className='item3'to="/register"><li>Register</li></NavLink>
                    <li>About</li>
                </ul>

            </div>
        </>
    )
}

export default NavBar