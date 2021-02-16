import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import {isLogin} from '../middlewear/auth';

const  PrivateRoute: React.FC<{
        component: any;
        path: string;
        exact: boolean;
    }> = (props) => {
    const condition = isLogin();
    return  condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : (<Redirect  to="/login"/>);
};
export  default  PrivateRoute;