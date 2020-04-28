export default function (state = {}, action = {}) {
    
      
        return  {
          ...state,
          ...action.payload,
        };;
    }
  
  