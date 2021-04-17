import React from 'react';
import { IonApp, IonRouterOutlet,IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {isLogin} from './middlewear/auth'
import { Redirect, Route } from 'react-router-dom';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css'; 
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login/Login';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logout from './components/AlertPopup/Logout';
import TabRoot from './pages/TabPage/TabRoot';

library.add(faSignOutAlt);

const PrivateRoutes = () => {
  return (
    <IonReactRouter>
        <Route path="/login" component={Login} exact={true} />
        <Route path="/" render={() => <Redirect to="/login" />} />
    </IonReactRouter>
  );
};
const PublicRoutes = () => {
  return (
    <IonReactRouter>
      <Route path="/tabs" component={TabRoot} />
      <Route path="/" render={() => <Redirect to="/tabs" />} />
    </IonReactRouter>
  );
};


const App: React.FC = () => (
  <IonApp>
    <Logout/>
    {(isLogin()) ? <PublicRoutes /> : <PrivateRoutes />}
</IonApp>
);

export default App;