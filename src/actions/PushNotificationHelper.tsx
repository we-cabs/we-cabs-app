import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
import { actionToUpdateUserData } from './AdminAction';
const { PushNotifications } = Plugins;

export function pushNotification(dispatch:any,state:any){
    
 // Register with Apple / Google to receive push via APNS/FCM
 PushNotifications.register();
    PushNotifications.addListener('registration',
    (token: PushNotificationToken) => {
     console.log(token.value);
     let userData = state.userSignin.userInfo;
     userData.deviceToken = token.value;
     dispatch(actionToUpdateUserData(userData));
    }
);
//  // Some issue with your setup and push will not work
 PushNotifications.addListener('registrationError',
    (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
    }
);
// // Show us the notification payload if the app is open on our device
// PushNotifications.addListener('pushNotificationReceived',
//     (notification: PushNotification) => {
//     let notif = payload.notifications;
//     notif.push({ id: notification.id, title: notification.title, body: notification.body })
//     }
// );

// // Method called when tapping on a notification
// PushNotifications.addListener('pushNotificationActionPerformed',
//     (notification: PushNotificationActionPerformed) => {
//     let notif = payload.notifications;
//     notif.push({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body })
//     }
// );
}