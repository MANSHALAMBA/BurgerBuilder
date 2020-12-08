import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Checkout from "./containers/Checkout/Checkout";

import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import * as actionCreators from "./store/actions/index";
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

class App extends Component {
  componentDidMount() {
    this.props.onAutoAuthenticate();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/burger-builder" exact component={BurgerBuilder} />
            <Route path="/orders" exact component={Orders} />
            {this.props.isAuth ? (
              <Route
                path="/checkout"
                render={props => (
                  <Suspense fallback={<p>Loading...</p>}>
                    <Checkout {...props} />
                  </Suspense>
                )}
              />
            ) : null}
            <Route path="/auth" component={Auth} />
            <Redirect from="/" to="/burger-builder" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isAuth: !(state.auth.token == null)
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onAutoAuthenticate: () => dispatch(actionCreators.autoAuthenticate())
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
