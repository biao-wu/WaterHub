import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux"
import store from "./store"
import * as serviceWorker from './serviceWorker';
import { routes} from "./route"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <Switch>
                {
                    routes.map(item=>{
                        return <Route key={item.path} path={item.path} component={item.component} />
                    })
                }
                <Redirect from="/" to="/home" exact />
                <Redirect to="/404" />
            </Switch>
        </Router>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
