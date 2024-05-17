import '../Styles/BackDrop.css'
import { useEffect } from 'react'


const BackDrop = ()=>{
   useEffect(()=>{

      let html = document.querySelector('html')
      html.style.overflow = 'hidden'
      
      return ()=>{
         html.style.overflow = 'auto'
      }
   },[])

   return <div id="backdrop_container"></div>
}

export default BackDrop
