import React from 'react';
import { useSelector,RootStateOrAny } from 'react-redux';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import AdminDashboard from '../Admin/Dashboard/AdminDashboard';
import DashboardPage from '../Dashboard/DashboardPage';
import { SideMenu } from '../../components/MenuDrawer/SideMenu';
import { home, informationCircle} from 'ionicons/icons';
import TripBookingPage from '../TripBookingPage/TripBookingPage';
import BookingDetails from '../BookingDetailListPage/BookingDetails';
import BiddingPage from '../BiddingPage/BiddingPage';
import AddBooking from '../Admin/AddBooking/AddBooking';
import SelectBidForBooking from '../Admin/SelectBidForBooking/SelectBidForBooking';

const TabRoot: React.FC = () => {
  const {userInfo} = useSelector((state:RootStateOrAny) => state.userSignin);
    return (
      <>
       {(userInfo.role === 'admin') ? '' : <SideMenu/>}
       <IonTabs>
          <IonRouterOutlet id="main-content">
            {(userInfo.role === 'admin') 
              ? <Route path="/tabs/dashboard" component={AdminDashboard} exact={true} /> 
              : <Route path="/tabs/dashboard" component={DashboardPage} exact={true} /> 
            }
            
          <Route path={`/tabs/dashboard/add-booking`} component={AddBooking} />
          <Route path={`/tabs/dashboard/select-bid-foe-booking`} component={SelectBidForBooking} />
          <Route path={`/tabs/dashboard/update-user-data`} component={SelectBidForBooking} />

          <Route path={`/tabs/dashboard/tripbooking/:type`} component={TripBookingPage} />
          <Route path={`/tabs/dashboard/bookingdetail/:type`} component={BookingDetails} />
          <Route path={`/tabs/dashboard/bidding`} component={BiddingPage} />
          <Route path="/tabs" render={() => <Redirect to="/tabs/dashboard" />} exact={true} />
          <Route path="/" render={() => <Redirect to="/tabs/dashboard" />} exact={true} />
        </IonRouterOutlet>
        {(userInfo.role === 'admin') ? 
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
        :
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
        }
        </IonTabs>
      </>
    );
  }

export default TabRoot;