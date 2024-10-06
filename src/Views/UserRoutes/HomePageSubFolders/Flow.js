
import '../../../Styles/HomePageSubFolders/Flow.css'

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Gif } from '@giphy/react-components';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Flow = (props)=>{
   const navigate = useNavigate()
   const flowRef = useRef()
   const likeRef = useRef()
   const activeUserStore = useSelector((state) => state.user.activeUser)
   const [likePost,setLikePost] = useState(props.from !== 'postdetail' && props.from !== 'draft' && props.data.likeCount.some(el => el.likedId === activeUserStore) ? 
         true : props.from === 'draft' && props.isLiked.includes(props.elidx) ? 
         true : props.from === 'postdetail' && props.data.commentLikeCount.includes(activeUserStore) ? 
         true : false)


   function draftLikeCount(){
      let result = 0
      props.data.likeCount.map(el => {
         if(el.likedElementIdx === props.elidx){
            result+=1
         }
      })
      return result
   }
   const [likeCount,setLikeCount] = useState(
      props.from === 'homepage' ? props.data.likeCount.length : 
      props.from === 'draft' ? draftLikeCount() : 
      props.from === 'postdetail' ? props.data.commentLikeCount.length : 0
   )

   const avatarLink = {
      backgroundImage: props.from === 'homepage' ? `url(${props.data.userDetail.picture})` : 
                       props.from === 'postdetail' ? `url(${props.data.picture})` :
                       props.from === 'draft' && `url(${props.userDetail.picture})`

   }
   const userName = props.from === 'homepage' ? props.data.userDetail.name : 
                    props.from === 'postdetail' ? props.data.name :
                    props.from === 'draft' && props.userDetail.name

   const goToDetail = (e) => {
      if (likeRef.current.contains(e.target)) return
      let id = uuidv4().split('-')[0]
      navigate(`/status/${id}`, {
         state: props.data
      })
   }
   const handleLikePost = ()=>{
      if(props.handleCommentLike){
         props.handleCommentLike(likePost,props.elidx)
         setLikePost(prev => !prev)
         if(likePost) setLikeCount(prev => prev-1)
         else setLikeCount(prev => prev + 1)
         return
      }
      if(likePost){ // unlike post
         axios.delete('http://localhost:4000/api/v1/unlikepost',{
            withCredentials: true,
            data:{
               postId:props.data._id,
               likedElementIdx: props.elidx
            }
         })
         .then((res)=>{
            if(props.from === 'draft') props.updateDraftElement(res.data)
            setLikePost(prev => !prev)
            setLikeCount(prev => prev - 1)
         })
         .catch((err)=>{
            console.log(err,' error occured when unliking post');
         })
      }else{ // liking post
         let data = {
            postId:props.data._id,
            likedElementIdx: props.elidx,
         }
         axios.post('http://localhost:4000/api/v1/likepost',data,{
            withCredentials:true
         })
         .then((res)=>{
            if(props.from === 'draft') props.updateDraftElement(res.data)
            setLikePost(prev => !prev)
            setLikeCount(prev => prev+1)
         })
         .catch((err)=>{
            console.log(err,' error occured when liking post');
         })
      }
   }

   return <div className={["flow_container", props.from === 'draft' ? 'no-hover':''].join(' ')} onClick={goToDetail} ref={flowRef}>
      <div className={['flow_each', props.from === 'draft' ? 'no-bbottom' : ''].join(' ')}>
         <div className="flow_each_left">
            <div style={avatarLink}></div>
         </div>
         <div className="flow_each_right">
            <div className="flow_body_header">
               <span>{userName}</span>
               <span>@{userName}</span>
               <span>
                  <svg viewBox="0 0 24 24"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
               </span>
            </div>
            <div className="flow_body_content">
               <div className="flow_body_content_inner">
                  {
                     props.from === 'homepage' ? props.data.postDetail.map((el,idx)=>{
                        return <div key={idx} className='media-holder'>
                           <div className="description">{el.description}</div>

                           <div className="media-holder-inner">
                              {
                                 el.contentAr.map((mediaEl,elidx)=>{
                                    return mediaEl.ctype === 'image' ?
                                             <img key={elidx} src={mediaEl.cdata} alt="" className={`f${elidx}`} /> :
                                             <Gif key={elidx} noLink gif={mediaEl.cdata} />
                                 })
                              }
                           </div>

                        </div>
                     }) : 
                     props.from === 'postdetail' ? props.data.commentDetail.map((el, idx) => {
                        return <div key={idx} className='media-holder' >
                           <div className="description">{el.commentString}</div>
                           <div className="media-holder-inner">
                              {
                                 el.commentContentAr.map((mediaEl, elidx) => {
                                    return mediaEl.mtype === 'image' ?
                                             <img key={elidx} src={mediaEl.mdata} alt="" className={`f${elidx} img-additional`} /> :
                                             <Gif key={elidx} noLink gif={mediaEl.mdata} />
                                 })
                              }
                           </div>
                        </div> 
                     }) :
                     props.from === 'draft' && <div className='media-holder'>
                              <div className="description">{props.eachDraftData.description}</div>
                              <div className="media-holder-inner">
                                 {
                                    props.eachDraftData.contentAr.map((el, idx) => {
                                       return el.ctype === 'image' ?
                                          <img key={idx} src={el.cdata} alt="" className={`f${idx} img-additional`} /> :
                                          <Gif key={idx} noLink gif={el.cdata} />
                                    })
                                 }
                              </div>
                     </div>
                  }
               </div>

            </div>

            <div className="flow_body_footer">
                  <div className="flow_body_footer_left">
                     <div className="reply">
                        <svg className="reply_svg" viewBox="0 0 24 24"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                        <span className="reply">{props.from === 'postdetail' ? 0 : props.data.comments.length}</span>
                     </div>
                     <div className="repost">
                        <svg className="repost_svg" viewBox="0 0 24 24"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
                        <span className="repost">0</span>
                     </div>
                  <div className="like" onClick={handleLikePost} ref={likeRef}>
                        {
                        likePost ? <svg viewBox="0 0 24 24" className='like-active like_svg'><g><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg> :
                                   <svg className="like_svg" viewBox="0 0 24 24"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                        }
                        <span className={["like-span", likePost ? 'like-text':''].join(' ')}>{likeCount}</span>
                     </div>
                     <div className="view">
                        <svg className="view_svg" viewBox="0 0 24 24"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>
                        <span className="view">0</span>
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

