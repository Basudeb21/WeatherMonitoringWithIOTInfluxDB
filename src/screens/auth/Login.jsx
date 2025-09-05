import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import Images from './../../constant/Images'
import { verticalScale } from 'react-native-size-matters'
import TextInputBox from '../../component/framework/TextInputBox'
import GradientTextButton from '../../component/framework/GradientTextButton'
import Link from '../../component/framework/Link'
import Spacer from '../../component/framework/Spacer'
import NavigationStrings from '../../constant/NavigationStrings'
import { useNavigation } from '@react-navigation/native'
const Login = () => {
    const navigation = useNavigation();
    const handleSignupPress = () => {
        navigation.navigate(NavigationStrings.SIGNUP_SCREEN);
    }

    const handleOpenApp = () => {
        navigation.navigate(NavigationStrings.MAIN_STACK);
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={Images.LOGO} style={styles.logo} />
                <Text style={styles.loginTxt}>Login</Text>
                <View style={styles.form}>
                    <TextInputBox placeholder='Enter user ID' />
                    <TextInputBox placeholder='Enter password' />
                    <GradientTextButton label='Login' height={40} fontSize={20} onPress={handleOpenApp} />
                </View>
                <Spacer height={10} />
                <Link label="Don't have an account? Signup" onPress={handleSignupPress} />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '80%',
        paddingVertical: verticalScale(20),
    },

    logo: {
        width: "70%",
        height: verticalScale(80),
        borderRadius: verticalScale(40),
    },

    loginTxt: {
        fontSize: verticalScale(24),
        fontWeight: 'bold',
        marginBottom: verticalScale(20),
        color: Colors.THEME,
    },

    form: {
        width: '100%',
        paddingHorizontal: verticalScale(20),
        gap: verticalScale(15),
    }

})