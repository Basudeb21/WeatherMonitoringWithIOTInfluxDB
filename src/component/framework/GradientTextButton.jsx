import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constant/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const GradientTextButton = ({ label = "Label", onPress, height = 33, fontSize = 18, width = "100%" }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ width }}>
            <LinearGradient
                colors={[Colors.BUTTON_GRADIENT_TWO, Colors.BUTTON_GRADIENT_ONE]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, { height: verticalScale(height) }]}
            >
                <Text style={[styles.text, { fontSize: scale(fontSize) }]}>{label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientTextButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: Colors.WHITE,
        fontWeight: "700",
    },
})