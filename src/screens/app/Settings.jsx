import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopBar from '../../component/comps/TopBar'
import DropdownInput from '../../component/framework/DropdownInput'
import CheckBox from '../../component/framework/Checkbox '
import GradientTextButton from '../../component/framework/GradientTextButton'
import { moderateScale, verticalScale } from 'react-native-size-matters'
const Settings = () => {
    return (
        <View style={{ flex: 1 }}>
            <TopBar title=" IoT Weather Monitoring Station" />
            <DropdownInput />
            <View style={styles.row}>
                <CheckBox />
                <Text>Enable Autorefresh</Text>
            </View>
            <DropdownInput />

            <View style={styles.btnBottom}>
                <GradientTextButton label="Logout" onPress={() => { }} width='80%' />
            </View>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginStart: moderateScale(10)
    },
    btnBottom: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        bottom: verticalScale(140)
    }
})