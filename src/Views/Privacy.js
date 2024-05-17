import '../Styles/Privacy.css'
import { useRef, useState, useEffect } from 'react'


const Privacy = ()=>{
   const checkbox_selector = useRef()
   const checkbox_selector_ = useRef()
   const svg = useRef()
   const svg_ = useRef()
   const [clicked, setClicked] = useState(true)
   const [clicked_, setClicked_] = useState(true)

   useEffect(() => {
      if (clicked) {
         checkbox_selector.current.classList.add('third_section_checkbox_clicked')
         checkbox_selector.current.classList.remove('third_section_checkbox_not_clicked')
         svg.current.style.color = 'rgb(255,255,255)'
      } else {
         checkbox_selector.current.classList.add('third_section_checkbox_not_clicked')
         checkbox_selector.current.classList.remove('third_section_checkbox_clicked')
         svg.current.style.color = 'rgba(0,0,0,0)'
      }
      if (clicked_) {
         checkbox_selector_.current.classList.add('third_section_checkbox_clicked')
         checkbox_selector_.current.classList.remove('third_section_checkbox_not_clicked')
         svg_.current.style.color = 'rgb(255,255,255)'
      } else {
         checkbox_selector_.current.classList.add('third_section_checkbox_not_clicked')
         checkbox_selector_.current.classList.remove('third_section_checkbox_clicked')
         svg_.current.style.color = 'rgba(0,0,0,0)'
      }
   }, [clicked,clicked_])

   const checkBoxClick = () => {
      setClicked(prev => !prev)
   }
   const checkBoxClick_ = () => {
      setClicked_(prev => !prev)
   }

   return <div className="privacy_container">

      <div className="privacy_header">
         <div className="firstpage_cross_div">
            <div className="secondpage_header_left">
               <svg viewBox="0 0 24 24" aria-hidden="true" className="secondpage_header_svg r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                  <g>
                     <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                  </g>
               </svg>
            </div>
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

      <div className="privacy_body">

         <div className="secondpage_body_topsection">
            <div className="secondpage_body_topsection_inner">
               <div className="secondpage_body_topsection_inner_last">
                  <div className="secondpage_body_topsection_inner_topsection">
                     <h1>
                        <span>Gizlilik</span>
                     </h1>
                  </div>
                 

                  <label className="privacy_label">
                     <div className="privacy_label_first">
                        <span className='span11'>Başkalarının beni e-posta adresimle bulmasına izin ver</span>
                        <span className='span12'>E-posta adresine sahip kişiler Twitter'da seninle bağlantı kurabilir.</span>
                     </div>

                     <div className="privacy_second">
                        <label className='thirdsection_second_label'>
                           <div className='thirdsection_second_label_div'>
                              <div>
                                 <div ref={checkbox_selector_} onClick={checkBoxClick_} className='third_section_checkbox_not_clicked'>
                                    <div>
                                       <svg ref={svg_} viewBox="0 0 24 24" aria-hidden="true" className="thirdsection_second_checkbox_svg r-1p0dtai r-jwli3a r-4qtqp9 r-yyyyoo r-z80fyv r-1d2f490 r-ywje51 r-dnmrzs r-u8s1d r-zchlnj r-1plcrui r-ipm5af r-lrvibr"><g><path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path></g></svg>
                                    </div>
                                 </div>
                                 <input className='lastinput' type="checkbox" />
                              </div>
                           </div>
                        </label>
                     </div>
                  </label>


                  <label className="privacy_label">
                     <div className="thirdsection_first">
                        <span className='span21'>Başkalarının beni telefon numaramla bulmasına izin ver</span>
                        <span className='span22'>Telefon numarana sahip kişiler Twitter'da seninle bağlantı kurabilir.</span>
                     </div>

                     <div className="privacy_second">
                        <label className='thirdsection_second_label'>
                           <div className='thirdsection_second_label_div'>
                              <div>
                                 <div ref={checkbox_selector} onClick={checkBoxClick} className='third_section_checkbox_not_clicked'>
                                    <div>
                                       <svg ref={svg} viewBox="0 0 24 24" aria-hidden="true" className="thirdsection_second_checkbox_svg r-1p0dtai r-jwli3a r-4qtqp9 r-yyyyoo r-z80fyv r-1d2f490 r-ywje51 r-dnmrzs r-u8s1d r-zchlnj r-1plcrui r-ipm5af r-lrvibr"><g><path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path></g></svg>
                                    </div>
                                 </div>
                                 <input className='lastinput' type="checkbox" />
                              </div>
                           </div>
                        </label>
                     </div>
                  </label>

               </div>
            </div>
         </div>

        
         <div style={{cursor:'pointer'}} className="secondpage_body_bottomsection">
            <div className="secondpage_body_bottom_section_inner">
               <span>Tamam</span>
            </div>
         </div>


      </div>


      

   </div>
}


export default Privacy

