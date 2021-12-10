import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Routes
import CreateStore from "../Components/Employee/createStore"
import EmpViewStore from "../Components/Views/empViewStore"
import EditStore from "../Components/Employee/editStore"
import CustomerViewStore from "../Components/Views/customerViewStore"

//User
import {Provider} from "react-redux";
import store from "../Store";
import Login from "../Users/login/login";
import Register from "../Users/register/register";
import ConfirmEmail from "../Actions/confirmEmail";

//Screens
import CartPayment from "../Components/Views/Cart/cartPayment";
import HomeScreen from "../Components/Views/screens/HomeScreen";
import ProductScreen from "../Components/Views/screens/ProductScreen";
import CartScreen from "../Components/Views/screens/CartScreen";

function Routes() {
    return (
        <div>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route>
                            <Route path="/createStore" component={CreateStore} />
                            <Route path="/viewStore" component={CustomerViewStore} />
                            <Route path="/empViewStore" component={EmpViewStore} />

                            <Route path="/cartPayment/:id" component={CartPayment} />
                            <Route exact path="/homeStore" component={HomeScreen} />
                            <Route exact path="/product/:id" component={ProductScreen} />
                            <Route exact path="/cart" component={CartScreen} />

                            <Route path="/" component={CustomerViewStore} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/users/activate/:auth_token" component={ConfirmEmail}/>

                        </Route>
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}

export default Routes;
