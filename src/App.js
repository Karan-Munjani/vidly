import { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
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
import auth from "./services/authService";
import Profile from "./components/profile";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route
              path="/movies/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login"></Redirect>;
                return <MovieForm {...props}></MovieForm>;
              }}
            ></Route>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user}></Movies>}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/movies/new" component={MovieForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/profile" component={Profile}></Route>

            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
