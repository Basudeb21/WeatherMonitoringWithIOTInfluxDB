import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import Svg, { Line, Path, G, Text as SvgText, Circle, Rect } from "react-native-svg";
import TopBar from "../../component/comps/TopBar";

const { width } = Dimensions.get("window");

const chartTabs = ["Temperature", "Pressure", "Altitude", "Rain"];

const sampleData = {
    Temperature: [
        { x: "15:30", y: 22.7 },
        { x: "15:35", y: 22.8 },
        { x: "15:40", y: 22.9 },
        { x: "15:45", y: 22.6 },
        { x: "15:50", y: 22.5 },
        { x: "15:55", y: 22.7 },
        { x: "16:00", y: 22.4 },
        { x: "16:05", y: 22.6 },
        { x: "16:10", y: 22.7 },
        { x: "16:15", y: 22.5 },
    ],
    Pressure: [
        { x: "15:30", y: 1001 },
        { x: "15:35", y: 1002 },
        { x: "15:40", y: 1001 },
        { x: "15:45", y: 1003 },
        { x: "15:50", y: 1004 },
        { x: "15:55", y: 1005 },
        { x: "16:00", y: 1003 },
        { x: "16:05", y: 1002 },
        { x: "16:10", y: 1004 },
    ],
    Altitude: [
        { x: "15:30", y: 450 },
        { x: "15:35", y: 455 },
        { x: "15:40", y: 460 },
        { x: "15:45", y: 440 },
        { x: "15:50", y: 430 },
        { x: "15:55", y: 435 },
        { x: "16:00", y: 445 },
        { x: "16:05", y: 450 },
    ],
    Rain: [
        { x: "15:30", y: 2 },
        { x: "15:35", y: 3 },
        { x: "15:40", y: 1 },
        { x: "15:45", y: 4 },
        { x: "15:50", y: 5 },
        { x: "15:55", y: 3 },
        { x: "16:00", y: 2 },
    ],
};

