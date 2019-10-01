import {
    Platform
} from 'react-native'

import firebase from 'react-native-firebase'

import {
    GetRealmObjs
} from './Realm'

export async function GetToken() {
    let token = ""
    
    await firebase.messaging().getToken().then(retrievedToken => {
        if(retrievedToken) {
            token = retrievedToken
        }
    })

    return token
}

export async function GetPermissionSuccess() {
    let isPermitted = false
    
    await firebase.messaging().hasPermission().then(hasPermission => isPermitted = hasPermission ? hasPermission : false)

    if(!isPermitted) {
        await firebase.messaging().requestPermission().then(() => isPermitted = true)
    }

    return isPermitted
}

export function DisplayNotification(notification) {
    if(Platform.OS == "android") {
        const channel = new firebase.notifications.Android.Channel("Messages", "Messages", firebase.notifications.Android.Importance.High)

        firebase.notifications().android.createChannel(channel)
    }
    let notificationIDStore = require("../refs/realmSess").NotificationID
    
    if(GetRealmObjs(notificationIDStore).length == 0) {
        notificationIDStore.realm.write(() => {
            notificationIDStore.realm.create(notificationIDStore.schemaName, {value: 0})
        })
    }

    let notificationIndex = GetRealmObjs(notificationIDStore)[0].value

    let new_notification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
        title: notification.title,
        body: notification.body,
        data: {
            ...notification.data,
            id: notificationIndex.toString(),
        }
    })
    .setNotificationId(notificationIndex.toString())
    .setSubtitle(notification.subtitle)

    if(Platform.OS == "android") {
        new_notification.android.setVibrate(1000)
        .android.setChannelId('Messages')
        .android.setSmallIcon('ic_launcher')
        .android.setPriority(firebase.notifications.Android.Priority.High)
    }

    firebase.notifications().displayNotification(new_notification)

    notificationIDStore.realm.write(() => {
        notificationIDStore.realm.objects(notificationIDStore.schemaName)[0].value = notificationIndex + 1
    })
}

export function ListeningMessage() {
    return firebase.notifications().onNotification((notification) => DisplayNotification(notification))
}