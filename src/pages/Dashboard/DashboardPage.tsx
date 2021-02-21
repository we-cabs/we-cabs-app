import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonRouterOutlet  } from '@ionic/react';

import TripBookingPage from '../TripBookingPage/TripBookingPage';
import TripTypePage from '../TripTypePage/TripTypePage';
import BookingDetails from '../BookingDetailListPage/BookingDetails';
import BiddingPage from '../BiddingPage/BiddingPage';
import { SideMenu } from '../../components/MenuDrawer/SideMenu';
import {home , informationCircle } from 'ionicons/icons';
import './DashboardPage.css'

const DashboardPage: React.FC<RouteComponentProps> = ({match}) => {
  return (
    <>
    <SideMenu></SideMenu>
    <IonTabs>
    <IonRouterOutlet id="main-content">
      <Route exact path={match.url} component={TripTypePage} />
      <Route path={`${match.url}/tripbooking/:type`} component={TripBookingPage} />
      <Route path={`${match.url}/bookingdetail/:type`} component={BookingDetails} />
      <Route path={`${match.url}/bidding`} component={BiddingPage} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="map">
        <IonIcon className="active" icon={home} />
        <IonLabel className="active">Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="about">
        <IonIcon icon={informationCircle} />
        <IonLabel >About</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
    </>
  );
};

export default DashboardPage