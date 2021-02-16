import  React from  "react";
import { Route, Redirect } from  "react-router-dom";
import {isLogin} from '../middlewear/auth'

const  PublicRoute: React.FC<{
        component: React.FC;
        path: string;
        exact: boolean;
        restricted:boolean;
    }> = (props) => {
    const condition = isLogin();
    return  condition && props.restricted ? (<Redirect  to="/"/>) : (<Route  path={props.path}  exact={props.exact} component={props.component}/>);
};
export  default  PublicRoute;