
import { useDispatch } from 'react-redux'
import '../../Styles/SignupPages/FirstPage.css'
import { useEffect, useRef, useState } from 'react'



const FirstPage = (props)=>{
   const dispatch = useDispatch()
   const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan','Mayıs','Haziran',
      'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'
   ]
   const days = [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
   ]
   const years = [
      1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
   ]

   const [selectedMonth, setSelectedMonth] = useState('')
   const [selectedDay, setSelectedDay] = useState('')
   const [selectedYear, setSelectYear] = useState('')
   const [name,setName] = useState('')
   const inp_name_ref = useRef()
   const inp_name_container = useRef()

   const [birthDate, setBirthDate] = useState({
      birth_month: '',
      birth_day: '',
      birth_year: ''
   })
   const [canClick, setCanClick] = useState(false)

   useEffect(()=>{
      if (
         birthDate.birth_month !== '' &&
         birthDate.birth_day !== '' &&
         birthDate.birth_year !== ''
      ) {
         document.querySelector('.firstpage_body_bottom_section_inner').classList.add('clickableTrue')
         setCanClick(true)
      }else{
         document.querySelector('.firstpage_body_bottom_section_inner').classList.remove('clickableTrue')
         setCanClick(false)
      }
   },[birthDate])

   const handleNameChange = (e)=>{
      setName(e.target.value)
   }
   const handleMonthChange = (e) =>{
      setSelectedMonth(e.target.value)
      setBirthDate((prev)=>(
         {
            ...prev,
            birth_month: months.indexOf(e.target.value)+1
         }
      ))
   }
   const handleDayChange = (e) =>{
      setSelectedDay(e.target.value)
      setBirthDate((prev)=>(
         {
            ...prev,
            birth_day: e.target.value
         }
      ))
   }
   const handleYearChange = (e) =>{
      setSelectYear(e.target.value)
      setBirthDate((prev)=>(
         {
            ...prev,
            birth_year: e.target.value
         }
      ))
   }
   const handleFocus = (e)=>{
      if(e.target.id === 'months'){
         document.querySelector('.dogumtarihi_ay').classList.add('border_focus')
         document.querySelector('.dogumtarihi_gun').classList.remove('border_focus')
         document.querySelector('.dogumtarihi_yil').classList.remove('border_focus')
         inp_name_container.current.classList.remove('border_focus')
      }else if(e.target.id === 'days'){
         document.querySelector('.dogumtarihi_ay').classList.remove('border_focus')
         document.querySelector('.dogumtarihi_gun').classList.add('border_focus')
         document.querySelector('.dogumtarihi_yil').classList.remove('border_focus')
         inp_name_container.current.classList.remove('border_focus')
      }else if(e.target.id === 'years'){
         document.querySelector('.dogumtarihi_ay').classList.remove('border_focus')
         document.querySelector('.dogumtarihi_gun').classList.remove('border_focus')
         document.querySelector('.dogumtarihi_yil').classList.add('border_focus')
         inp_name_container.current.classList.remove('border_focus')
         } else if (inp_name_ref.current.contains(e.target)){
            inp_name_container.current.classList.add('border_focus')
            document.querySelector('.dogumtarihi_ay').classList.remove('border_focus')
            document.querySelector('.dogumtarihi_gun').classList.remove('border_focus')
            document.querySelector('.dogumtarihi_yil').classList.remove('border_focus')
      }else{
         document.querySelector('.dogumtarihi_ay').classList.remove('border_focus')
         document.querySelector('.dogumtarihi_gun').classList.remove('border_focus')
         document.querySelector('.dogumtarihi_yil').classList.remove('border_focus')
      }
   }
   const handleForward = ()=>{
      if(canClick){
         dispatch({
            type: 'AUTHING_USER_DATA',
            payload: {
               birthDate,
               name
            }
         })
         props.firstpage()
      }
   }

   return <div onFocus={handleFocus} tabIndex="0" className="firstpage_container">

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

      <div className="firstpage_body">
         <div className="firstpage_body_topsection">
            <div className="firstpage_body_topsection_inner">
               <div className="firstpage_body_topsection_inner_top">
                  <h1 className="firstpage_body_topsection_inner_top_h1">What's your birth date?</h1>
                  <div className="firstpage_body_topsection_inner_top_div"><span>This won't be public.</span></div>
               </div>


               <div className='inp-name border_focus' ref={inp_name_container}>
                  <input onChange={handleNameChange} placeholder='isim' type="text" ref={inp_name_ref} />
               </div>

               <div className="firstpage_body_topsection_inner_bottom">

                  <div className="dogumtarihi_ay">
                     <label className='month_label' htmlFor="months">
                        <span>Ay</span>
                     </label>
                     <select className='selectmonth_select' id="months" value={selectedMonth} onChange={handleMonthChange}>
                        <option value="" disabled></option>
                        {months.map((month, idx)=>(
                           <option key={idx} value={month}>{month}</option>
                        ))}
                     </select>
                     <svg viewBox="0 0 24 24" aria-hidden="true" className="svg_dropdown r-14j79pv r-4qtqp9 r-yyyyoo r-50lct3 r-fdch1b r-dnmrzs r-633pao r-u8s1d r-1pgswnq r-1plcrui r-1v2oles r-lrvibr">
                        <g>
                           <path 
                              d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z">
                           </path>
                        </g>
                     </svg>
                  </div>

                  <div className="dogumtarihi_gun">
                     <label className='day_label' htmlFor="days">
                        <span>Gün</span>
                     </label>
                     <select className='selectday_select' id="days" value={selectedDay} onChange={handleDayChange}>
                        <option value="" disabled></option>
                        {days.map((day, idx)=>(
                           <option key={idx} value={day}>{day}</option>
                        ))}
                     </select>
                     <svg viewBox="0 0 24 24" aria-hidden="true" className="svg_dropdown r-14j79pv r-4qtqp9 r-yyyyoo r-50lct3 r-fdch1b r-dnmrzs r-633pao r-u8s1d r-1pgswnq r-1plcrui r-1v2oles r-lrvibr">
                        <g>
                           <path 
                              d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z">
                           </path>
                        </g>
                     </svg>
                  </div>

                  <div className="dogumtarihi_yil">
                     <label className='year_label' htmlFor="years">
                        <span>Yıl</span>
                     </label>
                     <select className='selectyear_select' id="years" value={selectedYear} onChange={handleYearChange}>
                        <option value="" disabled></option>
                        {years.map((year, idx)=>(
                           <option key={idx} value={year}>{year}</option>
                        ))}
                     </select>
                     <svg viewBox="0 0 24 24" aria-hidden="true" className="svg_dropdown r-14j79pv r-4qtqp9 r-yyyyoo r-50lct3 r-fdch1b r-dnmrzs r-633pao r-u8s1d r-1pgswnq r-1plcrui r-1v2oles r-lrvibr">
                        <g>
                           <path 
                              d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z">
                           </path>
                        </g>
                     </svg>
                  </div> 

               </div>
            </div>
         </div>
         <div className="firstpage_body_bottomsection">
            <div onClick={handleForward} className="firstpage_body_bottom_section_inner">
               <span>İleri</span>
            </div>
         </div>
      </div>

   </div>
}

export default FirstPage










