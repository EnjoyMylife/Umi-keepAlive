import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import { Provider, KeepAlive, bindLifecycle } from "react-keep-alive";

class Content extends Component {
  state = {
    number: 0
  };

  handleClick = () => {
    this.setState(({ number }) => ({
      number: number + 1
    }));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Click the button to increase the number
        </button>
        <div>
          Number: <span style={{ color: "#0ff" }}>{this.state.number}</span>
        </div>
      </div>
    );
  }
}

@bindLifecycle
class List extends Component {
  static defaultProps = {
    onMount: () => {}
  };

  listScrollTop = 0;

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidActivate() {
    console.log("componentDidActivate");
    const { setControlDisabled } = this.props;
    // 5. Disabled for each mount component
    setControlDisabled("List", true);
    setTimeout(() => {
      document.querySelector("#root").scrollTop = this.listScrollTop;
    });
  }

  componentWillUnactivate() {
    console.log("componentWillUnactivate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleEnterDetails = () => {
    const { setControlDisabled } = this.props;
    // 6. Need to keep the cache after going to the next page
    // setControlDisabled("List", false);
    // this.listScrollTop = document.querySelector("#root").scrollTop;
  };

  render() {
    return (
      <div className="list-wrapper">
        <h1>This is list</h1>
        <p>
          <Link to="/">Back to home</Link>
        </p>
        <div className="list">
          {new Array(4).fill(null).map((v, index) => (
            <div className="list-item" key={index}>
              This is <span style={{ color: "#f00" }}>{index}</span>
              <Content />
              <br />
              <Link to="/details" onClick={this.handleEnterDetails}>
                Click to enter details
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default class CRouter extends Component {

  state = {
    // 1. Create an object that controls all <KeepAlive> components disabled
    controlDisableds: {}
  };

  setControlDisabled = (key, value) => {
    this.setState(({ controlDisableds }) => {
      const result = { ...controlDisableds };
      result[key] = value;
      return {
        controlDisableds: result
      };
    });
  };

  render() {
    const { setControlDisabled } = this;
    const { controlDisableds } = this.state;
    return(
      <Provider>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <div>
                <h1>This is home</h1>
                <p>
                  From the home page into the list page, the list page will be
                  reset
                </p>
                <p>
                  <Link to="/list">Enter list</Link>
                </p>
              </div>
            )}
          />
          <Route
            exact
            path="/list"
            render={props => (
              <KeepAlive
                name="List"
                // 3. Assign the corresponding <KeepAlive> component
                disabled={controlDisableds["List"]}
              >
                {/* 4. Pass in the modification method, of course you can also use new Context, depending on your situation */}
                <List {...props} setControlDisabled={setControlDisabled} />
              </KeepAlive>
            )}
          />
          <Route
            exact
            path="/details"
            render={props => (
              <div>
                <h1>This is details</h1>
                <p>
                  <Link to="/list">Back to list</Link>
                </p>
              </div>
            )}
          />
        </Switch>
      </Provider>
    )
  }

}