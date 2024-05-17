import '../../Styles/UserRoutesCss/HomePage.css'
import { useFetcher, useNavigate } from 'react-router-dom'
import MainRichTextBox from './HomePageSubFolders/MainRichTextBox'
import Header from './HomePageSubFolders/Headers'
import Rightbar from './RightBar'
import Flow from './HomePageSubFolders/Flow'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'




const HomePage = () => {
   const navigate = useNavigate()

   const postAr = useSelector(state => state.posts)


   useEffect(() => {
      isLogged()
   }, [])

   const isLogged = async () => {
      try{
         const response = await axios.get('http://localhost:4000/api/v1/islogged', {
            withCredentials: true
         });
      }catch{
         navigate('/login');
      }
   }


   return <div className='homepage_container_main' >

         <div className='body_container'>
            <Header />



            <MainRichTextBox/>

            <Flow />

         </div>

         <Rightbar />

      </div>

}

export default HomePage