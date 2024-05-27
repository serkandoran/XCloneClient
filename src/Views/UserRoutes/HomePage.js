import '../../Styles/UserRoutesCss/HomePage.css'
import { useFetcher, useNavigate } from 'react-router-dom'
import MainRichTextBox from './HomePageSubFolders/MainRichTextBox'
import Header from './HomePageSubFolders/Headers'
import Rightbar from './RightBar'
import Flow from './HomePageSubFolders/Flow'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'




const HomePage = () => {
   
   const postArReducer = useSelector(state => state.posts)
   
   const navigate = useNavigate()
   const [postAr, setPostAr] = useState([])
   const [pageOffset, setPageOffset] = useState(0)
   const postLimit = 4


   useEffect(() => {
      const resolveHomePageData = async()=>{
         await isLogged()
         await getData()
      }
      resolveHomePageData()
   }, [])

   useEffect(()=>{
      if(pageOffset > 0) getData('scroll')
   }, [pageOffset])

   useEffect(()=>{
      window.addEventListener('scroll', handleScroll,true);
      return () => window.removeEventListener('scroll', handleScroll,true);
   },[])


   const handleScroll = () => {
      if (window.innerHeight + document.documentElement.querySelector('body').querySelector('#root').scrollTop < document.documentElement.querySelector('body').querySelector('#root').querySelector('.user_routes_container').offsetHeight) return
      console.log(window.innerHeight + document.documentElement.querySelector('body').querySelector('#root').scrollTop, document.documentElement.querySelector('body').querySelector('#root').querySelector('.user_routes_container').offsetHeight);
      setPageOffset((prev) => prev + postLimit)
   }

   const getData = async(param = 'initial')=>{
      axios.get(`http://localhost:4000/api/v1/getpostdata?pageOffset=${pageOffset}&postLimit=${postLimit}`)
      .then((res)=>{
         if(param === 'initial') setPostAr(res.data.data)
         else if(param === 'scroll') setPostAr(prev => [...prev, ...res.data.data])
      })
      .catch((err)=>{
         console.log(err,' hata meydana geldi');
      })
   }
   const isLogged = async () => {
      let loginFail = false
      await axios.get('http://localhost:4000/api/v1/islogged', {
         withCredentials: true
      })
      .catch((err)=> {
         console.log(err,' hata meydana geldi')
         loginFail = true
         navigate('/login');
      })
      if(loginFail) return
   }
   const addNewElement = async()=>{
      await getData()
   }

   return <div className='homepage_container_main' >


         <div className='body_container'>
            <Header />

            <MainRichTextBox addNewElement = { addNewElement } />

            {
               postAr.map((el,idx)=>{
                  return <Flow 
                     key={idx}
                     data = {el}
                  />
               })
            }
            

         </div>

         <Rightbar />

      </div>

}

export default HomePage