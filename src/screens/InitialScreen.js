import React, {
    useEffect,
    useRef,
    useState
} from 'react'

import {
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

import MapView, {
    PROVIDER_GOOGLE
} from 'react-native-maps'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from "react-native-google-signin"

const InitialScreen = () => {
    const [typedText, SetTypedText] = useState("")
    
    useEffect(() => {
        GoogleSignin.configure()

        return (() => {

        })
    }, [])

    let textInput = useRef()

    function ClearTextInput() {
        SetTypedText("")

        textInput.current.blur()
    }

    async function GoogleSignIn() {
        try {
            await GoogleSignin.hasPlayServices()
    
            const userInfo = await GoogleSignin.signIn()
    
            console.log("RESULT GOOGLE", userInfo)
        } catch (error) {
            console.log(error, error.code)
    
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    return (
        <View
            style = {{
                flex: 1,
                padding: 20
            }}
        >
            <TextInput
                onChangeText = {value => SetTypedText(value)}
                onSubmitEditing = {() => ClearTextInput()}
                ref = {textInput}
                placeholder = "Type your input here..."
                style = {{
                    borderRadius: 10,
                    borderWidth: 1,
                    height: 40,
                    paddingHorizontal: 10
                }}
                value = {typedText}
            />
            
            <TouchableOpacity
                onPress = {() => ClearTextInput()}
                style = {{
                    alignSelf: "flex-end",
                    backgroundColor: "deepskyblue",
                    borderRadius: 10,
                    marginBottom: 40,
                    marginTop: 10,
                    padding: 10
                }}
            >
                <Text
                    style = {{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold"
                    }}
                >
                    Done
                </Text>
            </TouchableOpacity>

            <GoogleSigninButton
                color = {GoogleSigninButton.Color.Light}
                size = {GoogleSigninButton.Size.Wide}
                style = {{
                    alignSelf: "center",
                    height: 48,
                    marginVertical: 20,
                    width: 192
                }}
                onPress = {() => GoogleSignIn()}
            />

            <MapView
                provider = {PROVIDER_GOOGLE}
                style = {{
                    backgroundColor: "dimgray",
                    height: (Dimensions.get("screen").width - 40) / 16 * 9,
                    marginBottom: 40
                }}
                initialRegion = {{
                    latitude: -6.9932,
                    longitude: 110.4203,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                minZoomLevel = {10}
                maxZoomLevel = {17.5}
                rotateEnabled = {false}
                onMarkerPress = {e => {}}
            />
        </View>
    )
}

InitialScreen.navigationOptions = {
    title: "Hello"
}

export default InitialScreen