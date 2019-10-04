import React from 'react'

import {
    createAppContainer
} from 'react-navigation'

import {
    createStackNavigator
} from 'react-navigation-stack'

import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import {
    MessageListener
} from './helpers/React-Native-Firebase'

import ViewContainer from './comps/ViewContainer'

import InitialScreen from './screens/InitialScreen'

const DefaultStackNavigator = createAppContainer(createStackNavigator(
    {
        InitialScreen
    },
    {
        transitionConfig: () => ({screenInterpolator: sceneProps => StackViewStyleInterpolator.forHorizontal(sceneProps)})
    }
))

export default () => {
    return (
        <ViewContainer
            statusBarColor = "black"
            statusBarStyle = "light-content"
        >
            <MessageListener />

            <DefaultStackNavigator />
        </ViewContainer>
    )
}