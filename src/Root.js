import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './Views/UserRoutes/NavBar'

function RootLayout() {
   return <>
      <Outlet />
   </>
}

export default RootLayout
