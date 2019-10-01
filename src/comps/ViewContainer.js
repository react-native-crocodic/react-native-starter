import React, {
    useEffect
} from 'react'

import {
    StatusBar,
    Platform,
    View
} from 'react-native'

import {
    getStatusBarHeight
} from 'react-native-status-bar-height'

export default props => {
    const statusBarColor = props.statusBarColor || "black"

    useEffect(() => {
        SetStatusBar()

        return () => { }
    }, [])

    function SetStatusBar() {
        StatusBar.setBarStyle(props.statusBarStyle || "light-content")

        if(Platform.OS === "android") {
            StatusBar.setBackgroundColor(statusBarColor)
        }
    }

    return (
        <View
            style = {{
                backgroundColor: statusBarColor,
                flex: 1,
                paddingTop: Platform.OS === "ios" ? getStatusBarHeight() : 0
            }}
        >
            <View
                style = {{
                    flex: 1
                }}
            >
                {props.children}
            </View>
        </View>
    )
}