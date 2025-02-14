import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import Index from './Pages/index.jsx'
import NavBar from './Components/NavBar.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Footer from './Components/Footer.jsx'
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
