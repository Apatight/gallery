import React from 'react';
import $ from 'jquery';
import { Button, Icon, Modal, Dropdown, Navbar } from 'react-materialize';

class Social extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: true };
    this.changeView = this.changeView.bind(this);
  }

  changeView() {
    this.setState({
      view: !this.state.view,
    });
  }

  render() {
    if (this.state.view) {
      return (
        <SmallDiv changeView={this.changeView} />
      );
    }
    return (
        <BigDiv changeView={this.changeView} />
    );
  }
}

class BigDiv extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <div className="social">

        <span className="iconsCenter">
          <i className="medium fas fa-envelope" />
        </span>
        <span className="iconsCenter">
          <i className="floating medium fab fa-twitter" />
        </span>
        <span className="iconsCenter">
          <i className="medium fab fa-pinterest" />
        </span>
        <span className="iconsCenter">
          <i className="medium fab fa-facebook-f" />
        </span>
        <span className="iconsCenter">
          <i className="medium fas fa-times" onClick={this.props.changeView} />
        </span>

      </div>
    );
  }
}
class SmallDiv extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <div className="smallsocial">
        <span className="iconsCenter">
          <i className="floating medium fab fa-twitter" />
        </span>
        <span className="iconsCenter">
          <i className="medium fab fa-pinterest" />
        </span>
        <span className="iconsCenter">
          <i className="medium fas fa-envelope" />
        </span>
        <span className="iconsCenter">
          <i className="medium fas fa-ellipsis-h" onClick={this.props.changeView} />
        </span>

      </div>
    );
  }
}

export default Social;
