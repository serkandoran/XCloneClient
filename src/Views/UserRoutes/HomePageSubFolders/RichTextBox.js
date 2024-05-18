import '../../../Styles/UserRoutesCss/HomePage.css'
import '../../../Styles/HomePageSubFolders/RichTextBox.css'
import { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import UploadImage from './UploadImage'
import GifComponent from './GifComponent'
import QuestionComponent from './QuestionComponent'
import { Gif } from '@giphy/react-components'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'


const RichTextBox = (props) => {
   let rtb = useSelector(state => state.ui.inputField)
   let questionRtb = useSelector(state => state.ui.questionForm)
   let dispatch = useDispatch()

   const [inputclick, setInputclick] = useState(false)
   const textareaDivRef = useRef()
   const [inputValue, setInputValue] = useState('')
   const validTextLength = 10
   const [emojiFlag, setEmojiFlag] = useState(false)
   const emojiRef = useRef()
   const openEmojiRef = useRef()
   const openQuestionRef = useRef()
   const [caretstate, setcaretstate] = useState(0)
   const [inputWorked, setInputWorked] = useState(false)
   const [mousePressing, setMousePressing] = useState(false)
   let stopReleasing = false
   let outOfContent = false
   const [mediaAr, setMediaAr] = useState([...props.wholeAr[props.elidx].mediaContent])

   const [gifFlag,setGifFlag] = useState(false)
   const [gifData,setGifData] = useState(null)

   const [questionFlag, setQuestionFlag] = useState(props.showQuestion)

   const [fillBoundary, setFillBoundary] = useState(0)
   const [emjx, setemjx] = useState()
   const [emjy, setemjy] = useState()

   const addNewDraftRef = useRef()

   const generalWrapper = useRef()

   useEffect(() => {
      setQuestionFlag(props.showQuestion);
   }, [props.showQuestion]);

   useEffect(() => {
      const handleMouseDown = (e) => {
         if (!textareaDivRef.current.contains(e.target)) {
            outOfContent = true
         } else {
            outOfContent = false
         }
      }
      document.addEventListener('mousedown', handleMouseDown)
      return () => {
         document.removeEventListener('mousedown', handleMouseDown)
      }
   }, [])

   useEffect(() => {
      const handleMouseUp = (e) => {
         if (document.getElementById('backdrop_container')){
            if (e.target === document.getElementById('backdrop_container')){
               setGifFlag(false)
            }
         }
         if (outOfContent) return
         let { selectedText } = selectionFunction(textareaDivRef.current)
         if (selectedText.length) {
            setTimeout(() => {
               calculateCaret(textareaDivRef.current)
            }, 0);
         }
         setMousePressing(false)
      }
      document.addEventListener('click', handleMouseUp);
      return () => {
         document.removeEventListener('click', handleMouseUp);
      };
   }, []);

   useEffect(() => { // emojinin kapanması
      const handleDocumentClick = (e) => {
         if (emojiFlag && !emojiRef.current.contains(e.target)) {
            findAndMoveCaret(textareaDivRef.current, caretstate)
            setEmojiFlag(false)
         }
      };
      document.addEventListener('click', handleDocumentClick);
      return () => {
         document.removeEventListener('click', handleDocumentClick);
      };
   }, [emojiFlag, caretstate]);

   useEffect(()=>{
      if(gifFlag){
         document.body.style.overflow = 'hidden'
      }else{
         document.body.style.overflow = ''
      }
   },[gifFlag])

   useEffect(()=>{
      if(props.showEl){
         textareaDivRef.current.focus()
         setInputclick(true)
      }
   },[])

   useEffect(() => {
      onInputChange(document.querySelector('.hp_cnt_right_top'), false, true)
   }, [])
   useEffect(() => {
      if (!props.showEl) {
         textareaDivRef.current.textContent = props.el.text
         onInputChange(document.querySelector('.hp_cnt_right_top'), false, true)
      }else{
         if (!emojiFlag && !questionFlag) textareaDivRef.current.focus()
         if (props.inpFlag){
            onInputChange(document.querySelector('.hp_cnt_right_top'), false, true)
            setInputValue(0)
            setcaretstate(0)
            setFillBoundary(0)
            props.clearInput()
         }
      }
   })

   useEffect(()=>{
      let newRtb = JSON.parse(JSON.stringify(rtb))
      newRtb[props.elidx].text = textareaDivRef.current.textContent
      dispatch({
         type: 'UPDATE_DRAFT',
         payload: [...newRtb]
      })
      props.checkBounds(newRtb)
   },[inputValue,mediaAr])

   const iconsInlineStyle = {
      marginTop: !inputclick && '16px'
   }

   const postDivStyle = {
      userSelect: 'none',
      opacity: props.canPost.excessBound ? '.5' :
               props.canPost.zeroBound ? '.5' :
               !props.canPost.questionStyle ? '.5' : '1',

      pointerEvents: props.canPost.excessBound ? '.5' :
               props.canPost.zeroBound ? '.5' :
               !props.canPost.questionStyle ? '.5' : '1'
   }
   const postDivButtonStyle = {
      cursor: inputValue.length > 0 ? 'pointer' : 'default',

   }
   const fadeIcons = {
      opacity: gifData || questionFlag || mediaAr.length >= 4 ? '0.4' : '',
      pointerEvents: gifData || questionFlag || mediaAr.length >= 4 ? 'none' : '',
   }
   const fadeQuestion = {
      opacity: mediaAr.length > 0 ? '0.4' : '',
      pointerEvents: mediaAr.length > 0 ? 'none' : '',
   }
   const hasMultipleImage = {
      width: mediaAr.length > 1 && 'calc(50% - 16px)'
   }
   const imgStyle = {
      height: mediaAr.length > 1 && '300px'
   }
   const boundaryStyle = {
      background: `conic-gradient(${fillBoundary < validTextLength && ((360 * fillBoundary / validTextLength) * 100 / 360) < 80 ? 'rgb(29, 155, 240)' : ((360 * fillBoundary / validTextLength) * 100 / 360) >= 80 && fillBoundary < validTextLength ? 'rgb(255, 212, 0)': 'rgb(253,0,0)'}${360 * fillBoundary / validTextLength}deg, rgb(239, 243, 244) 0deg)`,
      scale: ((360 * fillBoundary / validTextLength)*100/360) >= 80 && '1.3'
   }
   const opacityStyle = {
      opacity: props.showEl ? '1' : '0.5'
   }
   const emojiPos = {
      zIndex:'14',
      width:'352px',
      left: `${emjx-150}px`,
      top: `${emjy+30}px`
   }

   function waitForEmoji() {
      return new Promise((res, rej) => {
         if (!emojiFlag) {
            setTimeout(() => {
               setEmojiFlag(true)
               res()
            }, 200);
         }
      })
   }
   const openEmoji = async () => {
      await waitForEmoji()
      let rect = openEmojiRef.current.getBoundingClientRect();
      setemjx(parseInt(rect.left))
      setemjy(parseInt(rect.top))
   }
   const emojiHandle = (e) => {
      let curText = textareaDivRef.current.textContent

      let newTextAr = [...Array.from(curText).slice(0, caretstate), ...[e.emoji], ...Array.from(curText).slice(caretstate)]
      let newText = newTextAr.join('')


      textareaDivRef.current.textContent = newText
      setcaretstate(prev => prev + 1)

      onInputChange(textareaDivRef.current, true)
   }
   const onPasteHandler = (e) => {
      e.preventDefault();
      let x = (e.originalEvent || e).clipboardData.getData('text/plain');
      x = x.replace(/\s+/g, '').replace(/"\}/g, '}')
      document.execCommand("insertText", false, x)
   }
   const inputControl = (e) => {
      if (!e.target.contains(openEmojiRef.current) || generalWrapper.current.contains(e.target)) {

         setInputclick(true)

         setTimeout(() => {
            if (e.target.contains(openEmojiRef.current)) return
         }, 0);

         if(stopReleasing) return

         if (openEmojiRef.current.contains(e.target)) return
         if (openQuestionRef.current.contains(e.target)) return

         textareaDivRef.current.focus()
         findAndMoveCaret(textareaDivRef.current, caretstate)

         if(addNewDraftRef.current.contains(e.target)) return

         props.whichEl()
      }
   }
   const textArrays = (e, text) => {

      let validAr = [], n_validAr = []

      let textar = Array.from(text)

      let piece = ''
      for (let i = 0; i < textar.length; i++) {
         if (i === validTextLength) break; // ilk kısım bittiyse break;

         if (textar[i].length === 2) { // emojiye çattı
            if (piece.length > 0) validAr.push(piece)
            validAr.push(textar[i])
            piece = ''
         } else { // normal text
            piece += textar[i]
         }
      }
      if (piece.length > 0) validAr.push(piece)

      piece = ''
      if (textar.length > validTextLength) {
         for (let i = validTextLength; i < textar.length; i++) {
            if (textar[i].length === 2) { // emojiye çattı
               if (piece.length > 0) n_validAr.push(piece)
               n_validAr.push(textar[i])
               piece = ''
            } else { // normal text
               piece += textar[i]
            }
         }
      }

      if (piece.length > 0) n_validAr.push(piece)

      return { validAr, n_validAr }
   }
   const cleanStyles = (target, param) => { // valid kısımlar için background vs varsa, temizle
      for (let i = 0; i < param.length; i++) {
         if (target.childNodes[i].classList.contains('redHighLight')) target.childNodes[i].classList.remove('redHighLight')
      }
   }
   const addStyles = (target, param) => { // n_valid kısımlar için background vs ekle
      for (let i = param.length; i < target.childNodes.length; i++) {
         if (!target.childNodes[i].classList.contains('redHighLight')) target.childNodes[i].classList.add('redHighLight')
      }
   }
   const positionCaret = (el, idx) => {
      let idxofel
      if (el.textContent.length === 2 && Array.from(el.textContent).length === 1) { // emoji var
         idxofel = [...textareaDivRef.current.childNodes].indexOf(el) + 1
         idx = idxofel
         el = textareaDivRef.current
      } else {
         el = el.firstChild
      }
      try {
         let range = document.createRange()
         let sel = window.getSelection()
         range.setStart(el, idx)
         range.setEnd(el, idx)
         sel.removeAllRanges()
         sel.addRange(range)
      } catch {
         return
      }
   }
   const keyUpControl = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         return
      }
      if (e.key === 'Backspace' || e.key === 'Delete') return // baackSpace ve Delete, basılı tutulup silinmeye karşın, keyDownda güncelliyor. Ekstra olmasın diye
      if (!e.target.textContent.length) return // input alanı boşken shift,ctrl vs gibi şeylere basılması
      calculateCaret(e.target)
   }
   const keyDownControl = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         return
      }
      if (e.key === 'Backspace' || e.key === 'Delete') {
         calculateCaret(e.target) // baackSpace tuşu delete'nin basılı tutulup silinmesine karşın
      }
   }
   const selectionFunction = (etarget) => {
      let whichWay = ''
      let selection = window.getSelection();
      let selectedText = selection.toString()
      if (selection && selection.rangeCount > 0 && selectedText.length > 0) {
         let sStart = selection.anchorNode // seçimin başladığı node
         let sEnd = selection.focusNode // seçimin bittiği node

         if (sStart === sEnd) {
            let startidx = selection.anchorOffset
            let endidx = selection.focusOffset
            if (startidx > endidx) whichWay = 'left'
            else whichWay = 'right'
         } else {
            let startidx = [...etarget.childNodes].indexOf(sStart.parentElement)
            let endidx = [...etarget.childNodes].indexOf(sEnd.parentElement)
            if (startidx > endidx) whichWay = 'left'
            else whichWay = 'right'
         }
      }
      return { whichWay, selectedText }
   }
   const calculateCaret = (etarget) => {

      setInputWorked(false)
      if (inputWorked) return
      let el = window.getSelection().extentNode.parentElement
      let elidx = [...etarget.children].indexOf(el)
      let pos = window.getSelection().extentOffset

      let minusFlag = false
      if (elidx < 0) minusFlag = true // input emojiyle bitiyorsa

      if (!minusFlag) { // input emojiyle bitmiyorsa
         if (elidx >= 0 && etarget.childNodes[elidx].textContent.length === 2
            && Array.from(etarget.childNodes[elidx].textContent).length === 1
            && pos > 0
         ) { // emoji kontrol
            pos--
         }

         let idx = 0
         for (let i = 0; i < elidx; i++) {
            idx += Array.from(etarget.childNodes[i].textContent).length
         }
         pos += idx
         let { whichWay, selectedText } = selectionFunction(etarget)
         if (whichWay === 'right') {
            pos -= Array.from(selectedText).length
         }
      } else {
         pos = 0
         for (let i = 0; i < window.getSelection().anchorOffset; i++) {
            if(etarget.childNodes[i]) pos += Array.from(etarget.childNodes[i].textContent).length
         }
      }
      setcaretstate(pos)
      return pos
   }
   const findAndMoveCaret = (etarget, shouldToBe) => { // cursor nerdeyse ona göre o elementin şurasında diye dönderiyor.
      let el
      let count = 0
      for (let i = 0; i < etarget.childNodes.length; i++) {
         let cur = etarget.childNodes[i].textContent
         let len = Array.from(cur).length
         for (let j = 0; j < len; j++) {
            count++
            if (count === shouldToBe) {
               el = etarget.childNodes[i]
               break
            }
         }
         if (el) break
         shouldToBe -= count
         count = 0
      }

      if (!el) el = etarget
      if (shouldToBe < 0) shouldToBe = 0

      positionCaret(el, shouldToBe)
   }
   const updateCaret = (e, param = -2) => { // ekleme silme olduğu durum

      if (!e.target) return

      if (mousePressing) return // eğer mouse basılı ise careti hareket ettirme

      setInputWorked(true) // onInput calistiginda, keyUp calismaması için

      let newTypedLength = param < 0 && Array.from(e.nativeEvent.data).length
      let shouldToBe = param < 0 && caretstate ? newTypedLength+caretstate : param < 0 && !caretstate ? newTypedLength : param



      setcaretstate(shouldToBe)

      findAndMoveCaret(e.target, shouldToBe)
   }
   const onInputChange = (e, fromEmoji = false, fromDraft = false) => {


      let etarget = textareaDivRef.current

      setFillBoundary(Array.from(etarget.textContent).length) // tweet boxtaki, boundary için


      if (fromEmoji) etarget = e
      else if (!fromDraft) etarget = e.target

      setInputValue(etarget.textContent)
      let typedInput = etarget.textContent

      if(fromDraft) typedInput = props.el.text

      let forDelete
      if (!fromEmoji && !fromDraft) {
         forDelete = -2
         if (!e.nativeEvent.data) {
            forDelete = calculateCaret(etarget)
            if (!forDelete) forDelete = 0
         }
      }


      let incSpan = false
      for (let i = 0; i < etarget.childNodes.length; i++) {
         if (etarget.childNodes[i].tagName) {
            if (etarget.childNodes[i].tagName.toLowerCase() === 'span') incSpan = true
         }
      }

      let starterSpan = false
      if (!incSpan) {
         let span = document.createElement('span')
         etarget.appendChild(span)
         starterSpan = true
      }

      for (let i = 0; i < etarget.childNodes.length; i++) { // en başta ilk yazıyı yazarken
         if (etarget.childNodes[i] instanceof HTMLElement && etarget.childNodes[i].tagName.toLowerCase() === 'span') continue // html elementiyse ve span değilse
         else { // span dışı ne varsa sil
            etarget.removeChild(etarget.childNodes[i])
         }
      }

      let { validAr, n_validAr } = textArrays(e, typedInput)

      for (let i = 0; i < validAr.length; i++) { // sınırı geçmeyen kısım için
         if (etarget.childNodes[i]) { // element varsa
            if (etarget.childNodes[i].textContent !== validAr[i]) { // element varsa ama içerik farklıysa
               etarget.childNodes[i].textContent = validAr[i]
            } else {
               etarget.childNodes[i].textContent = validAr[i]
            }
         } else { // element yoksa
            let span = document.createElement('span')
            span.textContent = validAr[i]
            etarget.appendChild(span)
         }
      }

      for (let i = 0; i < n_validAr.length; i++) { // sınırı geçen kısım için
         let j = i + validAr.length
         if (etarget.childNodes[j]) { // element varsa
            if (etarget.childNodes[j].textContent !== n_validAr[i]) { // element varsa ama içerik farklıysa
               etarget.childNodes[j].textContent = n_validAr[i]
            } else { // içerik aynıysa
               etarget.childNodes[j].textContent = n_validAr[i]
            }
         } else { // element yoksa
            let span = document.createElement('span')
            span.textContent = n_validAr[i]
            etarget.appendChild(span)
         }
      }

      if (!starterSpan) { // inp boşken, içi boş span olacağından, kontrole tabi olmaması için
         let newAr = [...validAr, ...n_validAr]
         for (let i = 0; i < etarget.childNodes.length; i++) {
            if (etarget.childNodes[i].textContent !== newAr[i]) {
               etarget.removeChild(etarget.childNodes[i])
               i--
            }
         }
      }

      cleanStyles(etarget, validAr) // valid kısım için, stilleri temizle
      addStyles(etarget, validAr) // valid olmayan kısım için stil ekle

      if (!fromEmoji) updateCaret(e, forDelete)
   }
   const omd = (e) => {
      setMousePressing(true)
      setTimeout(() => {
         let pos = calculateCaret(textareaDivRef.current)
         setcaretstate(pos)
      }, 0);
   }
   const omu = async (e) => {
      let { selectedText } = selectionFunction(e.target)
      if (selectedText.length) stopReleasing = true
   }
   const ons = (e) => {
      if (!mousePressing) return
      if (mousePressing && !stopReleasing) {
         setMousePressing(false)
      }
   }

   const mediaUploadFunction = (selectedFile) => {

      if (!selectedFile) return

      let ft = selectedFile.type.split('/')[0]


      const reader = new FileReader()
      reader.onload = () => {
         let newEl = {mtype: ft, mdata: reader.result}
         let newAr = [...props.wholeAr]
         newAr[props.elidx].mediaContent.push(newEl)
         setMediaAr(prev => [...prev, newEl])
         dispatch({
            type:'UPDATE_DRAFT',
            payload: newAr
         })
      }
      reader.readAsDataURL(selectedFile)
   }
   const closeMedia = (idx) => {
      setMediaAr(prev => prev.filter((el,val) => val !== idx))
      props.clearImage(props.elidx, idx)
   }
   const gifHandler = ()=>{
      setGifFlag(true)
   }
   const gifDataProp = (val) =>{
      setGifFlag(false)
      setMediaAr(prev => [...prev, {
         mtype: 'gif',
         mdata: val
      }])
   }
   const closeGifContainer = ()=>{
      setGifFlag(false)
   }
   const questionHandler = (e)=>{
      setQuestionFlag(true)
      props.questionStyleControl(undefined,'OPEN',props.elidx)
   }
   const closeQuestionContainer = ()=>{
      props.questionStyleControl(undefined, 'CLOSE', props.elidx)
      findAndMoveCaret(textareaDivRef.current,caretstate)
      setQuestionFlag(false)
   }
   const addDraftHandler = ()=>{
      props.addedNewField(0,textareaDivRef.current.textContent,mediaAr)
   }
   const videoStarted = (videoidx)=>{
      props.whichEl()
      props.videoStarted(props.elidx,videoidx)
   }
   const videoPaused = ()=>{
      props.videoPaused()
   }
   const questionStyleInnerRtb = (val,state,elidx) =>{
      props.questionStyleControl(val,state,elidx)
   }
   const postAll = ()=>{
      props.postAll()
   }
   return <>
      <div ref={generalWrapper} className="homepage_content_body general_wrapper_container" onMouseDown={(e) => inputControl(e)}>

         <div className="homepage_content_body_wih general_container" >
         <span style={props.showEl ? {} : {display:'none'}} className='left_line'></span>


         <div style={opacityStyle} className="header_container_wrapper">
            <div style={props.showEl ? {minHeight:'98px'}:{minHeight:'0px'}} className="header_container">
               <div className='profile_photo' style={{backgroundImage: 'url(https://lh3.googleusercontent.com/a/ACg8ocK_yeA5iF6fFL-TeEVWsvNlDEQBPeT1QECzUHDqibrQ=s96-c)' }}>
               </div>

               <div
                  ref={textareaDivRef}
                  contentEditable
                  onPaste={onPasteHandler}
                  className={['ced_style hp_cnt_right_top', !inputValue.length ? 'right_top_before' : ''].join(' ')}
                  suppressContentEditableWarning
                  onInput={onInputChange}
                  onKeyDown={keyDownControl}
                  onKeyUp={keyUpControl}
                  spellCheck="false"
                  // mouse kısmı için
                  onMouseDown={omd}
                  onMouseUp={omu}
                  onSelect={ons}
               >
                  <span></span>
               </div>
            </div>

            <div className='draftmedia_container'>
               <div className="mediaBody mbgap vf">
                  {
                     props.el.mediaContent && props.el.mediaContent.length > 0 && props.el.mediaContent.map((el,idx)=>{
                        return <div className={['mediaBody', props.el.mediaContent.length > 1 ? 'w5' : ''].join(' ')} key={idx}>
                           <div style={hasMultipleImage} className='each_image_div'>
                              <div style={{ zIndex: '2' }} className='media_edit'>
                                 <span>Edit</span>
                              </div>
                              <div style={{ zIndex: '2' }} onClick={() => closeMedia(idx)} className='media_close'>
                                 <svg viewBox="0 0 24 24" className='media_close_svg'>
                                    <g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g>
                                 </svg>
                              </div>

                              {
                                 el.mtype === 'image' ? <img src={el.mdata} alt="Selected" style={imgStyle} className='uploadedMedia'  /> :
                                    el.mtype === 'video' ? <video onPlay={() => videoStarted(idx)} onPause={videoPaused} style={{ zIndex: '0', objectFit: 'fill !important',height:'100%'}} controls src={el.mdata} className='uploadedMedia'></video> :
                                    <div className="uploadedGifContainer">
                                       <Gif noLink gif={el.mdata} />
                                    </div>
                              }
                           </div>
                        </div>
                     })
                  }
               </div>

               {
                  mediaAr.length > 0 && props.showEl && <div className="mediaFooter">
                     <div>
                        <svg style={{ height: '18px' }} viewBox="0 0 24 24"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>
                        <a href='/biryer'>Tag people</a>
                     </div>
                     <div>
                        <svg style={{ height: '18px' }} viewBox="0 0 24 24" ><g><path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"></path></g></svg>
                        <a href='/biryer'>Add description</a>
                     </div>
                  </div>
               }
            </div>

            {
               gifData && <div className="uploadedGifContainer draftgif_container">
                  <Gif noLink gif={gifData} width={300} />
                  <span>
                     <svg onClick={() => { setGifData(null) }} viewBox="0 0 24 24"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
                  </span>
               </div>
            }

            {
               questionFlag === true && <div className='draftquestion_container dq_margin'>
                     <QuestionComponent 
                        closeQuestionContainer={closeQuestionContainer}
                        elidx = {props.elidx}
                        questionStyleControl={questionStyleInnerRtb}
                     />
                  </div>
            }
         </div>

         <div style={props.showEl ? {minHeight:'92px'}:{minHeight:'0px'}} className="homepage_content_body_wih_right footer_container" >
            <div className='footer_inner_container'>
               {inputclick && <div style={{width:'100%'}} className="everyone_can_reply">
                  <div>
                     <svg viewBox="0 0 24 24" ><g><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z"></path></g></svg>
                     <div>Everyone can reply</div>
                  </div>
               </div>}

               <nav className="hp_cnt_right_bottom_left" style={iconsInlineStyle}>
                  <div className='svg_holder'>
                     <UploadImage gifAddedProp={gifData || questionFlag || mediaAr.length >= 4 ? fadeIcons : {}} mediaUploadFunction={mediaUploadFunction} />
                     <div style={fadeIcons} onClick={gifHandler} className="hp_cnt_right_bottom_left_icons">
                        <svg viewBox="0 0 24 24"><g><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path></g></svg>
                     </div>
                     <div ref={openQuestionRef} onClick={questionHandler} style={{...fadeIcons,...fadeQuestion}} className="hp_cnt_right_bottom_left_icons">
                        <svg viewBox="0 0 24 24"><g><path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"></path></g></svg>
                     </div>
                     <div ref={openEmojiRef} onClick={openEmoji} className="hp_cnt_right_bottom_left_icons">
                        <svg viewBox="0 0 24 24"><g><path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path></g></svg>
                     </div>
                     <div className="hp_cnt_right_bottom_left_icons">
                        <svg viewBox="0 0 24 24"><g><path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"></path></g></svg>
                     </div>
                     <div className="hp_cnt_right_bottom_left_icons">
                        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ opacity: '.5', cursor: 'default' }}><g><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path></g></svg>
                     </div>
                  </div>


                  <div style={fillBoundary > 0 ? {display:'flex'}:{display:'none'} } className="addAnotherPost">
                     <div style={boundaryStyle} className="boundary">
                        <div className="boundary_inner"></div>
                     </div>
                     <div className="tweet_seperator"></div>
                     <div ref={addNewDraftRef} onClick={addDraftHandler} className="plus_sign">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2h7z"></path></g></svg>
                     </div>
                  </div>
                  <div onClick={postAll} style={postDivStyle} className={['postall_btn', !props.canPost.zeroBound && !props.canPost.excessBound && props.canPost.questionStyle ? 'postall_btn_hover' : ''].join(' ')}>
                     <button className='postall_btn_inner' disabled = {props.canPost.zeroBound && !props.canPost.excessBound && props.canPost.questionStyle} style={postDivButtonStyle}>Post all</button>
                  </div>
               </nav>
             </div>
            </div>
         </div>
      </div>



      {
         emojiFlag && createPortal(
             <div style={emojiPos} className='draft_emoji' ref={emojiRef}>
               <EmojiPicker skinTonesDisabled onEmojiClick={emojiHandle} />
            </div>,
            document.getElementById('layers')
         )
      }

      { gifFlag && createPortal(
         <>
            <GifComponent gifDataProp={gifDataProp} closeGifContainer={closeGifContainer} />
         </>,
         document.getElementById('layers'))
      }
   </>

}


export default RichTextBox