export default function TimeSeriesCharts() {
    const [activeTab, setActiveTab] = useState("Temperature");
    const [activeIndex, setActiveIndex] = useState(null);

    const yAxisLabel =
        activeTab === "Temperature"
            ? "Temperature (°C)"
            : activeTab === "Pressure"
                ? "Pressure (hPa)"
                : activeTab === "Altitude"
                    ? "Altitude (m)"
                    : "Rain (mm)";

    const chartWidth = width - 80;
    const chartHeight = 250;
    const padding = { top: 30, right: 20, bottom: 50, left: 50 };

    const data = sampleData[activeTab];

    const yValues = data.map(d => d.y);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const getNiceRange = (min, max, ticks = 5) => {
        const range = max - min;
        const tickInterval = range / (ticks - 1);
        const magnitude = Math.pow(10, Math.floor(Math.log10(tickInterval)));
        const roundedTick = Math.ceil(tickInterval / magnitude) * magnitude;

        const niceMin = Math.floor(min / roundedTick) * roundedTick;
        const niceMax = Math.ceil(max / roundedTick) * roundedTick;

        return { min: niceMin, max: niceMax, interval: roundedTick };
    };

    const niceY = getNiceRange(yMin, yMax);
    const yRange = niceY.max - niceY.min;

    // Calculate X positions
    const xScale = chartWidth / Math.max(1, data.length - 1);

    // Generate path data for the line with smoothing
    const createSmoothedPath = (data, xScale, yScaleFn) => {
        if (data.length === 0) return "";

        let path = `M ${padding.left} ${yScaleFn(data[0].y)}`;

        for (let i = 1; i < data.length; i++) {
            const x0 = padding.left + (i - 1) * xScale;
            const y0 = yScaleFn(data[i - 1].y);
            const x1 = padding.left + i * xScale;
            const y1 = yScaleFn(data[i].y);

            // Create a simple curve for smoothing
            const cx = x0 + (x1 - x0) / 2;
            path += ` Q ${cx} ${y0}, ${cx} ${(y0 + y1) / 2}`;
            path += ` Q ${cx} ${y1}, ${x1} ${y1}`;
        }

        return path;
    };

    const yScaleFn = (value) => {
        return padding.top + chartHeight - ((value - niceY.min) / yRange) * chartHeight;
    };

    const smoothedPath = createSmoothedPath(data, xScale, yScaleFn);

    // Generate Y axis ticks
    const yTicks = [];
    for (let value = niceY.min; value <= niceY.max; value += niceY.interval) {
        yTicks.push(value);
    }

    // Create path for area fill
    const areaPath = data.length > 0
        ? `${smoothedPath} L ${padding.left + (data.length - 1) * xScale} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`
        : "";

    return (
        <View style={styles.container}>
            <TopBar title="IoT Weather Monitoring Station" />
            <Text style={styles.heading}>Time-Series Charts</Text>

            {/* Tabs - Fixed alignment */}
            <View style={styles.tabContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabContent}
                >
                    {chartTabs.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={[styles.tab, activeTab === item && styles.activeTab]}
                            onPress={() => {
                                setActiveTab(item);
                                setActiveIndex(null);
                            }}
                        >
                            <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Custom SVG Chart - Fixed container */}
            <View style={styles.chartCard}>
                <View style={styles.chartContainer}>
                    <Svg width={chartWidth + padding.left + padding.right}
                        height={chartHeight + padding.top + padding.bottom}>

                        {/* Chart background */}
                        <Rect
                            x={padding.left}
                            y={padding.top}
                            width={chartWidth}
                            height={chartHeight}
                            fill="#f8f9fa"
                            rx={8}
                            ry={8}
                        />

                        {/* Horizontal grid lines */}
                        {yTicks.map((value, index) => {
                            const y = yScaleFn(value);
                            return (
                                <Line
                                    key={`h-grid-${index}`}
                                    x1={padding.left}
                                    y1={y}
                                    x2={padding.left + chartWidth}
                                    y2={y}
                                    stroke="#e9ecef"
                                    strokeWidth={1}
                                    strokeDasharray="4,4"
                                />
                            );
                        })}

                        {/* Vertical grid lines */}
                        {data.map((point, index) => {
                            if (index % Math.ceil(data.length / 6) !== 0) return null;
                            const x = padding.left + index * xScale;
                            return (
                                <Line
                                    key={`v-grid-${index}`}
                                    x1={x}
                                    y1={padding.top}
                                    x2={x}
                                    y2={padding.top + chartHeight}
                                    stroke="#e9ecef"
                                    strokeWidth={1}
                                    strokeDasharray="4,4"
                                />
                            );
                        })}

                        {/* Y Axis */}
                        <Line
                            x1={padding.left}
                            y1={padding.top}
                            x2={padding.left}
                            y2={padding.top + chartHeight}
                            stroke="#495057"
                            strokeWidth={2}
                        />

                        {/* Y Axis Ticks and Labels */}
                        {yTicks.map((value, index) => {
                            const y = yScaleFn(value);
                            return (
                                <G key={index}>
                                    <Line
                                        x1={padding.left - 5}
                                        y1={y}
                                        x2={padding.left}
                                        y2={y}
                                        stroke="#495057"
                                        strokeWidth={2}
                                    />
                                    <SvgText
                                        x={padding.left - 10}
                                        y={y + 4}
                                        fontSize="10"
                                        fill="#495057"
                                        fontWeight="500"
                                        textAnchor="end"
                                    >
                                        {value.toFixed(value % 1 === 0 ? 0 : 1)}
                                    </SvgText>
                                </G>
                            );
                        })}

                        {/* Y Axis Label */}
                        <SvgText
                            x={15}
                            y={padding.top + chartHeight / 2}
                            fontSize="11"
                            fill="#495057"
                            fontWeight="600"
                            textAnchor="middle"
                            transform={`rotate(-90, 15, ${padding.top + chartHeight / 2})`}
                        >
                            {yAxisLabel}
                        </SvgText>

                        {/* X Axis */}
                        <Line
                            x1={padding.left}
                            y1={padding.top + chartHeight}
                            x2={padding.left + chartWidth}
                            y2={padding.top + chartHeight}
                            stroke="#495057"
                            strokeWidth={2}
                        />

                        {/* X Axis Ticks and Labels */}
                        {data.map((point, index) => {
                            if (index % Math.ceil(data.length / 6) !== 0 && index !== data.length - 1) return null;
                            const x = padding.left + index * xScale;
                            return (
                                <G key={index}>
                                    <Line
                                        x1={x}
                                        y1={padding.top + chartHeight}
                                        x2={x}
                                        y2={padding.top + chartHeight + 5}
                                        stroke="#495057"
                                        strokeWidth={2}
                                    />
                                    <SvgText
                                        x={x}
                                        y={padding.top + chartHeight + 20}
                                        fontSize="10"
                                        fill="#495057"
                                        fontWeight="500"
                                        textAnchor="middle"
                                    >
                                        {point.x}
                                    </SvgText>
                                </G>
                            );
                        })}

                        {/* X Axis Label */}
                        <SvgText
                            x={padding.left + chartWidth / 2}
                            y={padding.top + chartHeight + 35}
                            fontSize="11"
                            fill="#495057"
                            fontWeight="600"
                            textAnchor="middle"
                        >
                            Time (IST)
                        </SvgText>

                        {/* Area fill */}
                        {data.length > 0 && (
                            <Path
                                d={areaPath}
                                fill="rgba(76, 201, 240, 0.2)"
                            />
                        )}

                        {/* Data Line */}
                        {data.length > 0 && (
                            <Path
                                d={smoothedPath}
                                stroke="#4cc9f0"
                                strokeWidth={3}
                                fill="none"
                                strokeLinecap="round"
                            />
                        )}

                        {/* Data Points with interaction */}
                        {data.map((point, index) => {
                            const x = padding.left + index * xScale;
                            const y = yScaleFn(point.y);

                            return (
                                <G key={index}>
                                    <Circle
                                        cx={x}
                                        cy={y}
                                        r={activeIndex === index ? 5 : 3}
                                        fill={activeIndex === index ? "#4361ee" : "#4cc9f0"}
                                        stroke="#fff"
                                        strokeWidth={1.5}
                                        onPress={() => setActiveIndex(activeIndex === index ? null : index)}
                                    />
                                    {activeIndex === index && (
                                        <G>
                                            <Rect
                                                x={x - 25}
                                                y={y - 40}
                                                width={50}
                                                height={25}
                                                rx={4}
                                                fill="rgba(0,0,0,0.8)"
                                            />
                                            <SvgText
                                                x={x}
                                                y={y - 26}
                                                fontSize="10"
                                                fill="#fff"
                                                textAnchor="middle"
                                            >
                                                {point.y}
                                            </SvgText>
                                            <SvgText
                                                x={x}
                                                y={y - 13}
                                                fontSize="9"
                                                fill="#fff"
                                                textAnchor="middle"
                                            >
                                                {point.x}
                                            </SvgText>
                                        </G>
                                    )}
                                </G>
                            );
                        })}
                    </Svg>
                </View>

                {/* Chart legend */}
                <View style={styles.legend}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: '#4cc9f0' }]} />
                        <Text style={styles.legendText}>{activeTab}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
    },
    tabContainer: {
        marginBottom: 15,
        maxHeight: 45,
    },
    tabContent: {
        paddingHorizontal: 10,
    },
    tab: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 18,
        backgroundColor: "#f8f9fa",
    },
    activeTab: {
        backgroundColor: "#4361ee",
    },
    tabText: {
        fontSize: 13,
        color: "#6c757d",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#fff",
    },
    chartCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    legendColor: {
        width: 12,
        height: 3,
        borderRadius: 2,
        marginRight: 6,
    },
    legendText: {
        fontSize: 12,
        color: '#495057',
    },
});