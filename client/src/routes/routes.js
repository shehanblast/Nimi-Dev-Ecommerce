import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Routes
import CreateStore from "../Components/Employee/createStore"
import EmpViewStore from "../Components/Views/empViewStore"
import EditStore from "../Components/Employee/editStore"
import CustomerViewStore from "../Components/Views/customerViewStore"


import {Provider} from "react-redux";
import store from "../Store";
import Login from "../Users/login/login";
import Register from "../Users/register/register";
import ConfirmEmail from "../Actions/confirmEmail";

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
                            <Route path="/editStore/:id" component={EditStore} />
                            {/*<Route path="/storeItem/:id" component={StoreItem} />*/}
                            {/*<Route exact path="/homeStore" component={HomeScreen} />*/}
                            {/*<Route exact path="/product/:id" component={ProductScreen} />*/}
                            {/*<Route exact path="/cart" component={CartScreen} />*/}


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
