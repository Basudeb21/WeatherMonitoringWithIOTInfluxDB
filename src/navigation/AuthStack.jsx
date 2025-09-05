import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationStrings from '../constant/NavigationStrings';
import MainStack from './MainStack';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
const AuthStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationStrings.LOGIN_SCREEN} component={Login} />
            <Stack.Screen name={NavigationStrings.SIGNUP_SCREEN} component={Signup} />
            <Stack.Screen name={NavigationStrings.MAIN_STACK} component={MainStack} />

        </Stack.Navigator>
    )
}

export default AuthStack