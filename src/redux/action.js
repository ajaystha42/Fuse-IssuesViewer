export const fetchIssues = () => ({
  type:'FETCH_ISSUES'
})

export const setIssueList = (issueList) => ({
  type:'SET_ISSUES',
  payload: issueList
})

export const setPageNo = (pageNo) => 
  Promise.resolve({
    type: 'SET_PAGE_NO',
    payload: pageNo
})

export const setLoadingStatus =(loadingStatus) => ({
  type: 'SET_LOADING_STATUS',
  payload: loadingStatus
})

export const fetchComments = () => ({
  type:'FETCH_COMMENTS'
})


export const setSelectedIssue = (issueInfo) => ({
  type:'SET_SELECTED_ISSUE',
  payload: issueInfo
})

export const setCommentList = (issueList) => ({
  type:'SET_COMMENTS',
  payload: issueList
})





