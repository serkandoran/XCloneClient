
import { useDispatch, useSelector } from 'react-redux'
import '../../../Styles/HomePageSubFolders/Draft.css'
import RichTextBox from './RichTextBox'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import BackDrop2 from '../../BackDrop2'


const Draft = (props)=>{
   let richTB = useSelector(state => state.ui.inputField)
   let generalStore = useSelector(state => state.ui)
   const dispatch = useDispatch()

   const [focusedEl, setFocusedEl] = useState(richTB.length-1)
   const [discard,setDiscard] = useState(false)
   const discardRef = useRef()
   const btnRef = useRef()
   const [inpFlag, setInpFlag] = useState(false)
   const draft_container = useRef()
   const [playingVideo, setPlayingVideo] = useState(undefined)
   const [videoFlag,setVideoFlag] = useState(true)
   const [canPost, setCanPost] = useState({
      zeroBound:true,
      excessBound:true,
      questionStyle:true
   })
   const [activeQuestions,setActiveQuestions] = useState([])
   const [activeQidx,setActiveQidx] = useState([])


   useEffect(()=>{
      window.scroll(0,0)
   })
   const checkBounds = (storeParam)=>{
      let zeroBounds = false
      let excessBounds = false

      for (let i = 0; i < storeParam.length; i++) {
         if (Array.from(storeParam[i].text).length === 0 && storeParam[i].mediaContent.length === 0 ){
            zeroBounds = true
         }
         if (Array.from(storeParam[i].text).length > props.validTextLength){
            excessBounds = true
         }
      }
      setCanPost({
         ...canPost,
         zeroBound:zeroBounds,
         excessBound:excessBounds
      })
   }
   const closeDraftsHandler = ()=>{
      setDiscard(true)
   }
   const whichEl = (val)=>{
      setFocusedEl(val)
   }
   const clearImage = (wEl, wMediaIdx)=>{

      let newAr = [...richTB]
      let newinner = newAr[wEl].mediaContent.filter((el, idx) => idx !== wMediaIdx)
      newAr[wEl].mediaContent = newinner

      dispatch({
         type:'UPDATE_DRAFT',
         payload: [...newAr]
      })


   }
   const discardHandler = (e)=>{
      dispatch({
         type:'UPDATE_DRAFT',
         payload: []
      })
      dispatch({
         type: 'QUESTION_FORM',
         payload: []
      })
      props.closeDraftHandler()
   }
   const clickHandler = (e)=>{
      if(e.target === btnRef.current) return

      if(discard){
         if (!discardRef.current.contains(e.target)){
            setDiscard(false)
         }
      }
   }
   const addedNewField = (elidx,cnt,medias)=>{
      let newQuestionAr = JSON.parse(JSON.stringify(generalStore.questionForm))
      let newEl = {text: '', mediaContent: []}
      let newInputAr = JSON.parse(JSON.stringify(generalStore.inputField))

      newInputAr[elidx].text = cnt

      newInputAr.splice(elidx+1,0,newEl)
      newQuestionAr.splice(elidx+1, 0, undefined)

      newInputAr = newInputAr.filter((el,idx) => (newQuestionAr[idx] && newQuestionAr[idx].isActive) || el.text.length > 0 || el.mediaContent.length > 0 || idx === elidx+1)

      dispatch({
         type:'ADD_NEWFIELD_TO_DRAFT',
         payload: {newInputAr,newQuestionAr}
      })

      if (elidx + 1 === newInputAr.length) elidx-=1

      setFocusedEl(elidx+1)
      setInpFlag(true)

   }
   const resolveVideo = ()=>{
      let mainElement = [...draft_container.current.querySelectorAll('.header_container_wrapper')]
      let playingElIdx = playingVideo.videoElidx
      let playingVideoIdx = playingVideo.videoidx
      let targetContainer = mainElement[playingElIdx]

      let videoAr = targetContainer.querySelector('.draftmedia_container').
         querySelector('.mediaBody.mbgap.vf')
      let targetEl = videoAr.childNodes[playingVideoIdx].querySelector('video')
      targetEl.pause()
      setVideoFlag(false)
   }
   const videoStarted = (videoElidx,videoidx)=>{
      if(playingVideo) resolveVideo()
      setPlayingVideo({
         videoElidx,
         videoidx
      })
   }
   const videoPaused = ()=>{
      if(videoFlag) setPlayingVideo(undefined)
      else setVideoFlag(true)
   }
   const questionStyleControl = (val=undefined,state,elidx,qwe)=>{

      let store = JSON.parse(JSON.stringify(generalStore.questionForm))

      if(store[elidx]){
         if (state === 'TYPING') store = JSON.parse(JSON.stringify(val))
         if (state === 'CLOSE') store[elidx].isActive = false
         if (state === 'OPEN') store[elidx].isActive = true
      }else{
         let newOjb = {
            ctype: 'question',
            isActive: true,
            cdata: {
               texts: ['',''],
               day: 1,
               hour: 0,
               minute: 0
            }
         }
         store[elidx] = newOjb
      }
      
      dispatch({
         type: 'QUESTION_FORM',
         payload: store
      })

      canPost.questionStyle = true

      for(let i=0; i<store.length; i++){
         if (store[i] && store[i].isActive && (store[i].cdata.texts[0].length === 0 || store[i].cdata.texts[1].length === 0)){
            canPost.questionStyle = false
            break;
         }
      }
      setCanPost(canPost)
   }
   
   const postAll = ()=>{
      let mainObj = {}
      mainObj.type = 'draft'
      mainObj.postDetail = []

      for(let i=0; i<generalStore.inputField.length;i++){
         let obj = {}
         obj.contentAr = []
         obj.description = generalStore.inputField[i].text

         for (let j = 0; j < generalStore.inputField[i].mediaContent.length;j++){
            let inner_obj = {}
            inner_obj.ctype = generalStore.inputField[i].mediaContent[j].mtype
            inner_obj.cdata = generalStore.inputField[i].mediaContent[j].mdata
            obj.contentAr.push(inner_obj)
         }
         mainObj.postDetail.push(obj)
      }
      let questionAr = JSON.parse(JSON.stringify(generalStore.questionForm))

      for(let i=0; i<questionAr.length;i++){
         if (questionAr[i] && questionAr[i].isActive){
            mainObj.postDetail[i].contentAr.push(questionAr[i])
         }
      }
      props.postTweet(mainObj,'draft')

   }

   return <div onClick={clickHandler} className='draft_container' ref={draft_container}>
      <div className="draft_header">
         <div onClick={closeDraftsHandler} className='close_draft'>
            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
         </div>
         <div className='go_drafts'><span>Drafts</span></div>
      </div>

      {
         generalStore.inputField.map((el,idx)=>{
            return <RichTextBox
               key = {idx}
               clearInput={() => setInpFlag(false)}
               el = {el}
               inpFlag = {inpFlag}
               elidx = {idx}
               whichEl = {()=>whichEl(idx)}
               showEl = {idx === focusedEl ? true : false}
               addedNewField={(elidx,cnt,medias) => addedNewField(elidx = idx,cnt,medias)}
               clearImage = {clearImage}
               canPost = {canPost}
               wholeAr={richTB}
               checkBounds = {checkBounds}
               videoStarted = {videoStarted}
               videoPaused = {videoPaused}
               postAll = {postAll}
               questionStyleControl={questionStyleControl}
               showQuestion = { generalStore.questionForm[idx] && generalStore.questionForm[idx].isActive ? true : false }
            />
         })
      }
      {
         discard && createPortal(
            <>
               <BackDrop2 />
               <div ref={discardRef} onClick={clickHandler} className="discard_container">
                  <div className="discard">
                     <div style={{fontWeight:'700',fontSize:'20px',paddingBottom:'6px'}}>Discard thread?</div>
                     <span style={{color:'rgb(83, 100, 113)'}}>This can't be undone and you'll lose your draft</span>
                     <div className="discardBtnContainer">
                        <div ref={btnRef} onClick={discardHandler} className="discardBtn">Discard</div>
                        <div onClick={()=>setDiscard(false)} className="discardCancelBtn">Cancel</div>
                     </div>
                  </div>
               </div>
            </>,
            document.getElementById('layers')
         )
      }


   </div>
}


export default Draft
