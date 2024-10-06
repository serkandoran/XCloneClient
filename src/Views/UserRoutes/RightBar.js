
import { useEffect, useRef, useState } from 'react'
import '../../Styles/UserRoutesCss/Rightbar.css'
import { Link } from 'react-router-dom'



const Rightbar = ()=>{

   const svgRef = useRef()
   const searchRef = useRef()
   const controllRef = useRef()
   const [srcFlag, setSrcFlag] = useState(false)

   const handleMouseDown = (e)=>{
      if(controllRef.current && !controllRef.current.contains(e.target)){
         setSrcFlag(false)
      }
   }
   useEffect(()=>{
      document.addEventListener('mousedown', handleMouseDown)
      return ()=>{document.removeEventListener('mousedown', handleMouseDown)}
   },[])



   useEffect(()=>{
      if(srcFlag){
         svgRef.current.classList.add('search_svg_color')
         searchRef.current.classList.add('search_input_focus')
      }else{
         if(
            svgRef.current.classList.contains('search_svg_color')&&
            searchRef.current.classList.contains('search_input_focus')
         ){
               svgRef.current.classList.remove('search_svg_color')
               searchRef.current.classList.remove('search_input_focus')
         }
      }
   },[srcFlag])

   const handleInput = ()=>{
      setSrcFlag(true)
   }

   return <div className="rightbar_container">
      <div className="rightbar_body">
         <div className="rightbar">

            <div onClick={handleInput} ref={controllRef} className="rightbar_search_container">
               <div className="rightbar_search_inner" ref={searchRef}>
                  <label>
                     <div className='rsi_left'>
                        <svg ref={svgRef} viewBox="0 0 24 24" className='rsi_left_svg'><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
                     </div>
                     <div className='rsi_right'>
                        <input placeholder='Search' type="text" />
                     </div>
                  </label>
               </div>
            </div>

            <div className="rbs_seperator"></div>

            <div className="rightbar_subscribe">
               <div className="rightbar_subscribe_body">
                  <div className="rbs_top">
                     Subscribe to Premium
                  </div>
                  <div className="rbs_body">
                     Subscribe to unlock new features and if eligible, receive a share of ads revenue.
                  </div>
                  <div className="rbs_bottom">
                     <button>Subscribe</button>
                  </div>
               </div>
            </div>

            <div className="rightbar_trendsforyou_container">
               <div className="rightbar_trendsforyou">Trends for you</div>

               <div className="rightbar_first_data">
                  <div className='rightbar_data1'>Sports - Trending</div>
                  <div className='rightbar_data2'>#örnek</div>
                  <div className='rightbar_data3'>10.8K posts</div>
               </div>

               <div className="rightbar_first_data">
                  <div className='rightbar_data1'>Sports - Trending</div>
                  <div className='rightbar_data2'>#örnek</div>
                  <div className='rightbar_data3'>10.8K posts</div>
               </div>

               <div className="rightbar_first_data">
                  <div className='rightbar_data1'>Sports - Trending</div>
                  <div className='rightbar_data2'>#örnek</div>
                  <div className='rightbar_data3'>10.8K posts</div>
               </div>

               <div className="rightbar_first_data">
                  <div className='rightbar_data1'>Sports - Trending</div>
                  <div className='rightbar_data2'>#örnek</div>
                  <div className='rightbar_data3'>10.8K posts</div>
               </div>

               <div className="rightbar_first_data">
                  <div className='rightbar_data1'>Sports - Trending</div>
                  <div className='rightbar_data2'>#örnek</div>
                  <div className='rightbar_data3'>10.8K posts</div>
               </div>

               <div className="rightbar_first_data">
                  <div className='rightbar_data1'>Sports - Trending</div>
                  <div className='rightbar_data2'>#örnek</div>
                  <div className='rightbar_data3'>10.8K posts</div>
               </div>

               <div className="rightbar_first_data">
                  <div className='rightbar_data1'>Sports - Trending</div>
                  <div className='rightbar_data2'>#örnek</div>
                  <div className='rightbar_data3'>10.8K posts</div>
               </div>

               <div className="rightbar_first_data">
                  <div className='rightbar_data1'>Sports - Trending</div>
                  <div className='rightbar_data2'>#örnek</div>
                  <div className='rightbar_data3'>10.8K posts</div>
               </div>

               <div className="rightbar_first_data">
                  <div className='rightbar_data1'>Sports - Trending</div>
                  <div className='rightbar_data2'>#örnek</div>
                  <div className='rightbar_data3'>10.8K posts</div>
               </div>

               <Link className="whotofollow_inner_body_showmore">
                  <div>Show more</div>
               </Link>

            </div>

            <div className="whotofollow_container">
               <div className="whotofollow_body">
                  <div className="whotofollow_inner_top">
                     <h2>Who to follow</h2>
                  </div>
                  <div className="whotofollow_inner_body">

                     <div className="whotofollow_persondata">
                        <div className="whotofollow_persondata_left">
                           <div>

                           </div>
                        </div>
                        <div className="whotofollow_persondata_right">
                           <div className="whotofollow_persondata_right_inner">
                              <div className="whotofollow_persondata_right_inner_left">
                                 <div className='wtfpdril_bold'>örnek</div>
                                 <div className='wtfpdril_thin'>@örnek</div>
                              </div>
                              <div className="whotofollow_persondata_right_inner_right">
                                 <button>Follow</button>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="whotofollow_persondata">
                        <div className="whotofollow_persondata_left">
                           <div>

                           </div>
                        </div>
                        <div className="whotofollow_persondata_right">
                           <div className="whotofollow_persondata_right_inner">
                              <div className="whotofollow_persondata_right_inner_left">
                                 <div className='wtfpdril_bold'>örnek</div>
                                 <div className='wtfpdril_thin'>@örnek</div>
                              </div>
                              <div className="whotofollow_persondata_right_inner_right">
                                 <button>Follow</button>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="whotofollow_persondata">
                        <div className="whotofollow_persondata_left">
                           <div>

                           </div>
                        </div>
                        <div className="whotofollow_persondata_right">
                           <div className="whotofollow_persondata_right_inner">
                              <div className="whotofollow_persondata_right_inner_left">
                                 <div className='wtfpdril_bold'>örnek</div>
                                 <div className='wtfpdril_thin'>@örnek</div>
                              </div>
                              <div className="whotofollow_persondata_right_inner_right">
                                 <button>Follow</button>
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>


                  <Link className="whotofollow_inner_body_showmore">
                        <div>Show more</div>
                  </Link>


               </div>
            </div>

            <div className="whotofollow_termspolicy">
               <nav>
                  <a href="https://twitter.com/en/tos" target='_blank' rel='noreferrer'>Terms of Service</a>
                  <a href="https://twitter.com/en/privacy" target='_blank' rel='noreferrer'>Privacy Policy</a>
                  <a href="https://help.twitter.com/tr/rules-and-policies/x-cookies" target='_blank' rel='noreferrer'>Cookie Policy</a>
                  <a href="https://legal.twitter.com/tr/imprint" target='_blank' rel='noreferrer'>Imprint</a>
                  <a href="https://help.twitter.com/tr/resources/accessibility" target='_blank' rel='noreferrer'>Accessibility</a>
                  <a href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo" target='_blank' rel='noreferrer'>Ads info</a>
                  <a className='exceptional_a'>More
                     <svg viewBox="0 0 24 24" className='tardsvg'><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                  </a>
                  <a className='exceptional_a' >© 2023 X Corp.</a>
               </nav>
            </div>

         </div>
      </div>
   </div>
}

export default Rightbar
