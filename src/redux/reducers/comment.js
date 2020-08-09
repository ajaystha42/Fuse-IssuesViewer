const initialization = {
  commentList: [],
  isLoading: false,
  selectedIssue: {}
}


const Issue = (state = initialization, action) => {
  switch(action.type){
    case 'SET_LOADING_STATUS': {
      return { ...state, isLoading: action.payload }
    }
    case 'SET_COMMENTS': {
      return { ...state, commentList: action.payload }
    }
    case 'SET_SELECTED_ISSUE':{
      return { ...state, selectedIssue: action.payload }
    }

    default:
      return state
  }
}

export default Issue
