import React, { Component } from "react";

class Input extends Component {
  render() {
    return (
      <div className="row">
        <div className="input-field col s12">
          <label htmlFor={this.props.inputName}>{this.props.inputName}</label>
          <span
            className="helper-text"
            data-error={`Wrong ${this.props.inputName} format`}
            data-success="Accepted"
          ></span>
          <input
            name={this.props.inputName}
            value={this.props.value}
            onChange={this.props.handleChange}
            id={this.props.inputName}
            type={this.props.type}
            className="validate"
          ></input>
        </div>
      </div>
    );
  }
}

export default Input;
