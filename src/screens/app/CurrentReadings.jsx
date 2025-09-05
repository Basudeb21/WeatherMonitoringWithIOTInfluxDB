import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReadingCard from '../../component/comps/ReadingCard'
import TopBar from '../../component/comps/TopBar'
import Colors from '../../constant/Colors'
import {
    fetchHumidity,
    fetchTemperature,
    fetchPressure,
    fetchAltitude,
    fetchRain
} from '../../api/fetchWeatherData'

const CurrentReadings = () => {
    const [weatherData, setWeatherData] = useState({
        temperature: null,
        pressure: null,
        altitude: null,
        rain: null,
        humidity: null
    });
    const [loading, setLoading] = useState(true);
    const [refreshingCards, setRefreshingCards] = useState({
        temperature: false,
        pressure: false,
        altitude: false,
        rain: false,
        humidity: false
    });

    const formatTimeToIST = (utcTimeString) => {
        try {
            const date = new Date(utcTimeString);
            const istTime = new Date(date.getTime() + (5 * 60 + 30) * 60 * 1000);
            return istTime.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        } catch (error) {
            return 'Invalid time';
        }
    };

    const loadAllData = async () => {
        try {
            setLoading(true);

            const [tempData, pressureData, altitudeData, rainData, humidityData] = await Promise.all([
                fetchTemperature(),
                fetchPressure(),
                fetchAltitude(),
                fetchRain(),
                fetchHumidity()
            ]);

            setWeatherData({
                temperature: tempData,
                pressure: pressureData,
                altitude: altitudeData,
                rain: rainData,
                humidity: humidityData
            });

        } catch (error) {
            console.error('Error loading weather data:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshSingleCard = async (cardType) => {
        try {
            // Set the specific card as refreshing
            setRefreshingCards(prev => ({ ...prev, [cardType.toLowerCase()]: true }));

            let newData;
            switch (cardType.toLowerCase()) {
                case 'temperature':
                    newData = await fetchTemperature();
                    setWeatherData(prev => ({ ...prev, temperature: newData }));
                    break;
                case 'pressure':
                    newData = await fetchPressure();
                    setWeatherData(prev => ({ ...prev, pressure: newData }));
                    break;
                case 'altitude':
                    newData = await fetchAltitude();
                    setWeatherData(prev => ({ ...prev, altitude: newData }));
                    break;
                case 'rain':
                    newData = await fetchRain();
                    setWeatherData(prev => ({ ...prev, rain: newData }));
                    break;
                case 'humidity':
                    newData = await fetchHumidity();
                    setWeatherData(prev => ({ ...prev, humidity: newData }));
                    break;
            }
        } catch (error) {
            console.error(`Error refreshing ${cardType}:`, error);
        } finally {
            // Reset the refreshing state for the specific card
            setRefreshingCards(prev => ({ ...prev, [cardType.toLowerCase()]: false }));
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    const handleCardPress = (cardHead) => {
        refreshSingleCard(cardHead);
    };

    const readings = [
        {
            id: '1',
            head: 'Temperature',
            data: weatherData.temperature ? `${weatherData.temperature.value} °C` : '-- °C',
            updatedAt: weatherData.temperature ? formatTimeToIST(weatherData.temperature.time) : 'Loading...',
            icon: 'thermometer-outline',
            iconColor: '#FF6B6B',
            refreshing: refreshingCards.temperature
        },
        {
            id: '2',
            head: 'Pressure',
            data: weatherData.pressure ? `${weatherData.pressure.value} hPa` : '-- hPa',
            updatedAt: weatherData.pressure ? formatTimeToIST(weatherData.pressure.time) : 'Loading...',
            icon: 'speedometer-outline',
            iconColor: '#4ECDC4',
            refreshing: refreshingCards.pressure
        },
        {
            id: '3',
            head: 'Altitude',
            data: weatherData.altitude ? `${weatherData.altitude.value} m` : '-- m',
            updatedAt: weatherData.altitude ? formatTimeToIST(weatherData.altitude.time) : 'Loading...',
            icon: 'arrow-up-outline',
            iconColor: '#45B7D1',
            refreshing: refreshingCards.altitude
        },
        {
            id: '4',
            head: 'Rain',
            data: weatherData.rain ? `${weatherData.rain.value} mm` : '-- mm',
            updatedAt: weatherData.rain ? formatTimeToIST(weatherData.rain.time) : 'Loading...',
            icon: 'rainy-outline',
            iconColor: '#5D5FEF',
            refreshing: refreshingCards.rain
        },
        {
            id: '5',
            head: 'Humidity',
            data: weatherData.humidity ? `${weatherData.humidity.value} %` : '-- %',
            updatedAt: weatherData.humidity ? formatTimeToIST(weatherData.humidity.time) : 'Loading...',
            icon: 'water-outline',
            iconColor: '#4F8DF9',
            refreshing: refreshingCards.humidity
        }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <TopBar title="IoT Weather Monitoring Station" />
            <FlatList
                ListHeaderComponent={
                    <Text style={styles.header}>Current Readings</Text>
                }
                data={readings}
                numColumns={2}
                contentContainerStyle={{ padding: 10 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <ReadingCard
                        head={item.head}
                        data={item.data}
                        updatedAt={item.updatedAt}
                        icon={item.icon}
                        iconColor={item.iconColor}
                        onPress={() => handleCardPress(item.head)}
                        refreshing={item.refreshing}
                    />
                )}
                keyExtractor={item => item.id}
                refreshing={loading}
                onRefresh={loadAllData}
            />
        </View>
    )
}

export default CurrentReadings

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
    },
})