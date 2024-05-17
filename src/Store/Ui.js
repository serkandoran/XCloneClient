

const ui_state = {
   ctype: 'draft',
   questionForm: [],
   inputField: []
}

const uiReducer = (state = ui_state, action) => {
   switch (action.type) {
      case 'QUESTION_FORM':
         return {
            ...state,
            questionForm: action.payload
         }
      case 'UPDATE_DRAFT':
         return{
            ...state,
            inputField: [...action.payload]
         }
      case 'ADD_NEWFIELD_TO_DRAFT':
         return{
            ...state,
            inputField: action.payload.newInputAr,
            questionForm: action.payload.newQuestionAr
         }
      case 'DISCARD_DRAFT':
         return{
            ctype: 'draft',
            questionForm: [],
            inputField: []
         }
      default:
         return state;
   }
}

export default uiReducer

