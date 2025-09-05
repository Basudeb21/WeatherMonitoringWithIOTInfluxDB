import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import multiple icon packs
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import NavigationStrings from '../../constant/NavigationStrings';
// Screens
import Settings from '../../screens/app/Settings';
import CurrentReadings from '../../screens/app/CurrentReadings';
import TimeSeriesChart from '../../screens/app/TimeSeriesChart';
import LiveGauges from '../../screens/app/LiveGauges';

import Colors from '../../constant/Colors';
import { moderateScale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === NavigationStrings.CURRENT_READINGS) {
                        return (
                            <Ionicons
                                name={focused ? 'thermometer' : 'thermometer-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === NavigationStrings.TIME_SERIES_CHART) {
                        return (
                            <Ionicons
                                name={focused ? 'analytics' : 'analytics-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === NavigationStrings.LIVE_GAUGES) {
                        return (
                            <Ionicons
                                name={focused ? 'speedometer' : 'speedometer-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === NavigationStrings.SETTINGS) {
                        return (
                            <AntDesign
                                name={'setting'}
                                size={size}
                                color={color}
                            />
                        );
                    }
                },
                tabBarActiveTintColor: Colors.THEME,
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    paddingBottom: 4,
                },
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10,
                    marginHorizontal: moderateScale(20),
                    elevation: 5,
                    backgroundColor: Colors.WHITE,
                    borderRadius: 15,
                    height: 65,
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: { width: 0, height: 3 },
                    shadowRadius: 4,
                    paddingBottom: 8,
                },
            })}
        >

            <Tab.Screen
                name={NavigationStrings.CURRENT_READINGS}
                component={CurrentReadings}
                options={{ title: 'Readings' }}
            />
            <Tab.Screen
                name={NavigationStrings.TIME_SERIES_CHART}
                component={TimeSeriesChart}
                options={{ title: 'Chart' }}
            />
            <Tab.Screen
                name={NavigationStrings.LIVE_GAUGES}
                component={LiveGauges}
                options={{ title: 'Gauges' }}
            />
            <Tab.Screen
                name={NavigationStrings.SETTINGS}
                component={Settings}
                options={{ title: 'Settings' }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavBar;

