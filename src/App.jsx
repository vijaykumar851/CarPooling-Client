import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import Index from './Pages/index.jsx'
import NavBar from './Components/NavBar.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Footer from './Components/Footer.jsx'
import Rental from './Pages/Rental.jsx'
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<><NavBar/><Index/></>
    },
    {
      path:'/login',
      element:<><NavBar/><Login/></>
    },
    {
      path:'/register',
      element:<><NavBar/><Register/></>
    },
    {
      path:'/rental',
      element:<><NavBar/><Rental/></>
    }
  ]) 
  return (
    <>
      <main>
        <RouterProvider router={router}/>
        <Footer />
      </main>
    </>
  )
}

export default App
