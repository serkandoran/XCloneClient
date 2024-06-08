
import '../../Styles/SignupPages/SecondPage.css'
import { useEffect, useRef, useState } from 'react'



const SecondPage = (props)=>{


   const checkbox_selector = useRef()
   const svg = useRef()
   const [clicked, setClicked] = useState(true)

   useEffect(()=>{
      if(clicked){
         checkbox_selector.current.classList.add('third_section_checkbox_clicked')
         checkbox_selector.current.classList.remove('third_section_checkbox_not_clicked')
         svg.current.style.color = 'rgb(255,255,255)'
      }else{
         checkbox_selector.current.classList.add('third_section_checkbox_not_clicked')
         checkbox_selector.current.classList.remove('third_section_checkbox_clicked')
         svg.current.style.color = 'rgba(0,0,0,0)'
      }
   },[clicked])

   const checkBoxClick = ()=>{
      setClicked(prev => !prev)
   }
   const handleGeri = ()=>{
      props.handleBackwards('secondpage')
   }
   const handleIleri = ()=>{
      props.secondpage()
   }

   return <div className="secondpage_container">
      <div className="secondpage_header">
         <div className="secondpage_header_left">
            <div onClick={handleGeri} style={{cursor:'pointer'}}>
               <svg viewBox="0 0 24 24" aria-hidden="true" className="secondpage_header_svg r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                  <g>
                     <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                  </g>
               </svg>
            </div>
         </div>
         <div className="secondpage_header_right">
            <div>
               <h2 className='secondpage_header_h2'>
                  <span>Adım 2/3</span>
               </h2>
            </div>
         </div>
      </div>


      <div className="secondpage_body">

         <div className="secondpage_body_topsection">
            <div className="secondpage_body_topsection_inner">
               <div className="secondpage_body_topsection_inner_last">
                  <div className="secondpage_body_topsection_inner_topsection">
                     <h1>
                        <span>Deneyimini özelleştir</span>
                     </h1>
                  </div>
                  <div className="secondpage_body_topsection_inner_secondsection">
                     <span>Web'de X içeriğini nerelerde gördüğünü kontrol el</span>
                  </div>

                  <label className="secondpage_body_topsection_inner_thirdsection">
                     <div className="thirdsection_first">
                        <span>"X deneyimini kişiselleştirmek için bu veriyi kullanır. Bu web tarama geçmişi asla ismin, e-postan veya telefon numaranla birlikte saklanmaz"</span>
                     </div>

                     <div className="thirdsection_second">
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

                  <div className="secondpage_body_topsection_inner_lastsection">
                     <span className='secondpage_body_topsection_inner_lastsection_buradan'>Buradan </span>
                     <span>aksini belirtmediğin sürece e-postanı ve telefon numaranı girdiğinde diğerleri seni bulabilir. Bu ayarlar hakkında daha fazla ayrıntı için</span>
                     <a className='third_section_ahrefs' href="https://help.twitter.com/tr/managing-your-account/new-account-settings" target='_blank'> Yardım Merkezi</a>
                     <span>'ni ziyaret et. Gizlilik politikamızda belirtildiği üzere X, hesabını güvende tutmak ve reklamlar dahil olmak üzere hizmetlerimizi kişiselleştirmek gibi amaçlar doğrultusunda e-posta adresini kullanabilir. </span>
                     <a className='third_section_ahrefs' href="https://twitter.com/en/privacy" target='_blank'>Daha fazla bilgi al</a>
                  </div>
               </div>
            </div>
         </div>

         <div onClick={handleIleri} style={{cursor:'pointer'}} className="secondpage_body_bottomsection">
            <div className="secondpage_body_bottom_section_inner">
               <span>İleri</span>
            </div>
         </div>
      </div>
   </div>
}


export default SecondPage



