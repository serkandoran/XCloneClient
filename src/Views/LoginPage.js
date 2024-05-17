import '../Styles/LoginPage.css'
import { useState,useEffect, useRef } from 'react'
import BackDrop from './BackDrop.js'
import ErrorPage from './ErrorPage.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'


const LoginPage = ()=>{

   const navigate = useNavigate()
   const telNo_Mail = useRef()
   const tel_mail_inner_span = useRef()
   const tel_mail_input = useRef()
   

   const [isError, setIsError] = useState(false)
   const [mainError, setMainError] = useState(false)
   // Error ile alakalı useEffect
   useEffect(()=>{
      if (isError){
         setMainError(false)
         navigate('/login')
      }
   },[isError])


   useEffect(()=>{

      isLogged()

   },[])

   const isLogged = async () => {
      axios.get('http://localhost:4000/api/v1/islogged',{
         withCredentials: 'include'
      })
      .then(res=>{
         if(res.status === 200){
            navigate('/home');
         }
      })
      .catch( err => {
         console.log(err);
      })
   }

   const inputAnimation = (e)=>{
      if (!mainError){
         if (
            e.target.id === 'telefonnumarasi' ||
            e.target.id === 'telefon_inner_span' ||
            e.target.id === 'telefon_span'
         ) {
            document.getElementById('telefon_span').focus()
            telNo_Mail.current.classList.add('border_class')
            tel_mail_inner_span.current.classList.add('textAnimationClass')
            tel_mail_inner_span.current.classList.remove('textAnimationEndClass')
            tel_mail_inner_span.current.addEventListener('animationend', () => {
               tel_mail_inner_span.current.style.paddingTop = '5px'
               tel_mail_inner_span.current.style.fontSize = '14px'
            })
         } else {
            telNo_Mail.current.classList.remove('border_class')
            if (tel_mail_inner_span.current.classList.value && !tel_mail_input.current.value) {
               tel_mail_inner_span.current.classList.add('textAnimationEndClass')
               tel_mail_inner_span.current.classList.remove('textAnimationClass')
            }
            tel_mail_inner_span.current.addEventListener('animationend', () => {
               tel_mail_inner_span.current.style.paddingTop = '15px'
               tel_mail_inner_span.current.style.fontSize = '18px'
            })
         }
      }
   }

   const loginWithGoogle = ()=>{
      async function q(){
         const response = await fetch('http://localhost:4000/api/v1/ga',{
            method: 'POST',
            credentials: 'include'
         })
         const data = await response.json()

         var newwindow;
         function createPop(url, name='login_google') {
            newwindow = window.open(url,name,'width=560,height=560,toolbar=0,menubar=0,location=0');
         }
         createPop(data.url)
         // açılan popup ekranının kapanması
         let myint = setInterval(() => {
            if (newwindow && newwindow.closed) {
               clearInterval(myint)
               apiCalls()
            }
         }, 100);
         const apiCalls = async () => {
            let responseData = await fetch('http://localhost:4000/api/v1/auth/payload', {
               method: 'GET',
               credentials: 'include'
            })
            if (responseData.status !== 200){
               setMainError(true)
               return
            }
            let resultResponseData = await responseData.json()

            if (resultResponseData.isUser) {
               navigate('/home')
               return
            }
         }
      }
      q()
   }


   const setError = (val)=>{
      setIsError(true)
   }

   return <>
      <div onClick={inputAnimation} id="login_container">
         
         {mainError && <ErrorPage setError={setError} /> }


         {!mainError && <div id="login_group">
            <div id="login_group_header">
               <div id="cross_div">
                  <div>
                     <svg id="svg_cross" viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
                  </div>
               </div>
               <div id="x_div">
                  <div>
                     <svg id='svg_x' viewBox="0 0 24 24" aria-label="X" role="img" >
                        <g>
                           <path
                              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                           </path>
                        </g>
                     </svg>
                  </div>
               </div>
               <div id="header_third"></div>
            </div>
            <div id="login_body_container">
               <div id="xgirisyap">
                  <h1>X'e giriş yap</h1>
               </div>
               <div onClick={loginWithGoogle} id="googleileoturumac">
                  <div id="google_svg_div">
                     <svg id="svg_google" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c">
                        <g>
                           <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path>
                        </g>
                     </svg>
                  </div>
                  <span>Google ile oturum açın</span>
               </div>
               <div id="appleilegirisyap">
                  <div id="applegiris_div">
                     <svg id="svg_apple" viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-1d4mawv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                        <g>
                           <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                        </g>
                     </svg>
                     <span>Apple ile giriş yap</span>
                  </div>
               </div>
               <div id="veya">
                  <div id='veya_left'>
                     <div id="veya_left_inner"></div>
                  </div>
                  <div id='veya_center'>
                     <span id='veya_center_span'>
                        <span id='veya_center_span_inner'>veya</span>
                     </span>
                  </div>
                  <div id='veya_right'>
                     <div id='veya_right_inner'></div>
                  </div>
               </div>
               <div ref={telNo_Mail} id="telefonnumarasi">
                  <div id="telefon_inner">
                     <span ref={tel_mail_inner_span} id='telefon_inner_span'>Telefon numarası, e-posta veya kullanıcı adı</span>
                  </div>
                  <input ref={tel_mail_input} id="telefon_span" type="text" />
                  <div id='telefonnumarasi_third'>
                     <div id="third_first"></div>
                  </div>
               </div>
               <div id="ileri" role='button'>
                  <div id="ileri_inner">
                     <span>İleri</span>
                  </div>
               </div>
               <div id="sifrenimiunuttun">
                  <div id="sifrenimiunuttun_inner">
                     <span>Şifreni mi unuttun?</span>
                  </div>
               </div>
               <div id="hesabinyokmu">
                  <span>Henüz bir hesabın yok mu?</span>
                  <span className='login_body_container_kaydol'>
                     <Link to="/signup">
                        Kaydol
                     </Link>
                  </span>
               </div>
            </div>
            </div>
         }

      </div>
      <BackDrop />
   </>
   
}

export default LoginPage
