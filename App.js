import React, {
    useEffect,
    useState
} from 'react'

import {
    Clipboard
} from 'react-native'

import {
    createAppContainer
} from 'react-navigation'

import {
    createStackNavigator
} from 'react-navigation-stack'

import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import {
    GetPermissionSuccess,
    GetToken,
    ListeningMessage
} from './src/helpers/React-Native-Firebase'

import {
    OpenRealmSess
} from './src/helpers/Realm'

import {
    RealmRefs
} from './src/refs/Realm'

import ViewContainer from './src/comps/ViewContainer'

import InitialScreen from './src/screens/InitialScreen'

const DefaultStackNavigator = createAppContainer(createStackNavigator(
    {
        InitialScreen
    },
    {
        transitionConfig: () => ({screenInterpolator: sceneProps => StackViewStyleInterpolator.forHorizontal(sceneProps)})
    }
))

export default () => {
    const [finishOpeningRealms, setFinishOpeningRealms] = useState(false)

    const allRealmSessName = [
        "NotificationID"
    ]

    let totalOpeningRealmsFinish = 0

    let messageListener = undefined

    useEffect(() => {
        for(let realmSessName of allRealmSessName) {
            OpeningRealms(realmSessName)
        }

        return () => {
            if(messageListener != undefined) {
                messageListener()
            }
        }
    }, [])

    async function OpeningRealms(realmSessName = "") {
        require("./src/refs/realmSess")[realmSessName] = await OpenRealmSess(RealmRefs()[realmSessName])

        totalOpeningRealmsFinish++

        if(totalOpeningRealmsFinish == allRealmSessName.length) {
            setFinishOpeningRealms(true)

            let permitted = await GetPermissionSuccess()

            if(permitted) {
                let token = await GetToken()

                Clipboard.setString(token)

                messageListener = ListeningMessage()
            }
        }
    }

    return (
        <ViewContainer
            statusBarColor = "black"
            statusBarStyle = "light-content"
        >
            {
                finishOpeningRealms ?
                    <DefaultStackNavigator />
                    :
                    null
            }
        </ViewContainer>
    )
}