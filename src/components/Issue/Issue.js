import React from "react";
import { baseURL } from "../../utils/env";
import ReactMarkdown from "react-markdown";
import Spinner from "../UI/Spinner/Spinner";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";

import {
  setCommentList,
  fetchComments,
  setLoadingStatus,
  setSelectedIssue,
} from "../../redux/action";
class Issue extends React.Component {
  componentDidMount() {
    const { setLoadingStatus, setCommentList, setSelectedIssue } = this.props;
    setLoadingStatus(true);
    fetch(`${baseURL}/${this.props.match.params.issue}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedIssue(data);
      });

    fetch(`${baseURL}/${this.props.match.params.issue}/comments`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoadingStatus(false);
        setCommentList(data);
      })
      .catch((err) => {
        setLoadingStatus(false);
      });
  }

  comments = () => {
    if (this.props.commentList.length === 0)
      return (
            <h5>No Comments</h5>
      );
    return this.props.commentList.map((comment) => {
      return (
        <div className="card mb-3">
          <div className="card-header">
            <img
              width="42px"
              src={comment.user.avatar_url}
              className="img-fluid rounded-circle mr-2"
            />
            {comment.user.login} commented at{" "}
            {new Date(comment.created_at).toLocaleString()}
          </div>
          <div className="card-body">
            <ReactMarkdown source={comment.body} />
          </div>
        </div>
      );
    });
  };

  render() {
    const { isLoading, selectedIssue } = this.props;
    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>{selectedIssue.title}</h4>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <div className="text-center my-5">
                    <Spinner />
                  </div>
                ) : (
                  this.comments()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.comment.isLoading,
  commentList: state.comment.commentList,
  selectedIssue: state.comment.selectedIssue,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCommentList: () => dispatch(fetchComments()),
  setCommentList: (List) => dispatch(setCommentList(List)),
  setLoadingStatus: (status) => dispatch(setLoadingStatus(status)),
  setSelectedIssue: (issueInfo) => dispatch(setSelectedIssue(issueInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
