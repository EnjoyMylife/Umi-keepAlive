import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { Provider, KeepAlive } from "react-keep-alive";

import One from '@/pages/numberAddOne'
import Two from '@/pages/numberAddTwo'

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
              // Component={One}
              render={props => (
                <KeepAlive name="one">
                  <One {...props} />
                </KeepAlive>
              )}
            />
            <Route
              path="/two"
              // Component={Two}
              render={props => (
                <KeepAlive name="two">
                  <Two {...props} />
                </KeepAlive>
              )}
            />
            
            <Route render={() => <Redirect to="/one" />} />
          </Switch>
        </Provider>
      </div>
    )
  }

}