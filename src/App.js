import { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import MoviesTable from "./components/movies";
import NavBar from "./components/navbar";
import Customers from "./components/customer";
import Rentals from "./components/rentals";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/common/logout";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwt_decode(token);
      console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={MoviesTable}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/movies/new" component={MovieForm}></Route>
            <Route path="/logout" component={Logout}></Route>

            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
