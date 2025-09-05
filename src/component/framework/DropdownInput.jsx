import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Using Feather icons

const DropdownInput = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const items = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectItem = (item) => {
        setSelectedValue(item);
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select an option:</Text>

            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                <Text style={selectedValue ? styles.selectedText : styles.placeholder}>
                    {selectedValue ? selectedValue.label : "Choose an option..."}
                </Text>
                <Icon
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#495057"
                    style={styles.icon}
                />
            </TouchableOpacity>

            <Modal transparent visible={isOpen} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.dropdownList}>
                            <FlatList
                                data={items}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => selectItem(item)}
                                    >
                                        <Text style={styles.itemText}>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {selectedValue && <Text style={styles.selected}>Selected: {selectedValue.label}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#ced4da",
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    placeholder: {
        color: "#6c757d",
        fontSize: 16,
    },
    selectedText: {
        color: "#495057",
        fontSize: 16,
    },
    icon: {
        marginLeft: 10,
    },
    selected: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    dropdownList: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 4,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    itemText: {
        fontSize: 16,
        color: "#495057",
    },
});

export default DropdownInput;
