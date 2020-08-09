const initialization = {
  issueList: [],
  isLoading: false,
  pageNo: 1,
}


const Issue = (state = initialization, action) => {
  switch(action.type){
    case 'SET_LOADING_STATUS': {
      return {...state, isLoading: action.payload}
    }
    case 'SET_ISSUES': {
      return {...state, issueList: action.payload}
    }
    case 'SET_PAGE_NO': {
      return {...state, pageNo: action.payload}
    }
    default:
      return state
  }
}

export default Issue
