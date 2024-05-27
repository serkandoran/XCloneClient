
import '../../../Styles/HomePageSubFolders/Flow.css'

import { useState } from 'react'
import { Gif } from '@giphy/react-components'


const Flow = (props)=>{

   const [mediaAr, setMediaAr] = useState([
      {
         mtype: "image",
         mdata: "data:image/jpeg;base64,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"
      },
   ])

   return <div className="flow_container">
      <div className="flow_each">

         <div className="flow_each_left">
            <div style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/a/ACg8ocK_yeA5iF6fFL-TeEVWsvNlDEQBPeT1QECzUHDqibrQ=s96-c)' }}></div>
         </div>


         <div className="flow_each_right">
            <div className="flow_body_header">
               <span>NO CONTEXT HUMANS</span>
               <span>@HumansNoContext</span>
               <span>
                  <svg viewBox="0 0 24 24"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
               </span>
            </div>


            <div className="flow_body_content">
               <div className="flow_body_content_inner">
                  {
                     props.data.postDetail.map((el,idx)=>{
                        return <div className='media-holder' key={idx}>
                           <div className="description">Lorem iQuae vitae ad consequatur quaerat molestiae tempore?</div>
                           
                           <div className="media-holder-inner">
                              {
                                 el.contentAr.map((mediaEl,elidx)=>{
                                    return mediaEl.ctype === 'image' ?
                                             <img key={elidx} src={mediaEl.cdata} alt="" className={`f${elidx}`} /> :
                                             <Gif noLink gif={mediaEl.cdata} />

                                 })
                              }
                           </div>

                        </div>
                     })
                  }
               </div>

            </div>

            <div className="flow_body_footer">
               <div className="flow_body_footer_left">
                  <div className="reply">
                     <svg className="reply_svg" viewBox="0 0 24 24"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                     <span className="reply">{props.data.replyCount}</span>
                  </div>
                  <div className="repost">
                     <svg className="repost_svg" viewBox="0 0 24 24"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
                     <span className="repost">{props.data.repostCount}</span>
                  </div>
                  <div className="like">
                     <svg className="like_svg" viewBox="0 0 24 24"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                     <span className="like">{props.data.likeCount}</span>
                  </div>
                  <div className="view">
                     <svg className="view_svg" viewBox="0 0 24 24"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>
                     <span className="view">{props.data.viewCount}</span>
                  </div>
               </div>
               <div className="flow_body_footer_right">
                  <div className="Bookmark">
                     <svg viewBox="0 0 24 24"><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g></svg>
                  </div>
                  <div className="Share">
                     <svg viewBox="0 0 24 24"><g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path></g></svg>
                  </div>
               </div>
            </div>

         </div>

      </div>

   </div>
}

export default Flow

