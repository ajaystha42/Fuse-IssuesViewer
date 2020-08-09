import React from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../utils/env";
import Spinner from "../UI/Spinner/Spinner";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./../../assets/main.css";

import { connect } from "react-redux";
import {
  fetchIssues,
  setLoadingStatus,
  setIssueList,
  setPageNo,
} from "../../redux/action";

class Issues extends React.Component {
  state = {
    issues: [],
    range: {},
    current_page: 1,
    loading: true,
  };

  componentDidMount() {
    this.fetchIssue();
  }

  fetchIssue = () => {
    const { currentPageNo, setLoadingStatus, setIssueList } = this.props;
    setLoadingStatus(true);

    fetch(`${baseURL}?page=${currentPageNo}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoadingStatus(false);
        setIssueList(data);
      })
      .catch((err) => {
        setLoadingStatus(false);
      });
  };

  onPageChange = (change) => {
    const { currentPageNo, setPageNo } = this.props;
    const newPageNo = currentPageNo + change;
    if (newPageNo > 0) {
      setPageNo(newPageNo).then(() => this.fetchIssue());
    }
  };

  listItems = () => {
    return this.props.issueList.map((issue, index) => (
      <li key={index} className="list-group-item">
        <div className="row no-gutters">
          <div className="col-9">
            <i className="icofont-warning-alt mr-2"></i>
            <Link to={`/issue/${issue.number}`}>{issue.title}</Link>
            <p className="mb-0 small text-muted">
              Issue ID: {issue.id} opened at
              {new Date(issue.created_at).toLocaleString()} by
              {issue.user.login}
            </p>
          </div>
          <div className="col">
            <p className="mb-0 small text-muted text-right">
              <i className="icofont-comment mr-1"></i>
              {issue.comments}
            </p>
          </div>
        </div>
      </li>
    ));
  };

  render() {
    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                ISSUES
                <Link to={"/newIssue"}>
                  <button className="btn btn-success float-right">
                    New Issue
                  </button>
                </Link>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="container">
                    {this.props.isLoading ? (
                      <div className="text-center my-5">
                        <Spinner />
                      </div>
                    ) : (
                      <ul className="list-group">{this.listItems()}</ul>
                    )}

                    <nav className="mt-3">
                      <ul className="pagination">
                        <li
                          className="page-item"
                          onClick={() => this.onPageChange(-1)}
                        >
                          <a className="page-link" href="#">
                            Previous
                          </a>
                        </li>
                        <li
                          className="page-item"
                          onClick={() => this.onPageChange(1)}
                        >
                          <a className="page-link" href="#">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  issueList: state.issue.issueList,
  currentPageNo: state.issue.pageNo,
  isLoading: state.issue.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchIssueList: () => dispatch(fetchIssues()),
  setIssueList: (List) => dispatch(setIssueList(List)),
  setLoadingStatus: (status) => dispatch(setLoadingStatus(status)),
  setPageNo: (pageNo) => dispatch(setPageNo(pageNo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
