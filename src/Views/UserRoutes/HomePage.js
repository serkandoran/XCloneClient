import '../../Styles/UserRoutesCss/HomePage.css'
import { useFetcher, useNavigate } from 'react-router-dom'
import MainRichTextBox from './HomePageSubFolders/MainRichTextBox'
import Header from './HomePageSubFolders/Headers'
import Rightbar from './RightBar'
import Flow from './HomePageSubFolders/Flow'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import FlowDraft from './HomePageSubFolders/FlowDraft'



const HomePage = () => {
   const navigate = useNavigate()
   const [postAr, setPostAr] = useState([])
   const [pageOffset, setPageOffset] = useState(0)
   const postLimit = 8
   const dispatch = useDispatch()
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
      await axios.get('http://localhost:4000/api/v1/islogged', {
         withCredentials: true
      })
      .then((res)=>{
         dispatch({
            type:'ACTIVE_USER',
            payload: {
               userId:res.data.userId,
               userName:res.data.userName
            }
         })
         dispatch({
            type:'USER_PHOTO',
            payload:res.data.userPicture
         })
      })
      .catch((err)=> {
         console.log(err,' hata meydana geldi')
         navigate('/login');
         dispatch({
            type:'LOGOUT_USER'
         })
      })
   }
   const addNewElement = (val)=>{
      setPostAr(prev => [...prev,val])
   }
   const updateDraftHomePage = (val)=>{
      let newAr = JSON.parse(JSON.stringify(postAr))
      let idx = newAr.findIndex( item => item._id === val.updatedPost._id)
      newAr[idx] = {...{...newAr[idx]},...val.updatedPost}
      setPostAr(newAr)
   }

   return <div className='homepage_container_main' >
         <div className='body_container'>
            <Header />

            <MainRichTextBox addNewElement = { addNewElement } />

            {
               postAr.map((el,idx)=>{
                  return el.type === 'post' ? <Flow 
                     key={idx}
                     data = {el}
                     from = {'homepage'}
                     /> :
                     <FlowDraft 
                     data = {el}
                     key={idx}
                     updateDraftHomePage={updateDraftHomePage}
                  />
               })
            }
         </div>
         <Rightbar />

      </div>
}

export default HomePage