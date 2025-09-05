import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthStack from './src/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        </View>
    )
}

export default App

const styles = StyleSheet.create({})