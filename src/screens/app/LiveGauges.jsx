import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Gauge from "../../component/comps/Gauge";
import TopBar from "../../component/comps/TopBar";
import Spacer from "../../component/framework/Spacer";

const LiveGauges = () => {
    const readings = [
        { id: "1", label: "°C", value: 22.4, min: 0, max: 50, title: "Temperature" },
        { id: "2", label: "hPa", value: 993, min: 950, max: 1050, title: "Pressure" },
        { id: "3", label: "m", value: 170, min: 0, max: 3000, title: "Altitude" },
        { id: "4", label: "mm", value: 0, min: 0, max: 50, title: "Rainfall" },
    ];

    return (
        <View style={styles.container}>
            <TopBar title="IoT Weather Monitoring Station" />

            <FlatList
                data={readings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Gauge
                        value={item.value}
                        min={item.min}
                        max={item.max}
                        unit={item.label}
                        label={item.title}
                    />
                )}
                ListFooterComponent={
                    <Spacer height={80} />
                }
            />
        </View>
    );
};

export default LiveGauges;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    listContainer: {
        padding: 10,
    },
});