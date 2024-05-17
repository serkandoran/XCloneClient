import '../../Styles/SignupPages/ThirdPage.css'
import countryAndPhone from '../../Assets/countriesAndCodes.json'
import { useState, useRef, useEffect } from 'react'

const ThirdPage = (props)=>{

   const datas = countryAndPhone
   const ulke_kodu = useRef()
   const country_svg = useRef()
   const defaultSelect = datas.find((data) => (data.name === 'Turkey'))
   const [selectedData, setSelectedData] = useState(defaultSelect)


   const butonouter = useRef()
   const butoninner = useRef()
   const butonspan = useRef()

   const [ileri, setIleri] = useState(false)


   const ulke_kodu_border_focus = ()=>{
      ulke_kodu.current.classList.add('ulke_kodu_border')
      country_svg.current.classList.add('country_select_svg')
   }
   const ulke_kodu_border_blur = ()=>{
      ulke_kodu.current.classList.remove('ulke_kodu_border')
      country_svg.current.classList.remove('country_select_svg')
   }

   const telNo_Mail = useRef()
   const tel_mail_inner_span = useRef()
   const tel_mail_input = useRef()
   const [telnoinput, setTelnoinput] = useState('')

   const inputAnimation = (e) => {
      if (
         e.target.id === 'telefonnumarasi' ||
         e.target.id === 'telefon_inner_span' ||
         e.target.id === 'telefon_span'
      ) {
         document.getElementById('telefon_span').focus()
         telNo_Mail.current.classList.add('border_class_45')
         tel_mail_inner_span.current.classList.add('textAnimationClass')
         tel_mail_inner_span.current.classList.remove('textAnimationEndClass')
         tel_mail_inner_span.current.addEventListener('animationend', () => {
            tel_mail_inner_span.current.style.paddingTop = '5px'
            tel_mail_inner_span.current.style.fontSize = '14px'
         })
      } else {
         telNo_Mail.current.classList.remove('border_class_45')
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

   const checkbox_selector = useRef()
   const svg = useRef()
   const [clicked, setClicked] = useState(true)

   const checkbox_selector2 = useRef(true)
   const svg2 = useRef()
   const [clicked2, setClicked2] = useState(true)

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
      if (clicked2) {
         checkbox_selector2.current.classList.add('third_section_checkbox_clicked')
         checkbox_selector2.current.classList.remove('third_section_checkbox_not_clicked')
         svg2.current.style.color = 'rgb(255,255,255)'
      } else {
         checkbox_selector2.current.classList.add('third_section_checkbox_not_clicked')
         checkbox_selector2.current.classList.remove('third_section_checkbox_clicked')
         svg2.current.style.color = 'rgba(0,0,0,0)'
      }

   }, [clicked,clicked2])

   const checkBoxClick = () => {
      setClicked(prev => !prev)
   }
   const checkBoxClick2 = () => {
      setClicked2(prev => !prev)
   }
   
   const handleDataChange = (e) => {
      setSelectedData(prev => ({
         name: e.target.value.split('*')[0],
         dial_code: e.target.value.split('*')[1],
         validlength: e.target.value.split('*')[2],
      }))
   }

   const handle_phone_input_change = (e)=>{
      setTelnoinput(prev => e.target.value)
   }

   useEffect(()=>{

      function checkinput(){
         let sonuc
         if(telnoinput.length && telnoinput.length < 25){
            for(let i=0; i<telnoinput.length;i++){
               if(isNaN(telnoinput[i]) || telnoinput.replace(/\s/g,'').length !== parseInt(selectedData.validlength)){
                  sonuc = false
                  return sonuc
               }
            }
         }
         return sonuc
      }
      if(
            telnoinput.length > 0 &&
            telnoinput.length != parseInt(selectedData.validlength) ||
            checkinput() === false
         ){
         tel_mail_inner_span.current.classList.add('text_color_wrong')
         telNo_Mail.current.classList.add('border_class_45_wrong')

         butonouter.current.classList.remove('buton_valid')
         butoninner.current.classList.remove('buton_inner_valid')
         butonspan.current.classList.remove('buton_span_valid')

         setIleri(false)

      }else{
         if(telnoinput.length == selectedData.validlength){
            tel_mail_inner_span.current.classList.remove('text_color_wrong')
            tel_mail_inner_span.current.classList.add('text_color')
            telNo_Mail.current.classList.remove('border_class_45_wrong')


            butonouter.current.classList.add('buton_valid')
            butoninner.current.classList.add('buton_inner_valid')
            butonspan.current.classList.add('buton_span_valid')

            setIleri(true)
         }
      }
   },[selectedData, telnoinput])


   const handleIleri = () => {
      if (ileri) {
         props.thirdpage({
            phoneNumber: `${selectedData.dial_code}-${telnoinput}`
         })
      }
   }

   return <div onClick={inputAnimation} className="thirdpage_container">
      <div className="secondpage_header45">
         <div className="secondpage_header_right">
            <div>
               <h2 className='secondpage_header_h2'>
                  <span>Adım 3/3</span>
               </h2>
            </div>
         </div>
      </div>

      <div className="secondpage_body">

         <div className="secondpage_body_topsection">
            <div className="secondpage_body_topsection_inner">
               <div className="secondpage_body_topsection_inner_last_45">
                  <div className="secondpage_body_topsection_inner_topsection">
                     <h1>
                        <span>Telefon numarası ekle</span>
                     </h1>
                     <div className='telefonnumarasiekle_alti'>
                        X hesabınla ilişkilendirmek istediğin telefon numarasını gir. Bu numaraya bir onaylama kodu gönderilecek.
                     </div>
                  </div>
                  

                  <div onBlur={ulke_kodu_border_blur} onFocus={ulke_kodu_border_focus} tabIndex="0" ref={ulke_kodu} className="ulke_kodu">
                     <label className='month_label' htmlFor="months">
                        <span>Ülke Kodu</span>
                     </label>

                     <select defaultValue={`${defaultSelect.name}*${defaultSelect.dial_code}*${defaultSelect.validlength}`} className='selectmonth_select' id="datas" onChange={handleDataChange}>
                        {datas.map((data, idx) => (
                           <option key={idx} value={`${data.name}*${data.dial_code}*${data.validlength}`}>
                              {data.dial_code} {data.name}
                           </option>
                        ))}
                     </select>


                     <svg ref={country_svg} viewBox="0 0 24 24" aria-hidden="true" className="svg_dropdown r-14j79pv r-4qtqp9 r-yyyyoo r-50lct3 r-fdch1b r-dnmrzs r-633pao r-u8s1d r-1pgswnq r-1plcrui r-1v2oles r-lrvibr">
                        <g>
                           <path
                              d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z">
                           </path>
                        </g>
                     </svg>
                  </div>

                  <div ref={telNo_Mail} id="telefonnumarasi">
                     <div id="telefon_inner">
                        <span ref={tel_mail_inner_span} id='telefon_inner_span'>Telefon numaran</span>
                     </div>
                     <input onChange={handle_phone_input_change} ref={tel_mail_input} id="telefon_span" type="text" />
                     <div id='telefonnumarasi_third'>
                        <div id="third_first"></div>
                     </div>
                  </div>


                  <label className="secondpage_body_topsection_inner_thirdsection">
                     <div className="thirdsection_first_45">
                        <span>Telefon numaranı bilen kişilerin X'te seni bulmasına ve seninle bağlantı kurmasına izin ver. </span>
                        <a href="https://help.twitter.com/tr/safety-and-security/email-and-phone-discoverability-settings" target='_blank'>Daha fazla bilgi al</a>
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


                  <label className="secondpage_body_topsection_inner_thirdsection">
                     <div className="thirdsection_first_45">
                        <span>Reklamlar dahil olmak üzere (Reklam tercihlerinde izin verilirse) hizmetlerimizi kişiselleştirmek için X'in telefon numaranı kullanmasına izin ver. Bu ayarı etkinleştirmesen de X; hesap güvenliği ve spam, dolandırıcılık ve taciz durumlarını engellemek gibi amaçlarla telefon numaranı kullanabilir. </span>
                        <a href="https://twitter.com/en/privacy" >Daha fazla bilgi için Gizlilik Politikamızı incele</a>
                     </div>

                     <div className="thirdsection_second">
                        <label className='thirdsection_second_label'>
                           <div className='thirdsection_second_label_div'>
                              <div>
                                 <div ref={checkbox_selector2} onClick={checkBoxClick2} className='third_section_checkbox_not_clicked'>
                                    <div>
                                       <svg ref={svg2} viewBox="0 0 24 24" aria-hidden="true" className="thirdsection_second_checkbox_svg r-1p0dtai r-jwli3a r-4qtqp9 r-yyyyoo r-z80fyv r-1d2f490 r-ywje51 r-dnmrzs r-u8s1d r-zchlnj r-1plcrui r-ipm5af r-lrvibr"><g><path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path></g></svg>
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


         <div onClick={handleIleri} ref={butonouter} className="thirdpage_body_bottomsection">
            <div ref={butoninner} className="secondpage_body_bottom_section_inner">
               <span ref={butonspan}>İleri</span>
            </div>
         </div>
      </div>

   </div>

}

export default ThirdPage

