import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Routes
import CreateStore from "../Components/Employee/createStore"

function Routes() {
    return (
        <div>
            {/*<Provider store={store}>*/}
                <Router>
                    <Switch>
                        <Route>
                            <Route path="/createStore" component={CreateStore} />
                            {/*<Route path="/viewStore" component={CustomerViewStore} />*/}
                            {/*<Route path="/empViewStore" component={EmpViewStore} />*/}
                            {/*<Route path="/editStore/:id" component={EditStore} />*/}
                            {/*<Route path="/storeItem/:id" component={StoreItem} />*/}
                            {/*<Route exact path="/homeStore" component={HomeScreen} />*/}
                            {/*<Route exact path="/product/:id" component={ProductScreen} />*/}
                            {/*<Route exact path="/cart" component={CartScreen} />*/}
                        </Route>
                    </Switch>
                </Router>
            {/*</Provider>*/}
        </div>
    );
}

export default Routes;
