

import '../../../Styles/HomePageSubFolders/GifComponent.css'

import { Grid, Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useEffect, useRef, useState } from 'react'


const GifComponent = (props) => {

   const [searhedGif, setSearchedGif] = useState('')
   const [singleGif, setSingleGif] = useState(null)
   const gif_input_container = useRef()
   const [focusInput, setFocusInput] = useState(false)
   const searchBar = useRef()
   const [clearInpFlag, setClearInpFlag] = useState(false)

   const gf = new GiphyFetch('tWPvkLwPbgNCRjuq0Dw1VBVG031laeJM');
   const fetchGifs = (offset) => gf.search(searhedGif, { offset, limit: 10 })

   useEffect(() => { // arama çubuğuyla alakalı
      const inpClickHandler = (e) => {
         if (gif_input_container.current.contains(e.target)) {
            setFocusInput(true)
         } else {
            setFocusInput(false)
            setClearInpFlag(false)
         }
      }
      document.addEventListener('click', inpClickHandler)
      return () => {
         document.removeEventListener('click', inpClickHandler)
      }
   }, [])

   useEffect(()=>{
      setTimeout(() => {
         setFocusInput(true)
         searchBar.current.focus()
      }, 0);
   },[clearInpFlag])

   const inpStyle = {
      outline: focusInput ? '2px solid rgb(29, 155, 240)' : '1px solid rgb(207,217,222)'
   }
   const containerStyle = {
      overflowY: searhedGif.length === 0 && 'hidden',
   }

   const gifClickHandler = (e) => {
      async function waitGifToLoad() {
         const { data } = await gf.gif(e.id)
         props.gifDataProp(data)
      }
      waitGifToLoad()
   }
   const inpChangeHandler = (e) => {
      setSearchedGif(e.target.value)
   }

   const clearInputCrossHandler = (e) => { // arama çubuğundaki sağda olan çarpı
      setSearchedGif('')
      setClearInpFlag(true)
   }
   const clearInputSvg = ()=>{
      setSearchedGif('')
      searchBar.current.focus()
      setTimeout(() => {
         gif_input_container.current.style.outline = '2px solid rgb(29, 155, 240)'
      }, 0);
   }
   const closeInputSvg = ()=>{
      props.closeGifContainer()
   }
   const emptyHolderHandler = (e)=>{
      setSearchedGif(e.target.nextSibling.textContent)
   }


   return <div>

      <div style={containerStyle} className='gif_container'>
         <div className="gif_container_header">
            <div className="gif_header_bg"></div>
            <div className="gif_header_left">
               {
                  searhedGif.length > 0 ?
                     <svg onClick={clearInputSvg} viewBox="0 0 24 24"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g></svg>:
                     <svg onClick={closeInputSvg} viewBox="0 0 24 24" ><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
               }
            </div>
            <div style={inpStyle} ref={gif_input_container} className="gif_input_container">
               <div className="gif_inp_left">
                  <svg viewBox="0 0 24 24"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
               </div>
               <input ref={searchBar} placeholder='Search for GIFs' value={searhedGif} onChange={inpChangeHandler} type="text" className='gif_inp_body' />
                     {searhedGif.length > 0 &&
                        <div onClick={clearInputCrossHandler} className="gif_inp_right">
                           <svg viewBox="0 0 24 24"><g><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm3.71 12.54l-1.42 1.42-2.29-2.3-2.29 2.3-1.42-1.42 2.3-2.29-2.3-2.29 1.42-1.42 2.29 2.3 2.29-2.3 1.42 1.42-2.3 2.29 2.3 2.29z"></path></g></svg>
                        </div>
                     }
            </div>
         </div>

         {
            searhedGif.length > 0 ? <Grid  noLink onGifClick={gifClickHandler} className='gif_grid' width={600} columns={5} gutter={2} fetchGifs={fetchGifs} key={searhedGif} /> :
               <div onClick={emptyHolderHandler} className="emptyHolder">
                  <div>
                     <img alt="" draggable="false" src="https://media3.giphy.com/media/WJjLyXCVvro2I/giphy_s.gif"></img>
                     <span>Agree</span>
                  </div>
                  <div>
                     <img alt="" draggable="false" src="https://media2.giphy.com/media/fnK0jeA8vIh2QLq3IZ/giphy_s.gif"></img>
                     <span>Applause</span>
                  </div>
                  <div>
                     <img alt="" draggable="false" src="https://media0.giphy.com/media/rpf0Du8NasK6Q/giphy_s.gif"></img>
                     <span>Awww</span>
                  </div>
                  <div>
                     <img alt="" draggable="false" src="https://media0.giphy.com/media/l4Ep3mmmj7Bw3adWw/giphy_s.gif"></img>
                     <span>Dance</span>
                  </div>
                  <div>
                     <img alt="" draggable="false" src="https://media2.giphy.com/media/tqiYB9X6goN68/giphy_s.gif"></img>
                     <span>Deal with it</span>
                  </div>
                  <div>
                     <img alt="" draggable="false" src="https://media1.giphy.com/media/2pU8T0OTNkmre/giphy_s.gif"></img>
                     <span>Do no want</span>
                  </div>
                  <div>
                     <img alt="" draggable="false" src="https://media1.giphy.com/media/10FHR5A4cXqVrO/giphy_s.gif"></img>
                     <span>Eww</span>
                  </div>
                  <div>
                     <img alt="" draggable="false" src="https://media0.giphy.com/media/Dnt2VnWFknFNm/giphy_s.gif"></img>
                     <span>Fist bump</span>
                  </div>
               </div>
         }
      </div>
   </div>
}

export default GifComponent