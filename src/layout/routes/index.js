import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { Provider, KeepAlive } from "react-keep-alive";

import Test from '@/pages/HelloWorld'
// class Test extends React.Component {
//   state = {
//     number: 0
//   };

//   handleClick = () => {
//     this.setState(({ number }) => ({
//       number: number + 1
//     }));
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={this.handleClick}>
//           Click the button to increase the number
//         </button>
//         <div>Number: {this.state.number}</div>
//       </div>
//     );
//   }
// }

export default class CRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      include: "one,two"
    }
  }

  render() {
    return(
      <div>
        <ul>
          <li>
            <Link to="/one">one</Link>
          </li>
          <li>
            <Link to="/two">two</Link>
          </li>
          <li onClick={() => this.setState({include: "one"})}>change</li>
        </ul>
        <Provider include={this.state.include} exclude={this.state.exclude || ''}>
          <Switch>
            <Route
              path="/one"
              // Component={Test}
              render={props => (
                <KeepAlive name="one">
                  <Test {...props} />
                </KeepAlive>
              )}
            />
            <Route
              path="/two"
              // Component={Test}
              render={props => (
                <KeepAlive name="two">
                  <Test {...props} />
                </KeepAlive>
              )}
            />

            {/* <Route path="/two" render={() => "This is two"} /> */}
          </Switch>
        </Provider>
      </div>
    )
  }

}