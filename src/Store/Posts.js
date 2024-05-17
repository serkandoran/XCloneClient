



const initial_state =[
   {
      type:'draft',
      postDetail:[
         {
            description: '1. element',
            contentAr:[
               {
                  ctype: 'question',
                  cdata:{
                     texts:['soru 1','soru 2'],
                     day: 1,
                     hour: 0,
                     minute: 0
                  }
               }
            ]
         },
         {
            description: '2. element',
            contentAr:[
               {
                  ctype: 'image',
                  cdata:'dfsljfglhkfghl48df09g8df08gdfglkjd'
               },
               {
                  ctype: 'image',
                  cdata:'dfsljfglhkfghl48df09g8df08gdfglkjd'
               },
            ]
         },

      ],
      // replyCount: 154,
      // repostCount: 2.3,
      // likeCount: 44,
      // viewCount: 742,
   }
]

const PostReducer = (state = initial_state, action)=>{

   switch(action.payload){
      case 'ADD_POST':
         return {
            post_ar:[
               ...state.post_ar,
               action.payload // send object
            ]
         }
      default:
         return state
   }

}

export default PostReducer

