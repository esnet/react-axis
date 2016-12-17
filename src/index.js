import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from "react-router";

import './website/index.css';

import App from './website/App';
import Intro from "./website/intro/Intro";
import Guide from "./website/guides/Guide";
import Example from "./website/examples/Example";
import API from "./website/api/API";
import Tests from "./website/tests/Tests";

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Intro}/>
            <Route path="guide/:doc" component={Guide} />
            <Route path="example/:example" component={Example} />
            <Route path="api/:component" component={API} />
            <Route path="tests" component={Tests} />
        </Route>
    </Router>
), document.getElementById("root"));
