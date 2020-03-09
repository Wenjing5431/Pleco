import "../css/App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import RootPage from "./RootPage";
import Login from "./Login";
import AnnotList from "./AnnotList";
import { ProtectedRoute } from "./ProtectedRoute";
import { RandomPage } from "./404Page";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      authenticated: null,
      isLoading: true
    };

    this.checkAuthentication();
  }

  checkAuthentication = () => {
    setTimeout(
      () =>
        this.setState({
          authenticated: Boolean(Math.round(Math.random())),
          isLoading: false
        }),
      1000
    );
  };

  LoginHandler = item => {
    this.setState({ username: item });
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="app">
        <Header
          username={this.state.username}
          checkAuth={this.state.authenticated.toString()}
        />
        <Switch>
          <Route path="/" exact component={RootPage} />
          <Route
            path="/login"
            render={props => (
              <Login {...props} onNameSubmit={this.LoginHandler} />
            )}
          />
          <ProtectedRoute
            path="/dashboard"
            component={AnnotList}
            checkAuth={this.state.authenticated.toString()}
            username={this.state.username}
          />
          <Route path="*" component={RandomPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
