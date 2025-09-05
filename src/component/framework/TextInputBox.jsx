import { StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constant/Colors';
import { scale } from 'react-native-size-matters';

const TextInputBox = ({ value, setValue, placeholder = "Placeholder" }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor={Colors.PLACEHOLDER}
            style={[
                styles.txtInputBox,
                isFocused ? styles.active : styles.deactive,
            ]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
};

export default TextInputBox;

const styles = StyleSheet.create({
    txtInputBox: {
        borderWidth: scale(1),
        borderRadius: scale(5),
        padding: scale(10),
    },
    active: {
        borderColor: Colors.THEME,
    },
    deactive: {
        borderColor: Colors.INPUTBOX_DEACTIVE_BORDER_COLOR,
    },
});