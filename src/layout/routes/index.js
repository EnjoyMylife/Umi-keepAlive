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
        '每次更新后 one点击添加-》two点击添加-》点击change-》点击one-》点击two会报错'
        <ul>
          <li>
            <Link to="/one">one</Link>
          </li>
          <li>
            <Link to="/two">two</Link>
          </li>
          <li>
            <div style={{cursor: 'pointer'}} onClick={() => this.setState({include: "one"})}>change</div>
          </li>
        </ul>
        <Provider include={this.state.include}>
          <Switch>
            <Route
              path="/one"
              Component={One}
              render={props => (
                <KeepAlive name="one">
                  <One {...props} />
                </KeepAlive>
              )}
            />
            <Route
              path="/two"
              Component={Two}
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