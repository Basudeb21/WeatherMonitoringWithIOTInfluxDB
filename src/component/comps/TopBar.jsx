import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Colors from '../../constant/Colors';

const TopBar = ({ title, color = Colors.WHITE, bgColor = Colors.THEME }) => {



    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <View style={styles.sideContainer}>
                <AntDesign
                    name="cloud"
                    size={28}
                    color={color || Colors.WHITE}
                />
            </View>

            <View style={styles.centerContainer}>
                <Text style={[styles.title, { color: color || Colors.WHITE }]}>{title}</Text>
            </View>

            <View style={styles.sideContainer} />
        </View>
    )
}

export default TopBar;

const styles = StyleSheet.create({
    container: {
        height: verticalScale(55),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: moderateScale(16),
    },
    sideContainer: {
        width: "10%",
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    centerContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    title: {
        color: Colors.BLACK,
        fontSize: scale(20),
        fontWeight: "600",
        textAlign: "center",
        alignSelf: "flex-start",
    },

})