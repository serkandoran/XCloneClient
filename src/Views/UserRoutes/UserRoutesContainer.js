import { Outlet } from 'react-router-dom'
import '../../Styles/UserRoutesCss/UserRoutes.css'
import NavBar from './NavBar'


const UserRoutesContainer = ()=>{

   return <div className="user_routes_container">

      {/* <NavBar /> */}
      <Outlet />
   </div>
}

export default UserRoutesContainer





