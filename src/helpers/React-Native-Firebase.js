import React from 'react'

import {
    Platform
} from 'react-native'

import firebase from 'react-native-firebase'

import {
    GetRealmObjs,
    OpenRealmSess
} from './Realm'

import {
    RealmRefs
} from '../refs/Realm'

export async function GetToken() {
    let token = ""
    
    await firebase.messaging().getToken().then(retrievedToken => {
        if(retrievedToken) {
            token = retrievedToken
        }
    })

    return token
}

export class MessageListener extends React.Component {
    constructor(props) {
        super(props)

        this.StartListeningMessage()
    }

    async StartListeningMessage() {
        const permitted = await this.GetPermissionSuccess()

        if(permitted) {
            this.messageListener = await this.ListeningMessage()
        }
    }

    render() {
        return null
    }

    componentWillUnmount() {
        if(this.messageListener != undefined) {
            this.messageListener()
        }
    }

    async GetPermissionSuccess() {
        let isPermitted = false
        
        await firebase.messaging().hasPermission().then(hasPermission => isPermitted = hasPermission ? hasPermission : false)
    
        if(!isPermitted) {
            await firebase.messaging().requestPermission().then(() => isPermitted = true)
        }
    
        return isPermitted
    }

    async ListeningMessage() {
        const notificationIDStore = await OpenRealmSess(RealmRefs().NotificationID)
    
        return firebase.notifications().onNotification((notification) => {
            if(Platform.OS == "android") {
                firebase.notifications().android.createChannel(new firebase.notifications.Android.Channel("Messages", "Messages", firebase.notifications.Android.Importance.High))
            }
            
            if(GetRealmObjs(notificationIDStore).length == 0) {
                notificationIDStore.realm.write(() => notificationIDStore.realm.create(notificationIDStore.schemaName, {value: 0}))
            }
        
            let notificationIndex = GetRealmObjs(notificationIDStore)[0].value
        
            let newNotification = new firebase.notifications.Notification({
                sound: 'default',
                show_in_foreground: true,
                title: notification.title,
                body: notification.body,
                data: {
                    ...notification.data,
                    id: notificationIndex.toString()
                }
            })
            .setNotificationId(notificationIndex.toString())
            .setSubtitle(notification.subtitle)
        
            if(Platform.OS == "android") {
                newNotification.android.setVibrate(1000)
                .android.setChannelId('Messages')
                .android.setSmallIcon('ic_launcher')
                .android.setPriority(firebase.notifications.Android.Priority.High)
            }
        
            firebase.notifications().displayNotification(newNotification)
        
            notificationIDStore.realm.write(() => notificationIDStore.realm.objects(notificationIDStore.schemaName)[0].value = notificationIndex + 1)
        })
    }
}