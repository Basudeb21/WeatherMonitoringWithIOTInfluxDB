import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { verticalScale } from "react-native-size-matters";
import Svg, { Path, Line, Circle, Text as SvgText, G } from "react-native-svg";

const Gauge = ({
    size = 200,
    strokeWidth = 18,
    value = 22.4,
    min = 0,
    max = 50,
    unit = "°C",
    label = "Temperature",
}) => {
    const radius = (size - strokeWidth) / 2;
    const centerX = size / 2;
    const centerY = size / 2 + 10;

    // Calculate percentage and angle
    const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
    const angle = 180 * percentage; // 0 → 180deg

    // Convert polar to Cartesian coordinates
    const polarToCartesian = (angleDeg) => {
        const rad = (Math.PI / 180) * (angleDeg - 180);
        return {
            x: centerX + radius * Math.cos(rad),
            y: centerY + radius * Math.sin(rad),
        };
    };

    // Describe arc path
    const describeArc = (startAngle, endAngle) => {
        const start = polarToCartesian(startAngle);
        const end = polarToCartesian(endAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
    };

    // Needle position - REVERSED to go from left to right
    const needleTip = polarToCartesian(angle);

    // Tick marks - REVERSED to go from 0 to 50
    const tickCount = 5;
    const ticks = [];
    for (let i = 0; i <= tickCount; i++) {
        const tickAngle = (180 * i) / tickCount; // Changed from 180 - (180 * i)/tickCount
        const tickStart = polarToCartesian(tickAngle);
        const tickValue = min + ((max - min) * i) / tickCount;

        ticks.push(
            <G key={`tick-${i}`}>
                <Line
                    x1={tickStart.x}
                    y1={tickStart.y}
                    x2={tickStart.x - (radius * 0.15) * Math.cos((Math.PI / 180) * (tickAngle - 180))}
                    y2={tickStart.y - (radius * 0.15) * Math.sin((Math.PI / 180) * (tickAngle - 180))}
                    stroke="black"
                    strokeWidth={1.5}
                />
                <SvgText
                    x={tickStart.x - (radius * 0.3) * Math.cos((Math.PI / 180) * (tickAngle - 180))}
                    y={tickStart.y - (radius * 0.3) * Math.sin((Math.PI / 180) * (tickAngle - 180)) + 4}
                    fontSize="10"
                    fill="black"
                    textAnchor="middle"
                >
                    {tickValue}
                </SvgText>
            </G>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{label}</Text>

            <Svg width={size} height={size + 20}>
                {/* Gray background arc */}
                <Path
                    d={describeArc(0, 180)}
                    stroke="#e0e0e0"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Green zone (left side) - REVERSED */}
                <Path
                    d={describeArc(0, 150)}
                    stroke="#a1e3a3ff"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Red zone (right side) - REVERSED */}
                <Path
                    d={describeArc(150, 180)}
                    stroke="#ec8b84ff"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                />

                {ticks}

                {/* Needle - now goes from left to right */}
                <Line
                    x1={centerX}
                    y1={centerY}
                    x2={needleTip.x}
                    y2={needleTip.y}
                    stroke="#333"
                    strokeWidth={2.5}
                />

                <Circle
                    cx={centerX}
                    cy={centerY}
                    r={5}
                    fill="#333"
                />

                <SvgText
                    x={centerX}
                    y={centerY + 25}
                    fontSize="16"
                    fontWeight="bold"
                    fill="#333"
                    textAnchor="middle"
                >
                    {value.toFixed(1)}{unit}
                </SvgText>
            </Svg>
        </View>
    );
};

export default Gauge;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        marginTop: verticalScale(20),
    },
});