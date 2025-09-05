import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavBar from '../component/framework/BottomNavBar';

const MainStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomNavBar" component={BottomNavBar} />
        </Stack.Navigator>
    );
};

export default MainStack;