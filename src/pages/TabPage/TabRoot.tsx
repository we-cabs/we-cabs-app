import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { home, informationCircle} from 'ionicons/icons';
import DashboardPage from '../Dashboard/DashboardPage';
import { SideMenu } from '../../components/MenuDrawer/SideMenu';
import TripBookingPage from '../TripBookingPage/TripBookingPage';
import BookingDetails from '../BookingDetailListPage/BookingDetails';
import BiddingPage from '../BiddingPage/BiddingPage';


const TabRoot: React.FC = () => (
    <>
    <SideMenu/>
      <IonTabs>
        <IonRouterOutlet id="main-content">
          <Route path="/tabs/dashboard" component={DashboardPage} exact={true} />
          <Route path={`/tabs/dashboard/tripbooking/:type`} component={TripBookingPage} />
          <Route path={`/tabs/dashboard/bookingdetail/:type`} component={BookingDetails} />
          <Route path={`/tabs/dashboard/bidding`} component={BiddingPage} />
          <Route path="/tabs" render={() => <Redirect to="/tabs/dashboard" />} exact={true} />
          <Route path="/" render={() => <Redirect to="/tabs/dashboard" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/dashboard"> 
            <IonIcon className="active" icon={home} />
            <IonLabel className="active">Home</IonLabel>
       </IonTabButton>
        <IonTabButton tab="about" href="/about">
            <IonIcon icon={informationCircle} />
            <IonLabel >About</IonLabel>
        </IonTabButton>
        </IonTabBar>
      </IonTabs>
      </>
);

export default TabRoot;