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
   let data

   useEffect(()=>{
      isLogged()
      if(isError){
         // hata göster
         setIsError(true)
         // /signup yönlendir
         if(navigateFlag){
            navigate('/signup')
         }
         // api istek yap. userDatayı undefined yap.
      }

   },[navigateFlag])

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
   // kayıt birinci adım
   const firtspageF = (val) => {
      setPageCount(prev => prev + 1)
   }
   // kayıt ikinci adım
   const secondpageF = (val) => {
      setPageCount(prev => prev + 1)
   }
   // kayıt son adım
   const thirdpageF = (val)=>{
      data = JSON.parse(JSON.stringify(userData))
      data = {
         ...data,
         val
      }
   }
   function setError(val){
      setNavigateFlag(val)
   }
   const handleBackwards = (val)=>{
      if(val === 'secondpage') setPageCount(0)
   }

   return <>


      <div className="signup_steps_container">

         {
            isError && <ErrorPage setError={setError} />
         }

         {
            pageCount === 0 && !isError && <FirstPage firstpage={firtspageF} />
         }
         {
            pageCount === 1 && !isError && <SecondPage secondpage={secondpageF} handleBackwards={handleBackwards} />
         }
         {
            pageCount === 2 && !isError && <ThirdPage thirdpage={thirdpageF} handleBackwards={handleBackwards} />
         }
      </div>

      <BackDrop />
   </>
}


export default SignupStepsMain



