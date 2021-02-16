import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import TripBookingPage from './TripBookingPage/TripBookingPage';
import TripTypePage from './TripTypePage/TripTypePage';

const DashboardPage: React.FC<RouteComponentProps> = ({match}) => {
  return (
    <IonRouterOutlet>
      <Route exact path={match.url} component={TripTypePage} />
      <Route path={`${match.url}/tripbooking/:type`} component={TripBookingPage} />
    </IonRouterOutlet>
  );
};

export default DashboardPage