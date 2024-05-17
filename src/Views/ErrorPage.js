
import '../Styles/ErrorPage.css'

const ErrorPage = (props)=>{

   const setError = ()=>{
      props.setError(true)
   }

   return <div className="error_page_container">
      <div className="mask"></div>

      <div className="firstpage_header">
         <div className="firstpage_cross_div">
         </div>
         <div className="firstpage_x_div">
            <div>
               <svg className='firstpage_svg_x' viewBox="0 0 24 24" aria-label="X" role="img" >
                  <g>
                     <path
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                     </path>
                  </g>
               </svg>
            </div>
         </div>
         <div className="firstpage_header_third"></div>
      </div>

      <div className="error_widget">
         <h1 className="error_page_h1">Hata</h1>
         <div className="error_page_text">Bir sorun oluştu. Lütfen daha sonra tekrar dene</div>

         <div onClick={setError} style={{cursor:'pointer'}} className="error_page_buton">
            <span>Tamam</span>
         </div>
      </div>
   </div>
}

export default ErrorPage

