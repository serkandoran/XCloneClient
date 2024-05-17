



const auth_state = {
   
}

const authReducer = (state = auth_state, action) => {
   switch (action.type) {
      case 'AUTHING_USER_DATA':
         return {
            ...state,
            ...action.payload
         }
      default:
         return state;
   }
}

export default authReducer

