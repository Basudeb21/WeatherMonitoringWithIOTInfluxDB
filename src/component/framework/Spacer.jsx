import { View, Text } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters';


const Spacer = (
    { height = verticalScale(0),
        width = moderateScale(0) }
) => {
    return (
        <View style={{ height: height, width: width }} />
    )
}

export default Spacer