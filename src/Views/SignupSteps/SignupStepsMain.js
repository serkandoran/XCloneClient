import '../../Styles/SignupPages/SignupStepsMain.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import ThirdPage from './ThirdPage'
import ErrorPage from '../ErrorPage'


import BackDrop from '../BackDrop'
import { useNavigate } from 'react-router-dom'



const SignupStepsMain = ()=>{



   const navigate = useNavigate()

   const [pageCount, setPageCount] = useState(0)
   const [isError,setIsError] = useState(false)
   const [navigateFlag, setNavigateFlag] = useState(false)
   
   const userData = useSelector((state) => state.auth)
   const dispath = useDispatch()
   
   const [postUserData, setPostUserData] = useState(false)


   useEffect(()=>{
      isLogged()
      if(Object.keys(userData).length === 0 || isError){
         // hata göster
         setIsError(true)
         // /signup yönlendir
         if(navigateFlag){
            navigate('/signup')
         }
         // api istek yap. userDatayı undefined yap.
         clearUserDataApi()
      }

      if(postUserData){
         registerUser()
      }
   },[navigateFlag, postUserData])

   const isLogged = async () => {
      let response = await fetch('http://localhost:4000/api/v1/islogged', {
         method: 'GET',
         credentials: 'include'
      })
      if (response.status === 200) {
         navigate('/home')
         return
      }
   }
   const clearUserDataApi = async()=>{
      await fetch('http://localhost:4000/api/v1/clearuserdata')
   }
   const registerUser = async () => {
      let respone = await fetch('http://localhost:4000/api/v1/registeruser',{
         method: 'POST',
         headers:{"Content-Type":"application/json"},
         body: JSON.stringify({
            ...userData
         }),
         credentials:'include'
      })
      if(respone.status !== 201){
         setIsError(true)
         return
      }
      navigate('/home')
   }

   // kayıt birinci adım
   const firtspageF = (val) => {
      setPageCount(prev => prev + 1)
      dispath({
         type: 'AUTHING_USER_DATA',
         payload: {
            ...userData,
            birthDate: `${val.birth_month}-${val.birth_day}-${val.birth_year}`
         }
      })
   }
   // kayıt ikinci adım
   const secondpageF = (val) => {
      setPageCount(prev => prev + 1)
      dispath({
         type: 'AUTHING_USER_DATA',
         payload: {
            ...userData,
            ...val
         }
      })
   }

   // kayıt son adım
   const thirdpageF = (val)=>{
      dispath({
         type: 'AUTHING_USER_DATA',
         payload: {
            ...userData,
            ...val
         }
      })
      setPostUserData(true)
   }
   
   function setError(val){
      setNavigateFlag(val)
   }

   return <>


      <div className="signup_steps_container">

         {
            isError && <ErrorPage setError={setError} />
         }

         {
            pageCount === 0 && !isError && <FirstPage firstpage = {firtspageF} />
         }
         {
            pageCount === 1 && !isError && <SecondPage secondpage = {secondpageF} />
         }
         {
            pageCount === 2 && !isError && <ThirdPage thirdpage = {thirdpageF} />
         }
      </div>

      <BackDrop />
   </>
}


export default SignupStepsMain



