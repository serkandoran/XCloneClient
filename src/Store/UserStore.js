


const initial_state = {
   activeUser: '',
   userPicture:'',
   userName:''
}

const userReducer = (state = initial_state, action)=>{
   switch(action.type){
      case 'ACTIVE_USER':
         return {
            ...state,
            activeUser: action.payload.userId,
            userName: action.payload.userName
         }
      case 'USER_PHOTO':
         return{
            ...state,
            userPicture:action.payload
         }
      case 'LOGOUT_USER':
         return state.activeUser = ''
      default:
         return state
   }
}

export default userReducer




