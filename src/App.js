import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Payment from "./Payment"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

const promise = loadStripe (
  "pk_test_51IWT7zGcjbyIRuKV9nmOPYL9MJiR8FTu8wMKLPEwkCQGnTST5WkMDRvRoh6aZbcwe9VMP3MLKM4qLiaSkbSKDKRa004yoAAwkS"
)

function App() {
  const [{ user }, dispatch] = useStateValue();
  //useEffect is a piece of code which runs on a given conditon

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // the user is logged in...
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out...
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      // Any cleanup operations go in here...
      unsubscribe();
    };
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
            <Payment />
            </Elements>
            </Route>
          <Route path="/login">
            <Login />
          </Route>
          {/* This is the default route */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
