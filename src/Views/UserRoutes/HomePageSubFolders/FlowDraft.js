import React, { useRef, useState } from 'react'
import '../../../Styles/HomePageSubFolders/FlowDraft.css'
import Flow from './Flow';
import axios from 'axios';

const FlowDraft = (props) => {
   const flowDraftRef = useRef()
   const [propsAr, setPropsAr] = useState(JSON.parse(JSON.stringify(props.data.postDetail)))

   let likedElIndexes = props.data.likeCount.map(el => el.likedElementIdx)

   const updateDraftElement = (val)=>{
      props.updateDraftHomePage(val)
   }

  return <div className='flowdraft-container hover pickh' ref={flowDraftRef}>
      <span className="lines"></span>
      {
         propsAr.map((el,idx)=>{
            return <Flow 
               key = {idx}
               from = {'draft'}
               eachDraftData = {el}
               data = {props.data}
               userDetail = {{name:props.data.userDetail.name,picture:props.data.userDetail.picture}}
               elidx = {idx}
               updateDraftElement={updateDraftElement}
               isLiked = {likedElIndexes}
            />
         })
      }


  </div>
}

export default FlowDraft