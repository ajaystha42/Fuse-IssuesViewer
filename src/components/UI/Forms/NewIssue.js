import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import React from "react";

export default class NewIssue extends React.Component {
  state = {
    fields: {
      name: "",
      description: "",
    },
  };

  contactSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      alert("Form submitted");
      this.setState({ fields: { name: "", description: "" } });
    } else {
      alert("Form is not validated");
    }
  }
  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  handleValidation() {
    let fields = this.state.fields;
    let formIsValid = true;

    if (fields["name"].length === 0) {
      formIsValid = false;
    }
    if (fields["description"].length === 0) {
      formIsValid = false;
    }
    return formIsValid;
  }
  onCancelBtnClick() {
    console.log("clickde")
    this.setState({ fields: { name: "", description: "" } });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3>New Issue</h3>
              </div>
              <div className="card-body">
                <form onSubmit={this.contactSubmit.bind(this)}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      placeholder="Enter Title"
                      className="form-control"
                      type="text"
                      onChange={this.handleChange.bind(this, "name")}
                      value={this.state.fields["name"]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      onChange={this.handleChange.bind(this, "description")}
                      value={this.state.fields["description"]}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => this.onCancelBtnClick()}
                    className="btn btn-danger ml-2"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
