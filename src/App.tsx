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
import Login from './pages/Login';
import PrivateRoute from './hooks/PrivateRoute';
import HeaderComponent from './components/Header/HeaderComponent';
import TripTypeComponent from './pages/TripTypePage/TripTypePage';
import PublicRoute from './hooks/PublicRoute';
import TripBookingPage from './pages/TripBookingPage/TripBookingPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logout from './components/AlertPopup/Logout';
import DashboardPage from './pages/DashboardPage';

library.add(faSignOutAlt);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <IonContent fullscreen>
          <Route path="/dashboard" render={props => <DashboardPage {...props} />} />
          <PrivateRoute  path="/dashboard" component={DashboardPage}  exact/>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        </IonContent>
      </IonRouterOutlet>
    </IonReactRouter>
</IonApp>
);

export default App;