import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import TripBookingPage from './TripBookingPage/TripBookingPage';
import TripTypePage from './TripTypePage/TripTypePage';
import BookingDetails from './BookingDetailListPage/BookingDetails';

const DashboardPage: React.FC<RouteComponentProps> = ({match}) => {
  return (
    <IonRouterOutlet>
      <Route exact path={match.url} component={TripTypePage} />
      <Route path={`${match.url}/tripbooking/:type`} component={TripBookingPage} />
      <Route path={`${match.url}/bookingdetail/:type`} component={BookingDetails} />
    </IonRouterOutlet>
  );
};

export default DashboardPage