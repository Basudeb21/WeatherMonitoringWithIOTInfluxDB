import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constant/Colors';

const ReadingCard = ({ head, data, updatedAt, icon, iconColor, onPress, refreshing }) => {

    const cardConfig = {
        Temperature: { color: '#FF7043', icon: 'thermometer-outline' },
        // Pressure: { color: '#42A5F5', icon: 'speedometer-outline' },
        // Altitude: { color: '#66BB6A', icon: 'trending-up-outline' },
        // Rain: { color: '#26C6DA', icon: 'rainy-outline' },
        Humidity: { color: '#4F8DF9', icon: 'water-outline' },
    };

    const finalColor = iconColor || (cardConfig[head]?.color || Colors.THEME);
    const finalIcon = icon || (cardConfig[head]?.icon || 'help-circle-outline');

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: finalColor }]}
            onPress={onPress}
            disabled={refreshing}
        >
            {refreshing ? (
                <ActivityIndicator size="small" color={Colors.WHITE} style={{ marginBottom: 8 }} />
            ) : (
                <Ionicons name={finalIcon} size={28} color={Colors.WHITE} style={{ marginBottom: 8 }} />
            )}

            <Text style={styles.head}>{head}</Text>

            {refreshing ? (
                <Text style={styles.data}>Updating...</Text>
            ) : (
                <Text style={styles.data}>{data}</Text>
            )}

            <Text style={styles.time}>
                {refreshing ? 'Refreshing...' : updatedAt}
            </Text>
        </TouchableOpacity>
    );
};

export default ReadingCard;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
        elevation: 4,
        maxWidth: '48%',
        minHeight: 140,
    },
    head: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.WHITE,
        marginBottom: 6,
        textAlign: 'center',
    },
    data: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.WHITE,
        textAlign: 'center',
    },
    time: {
        fontSize: 12,
        color: Colors.WHITE,
        marginTop: 6,
        opacity: 0.8,
        textAlign: 'center',
    },
});