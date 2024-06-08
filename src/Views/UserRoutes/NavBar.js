import '../../Styles/UserRoutesCss/NavBar.css'
import { useEffect, useRef, useState } from "react"
import { Link, Navigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const NavBar = ()=>{
   const [selectedSvg, setSelectedSvg] = useState('/'+window.location.href.split('/')[window.location.href.split('/').length-1])
   const userStore = useSelector(state => state.user)
   const [modalFlag, setModalFlag] = useState(false)
   const modalRef = useRef()
   const [loFlag, setLoFlag] = useState(false)
   const loRef = useRef()
   const firstSvg = useRef()
   const secondSvg = useRef()
   const thirdSvg = useRef()
   const [svgName, setSvgName] = useState('')
   const [svgFlag,setSvgFlag] = useState(false)
   const creator_studio_expand = useRef()
   const professional_tools_expand = useRef()
   const settings_support_expand = useRef()
   const currentUserPhoto = userStore.userPicture
   const currentUserName = userStore.userName
   const navigate = useNavigate()
   const userAvatar = {
      backgroundImage: `url(${currentUserPhoto})`
   }

   useEffect(()=>{
      if(svgName === 'first'){
         if(!firstSvg.current.classList.contains('mc_bs_inner_svg_animation')){
            firstSvg.current.classList.add('mc_bs_inner_svg_animation')
            creator_studio_expand.current.classList.remove('not_expanded')
            creator_studio_expand.current.classList.add('expanded')
         }else{
            firstSvg.current.classList.remove('mc_bs_inner_svg_animation')
            creator_studio_expand.current.classList.remove('expanded')
            creator_studio_expand.current.classList.add('not_expanded')
         }
      }else if(svgName === 'second'){
         if(!secondSvg.current.classList.contains('mc_bs_inner_svg_animation')){
            secondSvg.current.classList.add('mc_bs_inner_svg_animation')
            professional_tools_expand.current.classList.remove('not_expanded')
            professional_tools_expand.current.classList.add('expanded')
         }else{
            secondSvg.current.classList.remove('mc_bs_inner_svg_animation')
            professional_tools_expand.current.classList.remove('expanded')
            professional_tools_expand.current.classList.add('not_expanded')
         }
      }else if(svgName === 'third'){
         if(!thirdSvg.current.classList.contains('mc_bs_inner_svg_animation')){
            thirdSvg.current.classList.add('mc_bs_inner_svg_animation')
            settings_support_expand.current.classList.remove('not_expanded')
            settings_support_expand.current.classList.add('expanded')
         }else{
            thirdSvg.current.classList.remove('mc_bs_inner_svg_animation')
            settings_support_expand.current.classList.remove('expanded')
            settings_support_expand.current.classList.add('not_expanded')
         }
      }
   },[svgFlag])

   // sidebardaki svglerin seçimi
   const svgChoose = (val) => {
      setSelectedSvg(prev => val)
   }
   // more'ye tıklayınca açılan modal
   const showModal = ()=>{
      setModalFlag(true)
   }
   // moreye basınca açılan modalda, tıklama yapılması
   const svgAnimation = (val)=>{
      setSvgName(val)
      setSvgFlag(prev => !prev)
   }
   const isOutsideClicked = (e)=>{
      if(modalRef.current && !modalRef.current.contains(e.target)){
         setModalFlag(false)
      }
      if(loRef.current && !loRef.current.contains(e.target)){
         loRef.current.classList.remove('modal_open')
         loRef.current.classList.add('modal_close')
         setTimeout(() => {
            setLoFlag(false)
         }, 120);
      }
   }
   useEffect(()=>{
      document.addEventListener('mousedown', isOutsideClicked)
      return ()=>{
         document.addEventListener('mousedown', isOutsideClicked)
      }
   },[])
   useEffect(()=>{
      if(loFlag){
         loRef.current.classList.add('modal_open')
      }
   },[loFlag])
   // logout Modal
   function openProfileModal(){
      setLoFlag(true)
   }
   const logout = ()=>{
      axios.get('http://localhost:4000/api/v1/logout',{
         withCredentials:true
      })
      .then(res=>{
         navigate('/login')
      })
      .catch(err =>{
         console.log(err,' error occured when logging out');
      })
   }

   return <header className="hp_left" >
         <div>
            <div className="hepleft_inner eeh">
               <div className="hpleft_inner_body eeh">
                  <div className="hpib_top eeh">
                     <div className="hptop_top eeh">
                        <h1 className='hptop_h1'>
                           <a href="/home" className='a_home'>
                              <div className='hptop_svgdiv'>
                                 <svg className='hptop_svg' viewBox="0 0 24 24" aria-hidden="true">
                                    <g>
                                       <path
                                          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                       </path>
                                    </g>
                                 </svg>
                              </div>
                           </a>
                        </h1>
                     </div>
                     <div className="hptop_mid">
                        <nav className="hptopmid_nav">
                           <Link to="/home" onClick={() => svgChoose('/home')}>
                              <div className='deneme'>
                                 <div className="hptopmid_nav_leftchild" >
                                    {
                                       selectedSvg === '/home' ? <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"></path></g></svg>
                                          : <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z"></path></g></svg>
                                    }
                                 </div>
                                 <div className="hptopmid_nav_rightchild">
                                    <span>Home</span>
                                 </div>
                              </div>
                           </Link>
                           <Link to='/explore' onClick={() => svgChoose('/explore')}>
                              <div>
                                 <div className="hptopmid_nav_leftchild">
                                    {
                                       selectedSvg === '/explore' ? <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z"></path></g></svg>
                                          : <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
                                    }

                                 </div>
                                 <div className="hptopmid_nav_rightchild">
                                    <span>Explore</span>
                                 </div>
                              </div>
                           </Link>
                           <Link to="/notifications" onClick={() => svgChoose('/notifications')}>
                              <div>
                                 <div className="hptopmid_nav_leftchild">
                                    {
                                       selectedSvg === '/notifications' ? <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z"></path></g></svg>
                                          : <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path></g></svg>

                                    }
                                 </div>
                                 <div className="hptopmid_nav_rightchild">
                                    <span>Notifications</span>
                                 </div>
                              </div>
                           </Link>
                           <Link to="/messages" onClick={() => svgChoose('/messages')}>
                              <div>
                                 <div className="hptopmid_nav_leftchild">
                                    {
                                       selectedSvg === '/messages' ? <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z"></path></g></svg>
                                          : <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>
                                    }
                                 </div>
                                 <div className="hptopmid_nav_rightchild" style={{paddingBlock:'2px'}}>
                                    <span>Messages</span>
                                 </div>
                              </div>
                           </Link>
                           <Link to="/lists" onClick={() => svgChoose('/lists')}>
                              {/* burada linke basınca www..twi.../nurhan14138/lists   buraya gidiyor */}
                              <div>
                                 <div className="hptopmid_nav_leftchild">
                                    {
                                       selectedSvg === '/lists' ? <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M18.5 2h-13C4.12 2 3 3.12 3 4.5v15C3 20.88 4.12 22 5.5 22h13c1.38 0 2.5-1.12 2.5-2.5v-15C21 3.12 19.88 2 18.5 2zM16 14H8v-2h8v2zm0-4H8V8h8v2z"></path></g></svg>
                                          : <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"></path></g></svg>

                                    }
                                 </div>
                                 <div className="hptopmid_nav_rightchild">
                                    <span>Lists</span>
                                 </div>
                              </div>
                           </Link>
                           <Link to="/bookmarks" onClick={() => svgChoose('/i/bookmarks')}>
                              <div>
                                 <div className="hptopmid_nav_leftchild">
                                    {
                                       selectedSvg === '/i/bookmarks' ? <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"></path></g></svg>
                                          : <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g></svg>

                                    }
                                 </div>
                                 <div className="hptopmid_nav_rightchild">
                                    <span>Bookmarks</span>
                                 </div>
                              </div>
                           </Link>
                           <Link to="/communities" onClick={() => svgChoose('/communities')}>
                              <div>
                                 <div className="hptopmid_nav_leftchild">
                                    {
                                       selectedSvg === '/communities' ? <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-1.608 1.732-2.762 4.389-2.869 8.248l-.03 1.083zM9.616 9.27C10.452 8.63 11 7.632 11 6.5 11 4.57 9.433 3 7.5 3S4 4.57 4 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73zm6.884 1.726c-3.264 0-6.816 2.358-7 8.977L9.471 21h14.057l-.029-1.027c-.184-6.618-3.736-8.977-7-8.977zm2.116-1.726C19.452 8.63 20 7.632 20 6.5 20 4.57 18.433 3 16.5 3S13 4.57 13 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73z"></path></g></svg>
                                          : <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path></g></svg>
                                    }
                                 </div>
                                 <div className="hptopmid_nav_rightchild">
                                    <span>Communities</span>
                                 </div>
                              </div>
                           </Link>
                           <Link to="/premium">
                              <div>
                                 <div className="hptopmid_nav_leftchild">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                                 </div>
                                 <div className="hptopmid_nav_rightchild">
                                    <span>Premium</span>
                                 </div>
                              </div>
                           </Link>
                           <Link to="/profile" onClick={() => svgChoose('/profile')}>
                              {/* routing the page www..twt.../nurhan14138 */}
                              <div>
                                 <div className="hptopmid_nav_leftchild">
                                    {
                                       selectedSvg === '/isimdeğeri' ? <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path></g></svg>
                                          : <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>
                                    }
                                 </div>
                                 <div className="hptopmid_nav_rightchild">
                                    <span>Profile</span>
                                 </div>
                              </div>
                           </Link>

                           <div onClick={showModal} className='more_show_modal'>
                              <div>
                                 <div className="hptopmid_nav_leftchild">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-4.75 11.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25S6 11.31 6 12s.56 1.25 1.25 1.25zm9.5 0c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM13.25 12c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25z"></path></g></svg>
                                 </div>
                                 <div className="hptopmid_nav_rightchild">
                                    <span>More</span>
                                 </div>
                              </div>
                           </div>

                           

                           <div className="hptopmid_nav_post">
                              <Link to="/tweet" className='a_compose-tweet'>
                                 <div>
                                    <span>Post</span>
                                 </div>
                              </Link>
                           </div>
                        </nav>
                     </div>
                  </div>

                  

                  <div className="hpib_bottom" onClick={openProfileModal}>
                     <div className="hpib_bottom_inner">
                        <div className="hpib_bottom_inner_menu">
                           <div className="hpib_bottom_inner_menu_1">
                              <div>
                                 <div style={userAvatar}></div>
                              </div>
                           </div>
                           <div className="hpib_bottom_inner_menu_2">
                              <div className="hpib_bottom_inner_menu_2">
                                 <div>
                                    <div className="hpib_bottom_inner_menu_2_top">
                                       <div>
                                          <span>
                                             {currentUserName}
                                          </span>
                                       </div>
                                    </div>
                                    <div className="hpib_bottom_inner_menu_2_bottom">
                                       <div>
                                          @{currentUserName}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="hpib_bottom_inner_menu_3">
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                 <g>
                                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                                 </g>
                              </svg>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {
               modalFlag && <div className="dummy"></div>
            }
            {
               loFlag && <div className="dummy"></div>
            }
         </div>


         {modalFlag && createPortal(
            <div className="more_click_container" ref={modalRef}>
               <div className="more_click">
                  <div className='eeh'>
                     <div>
                        <div className="more_click_top">
                           {/* <Link to="/settings/monetization"> */}
                           <a>
                              <div>
                                 <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="icon"><g><path d="M23 3v14h-2V5H5V3h18zM10 17c1.1 0 2-1.34 2-3s-.9-3-2-3-2 1.34-2 3 .9 3 2 3zM1 7h18v14H1V7zm16 10c-1.1 0-2 .9-2 2h2v-2zm-2-8c0 1.1.9 2 2 2V9h-2zM3 11c1.1 0 2-.9 2-2H3v2zm0 4c2.21 0 4 1.79 4 4h6c0-2.21 1.79-4 4-4v-2c-2.21 0-4-1.79-4-4H7c0 2.21-1.79 4-4 4v2zm0 4h2c0-1.1-.9-2-2-2v2z"></path></g></svg>
                                 <div>Monetization</div>
                              </div>
                           </a>
                        </div>
                        <div className="more_click_seperator">
                           <div></div>
                        </div>
                        <div className="more_click_bottomsection">
                           <div onClick={() => svgAnimation('first')} className='more_click_bottomsection_inner'>
                              <div className="mc_bs_inner_div">
                                 <div>
                                    <span>Creator Studio</span>
                                 </div>
                              </div>
                              <svg ref={firstSvg} viewBox="0 0 24 24" aria-hidden="true" className='mc_bs_inner_svg' ><g><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path></g></svg>
                           </div>
                           <div ref={creator_studio_expand} className="creator_studio_expand not_expanded">
                              <div>
                                 <svg viewBox="0 0 24 24" className='creator_studio_svg' aria-hidden="true"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>
                                 <span>Analytics</span>
                              </div>
                           </div>
                           <div onClick={() => svgAnimation('second')} className='more_click_bottomsection_inner'>
                              <div className="mc_bs_inner_div">
                                 <div>
                                    <span>Professional Tools</span>
                                 </div>
                              </div>
                              <svg ref={secondSvg} viewBox="0 0 24 24" aria-hidden="true" className='mc_bs_inner_svg' ><g><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path></g></svg>
                           </div>
                           <div ref={professional_tools_expand} className="creator_studio_expand not_expanded">
                              <div>
                                 <svg viewBox="0 0 24 24" aria-hidden="true" className='professional_tools_svg'><g><path d="M1.996 5.5c0-1.38 1.119-2.5 2.5-2.5h15c1.38 0 2.5 1.12 2.5 2.5v13c0 1.38-1.12 2.5-2.5 2.5h-15c-1.381 0-2.5-1.12-2.5-2.5v-13zm2.5-.5c-.277 0-.5.22-.5.5v13c0 .28.223.5.5.5h15c.276 0 .5-.22.5-.5v-13c0-.28-.224-.5-.5-.5h-15zm8.085 5H8.996V8h7v7h-2v-3.59l-5.293 5.3-1.415-1.42L12.581 10z"></path></g></svg>
                                 <span>Ads</span>
                              </div>
                           </div>
                           <div onClick={() => svgAnimation('third')} className='more_click_bottomsection_inner'>
                              <div className="mc_bs_inner_div">
                                 <div>
                                    <span>Settings and Support</span>
                                 </div>
                              </div>
                              <svg ref={thirdSvg} viewBox="0 0 24 24" aria-hidden="true" className='mc_bs_inner_svg' ><g><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path></g></svg>
                           </div>
                           <div ref={settings_support_expand} className='setting_support_inner_container not_expanded'>
                              <div className="creator_studio_expand">
                                 <div>
                                    <svg viewBox="0 0 24 24" className='creator_studio_expand_svg'><g><path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path></g></svg>
                                    <span>Settings and privacy</span>
                                 </div>
                              </div>
                              <div className="creator_studio_expand">
                                 <div>
                                    <svg viewBox="0 0 24 24" className='creator_studio_expand_svg' ><g><path d="M11.57 11.96l.99-.79c.33-.26.56-.53.7-.8.15-.27.22-.57.22-.91 0-.41-.12-.74-.38-.97s-.62-.35-1.09-.35-.85.12-1.13.37c-.26.25-.4.59-.4 1.03 0 .2.03.42.08.65l-2.07-.15c-.06-.29-.09-.55-.09-.79 0-.84.33-1.51.98-2.01.67-.49 1.55-.74 2.66-.74 1.17 0 2.07.24 2.71.73.63.48.95 1.16.95 2.04 0 .98-.47 1.86-1.4 2.65l-.87.73c-.17.15-.29.28-.36.4-.06.11-.09.26-.09.45v.46h-2.1v-.67c0-.3.06-.55.17-.75.12-.2.29-.39.52-.58zm-.52 5.17c.24.25.56.37.93.37.39 0 .7-.12.94-.37.25-.25.37-.56.37-.94 0-.39-.12-.7-.37-.95-.24-.25-.55-.37-.94-.37-.37 0-.69.12-.93.37s-.36.56-.36.95c0 .38.12.69.36.94zM22.25 12c0 5.66-4.59 10.25-10.25 10.25S1.75 17.66 1.75 12 6.34 1.75 12 1.75 22.25 6.34 22.25 12zM12 20.25c4.56 0 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75 3.75 7.44 3.75 12s3.69 8.25 8.25 8.25z"></path></g></svg>
                                    <span>Help Center</span>
                                 </div>
                              </div>
                              <div className="creator_studio_expand">
                                 <div>
                                    <svg viewBox="0 0 24 24" className='creator_studio_expand_svg' ><g><path d="M20 12h2v6.5c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 21 2 19.88 2 18.5v-13C2 4.12 3.12 3 4.5 3H11v2H4.5c-.28 0-.5.22-.5.5v13c0 .28.22.5.5.5h15c.27 0 .5-.22.5-.5V12zm2.31-6.78l-6.33 7.18c-.2 2.02-1.91 3.6-3.98 3.6H8v-4c0-2.07 1.58-3.78 3.6-3.98l7.18-6.33c.99-.88 2.49-.83 3.43.1.93.94.98 2.44.1 3.43zm-1.52-2.01c-.19-.19-.49-.2-.69-.02l-6.08 5.36c.59.35 1.08.84 1.43 1.43l5.36-6.08c.18-.2.17-.5-.02-.69z"></path></g></svg>
                                    <span>Display</span>
                                 </div>
                              </div>
                              <div className="creator_studio_expand">
                                 <div>
                                    <svg viewBox="0 0 24 24" className='creator_studio_expand_svg' ><g><path d="M11.999 22.25c-5.652 0-10.25-4.598-10.25-10.25S6.347 1.75 11.999 1.75 22.249 6.348 22.249 12s-4.598 10.25-10.25 10.25zm0-18.5c-4.549 0-8.25 3.701-8.25 8.25s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25-3.701-8.25-8.25-8.25zm.445 6.992c1.747-.096 3.748-.689 3.768-.695l.575 1.916c-.077.022-1.616.48-3.288.689v.498c.287 1.227 1.687 2.866 2.214 3.405l-1.428 1.4c-.188-.191-1.518-1.576-2.286-3.144-.769 1.568-2.098 2.952-2.286 3.144l-1.428-1.4c.527-.54 1.927-2.178 2.214-3.405v-.498c-1.672-.209-3.211-.667-3.288-.689l.575-1.916c.02.006 2.021.6 3.768.695m0 0c.301.017.59.017.891 0M12 6.25c-.967 0-1.75.78-1.75 1.75s.783 1.75 1.75 1.75 1.75-.78 1.75-1.75-.784-1.75-1.75-1.75z"></path></g></svg>
                                    <span>Keyboard Shortcuts</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>,
            document.getElementById('layers')
         )}
         
         {loFlag && createPortal(
               <div className='profile_modal_container' ref={loRef}>
                  <div className="profile_modal">
                     <svg viewBox="0 0 24 24" aria-hidden="true" className='profile_modal_svg'><g><path d="M22 17H2L12 6l10 11z"></path></g></svg>
                     <div className='profile_modal_holder'>
                        <Link>
                           <div>Add an existing account</div>
                        </Link>
                        <Link onClick={logout}>
                           <div>Log out @{currentUserName}</div>
                        </Link>
                     </div>
                  </div>
               </div>,
               document.getElementById('layers'))}


      </header>
}

export default NavBar

