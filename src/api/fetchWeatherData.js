import axios from "axios";

const INFLUX_URL = "https://us-east-1-1.aws.cloud2.influxdata.com/api/v2/query?orgID=bffac43ed4d006d6";
const TOKEN = "FZs2ly9wGBzLXIL1zj-ZAExYNpYzqm6WZywgPTxxB-mWeP1hBj7O_lYaxhF6pXBU31NbOJlRfHsPLbtDUtouwA==                                ";

export async function fetchWeatherData(fieldName) {
    console.log(`Fetching ${fieldName} data...`);

    const fluxQuery = `from(bucket: "TEMP_HUM")
  |> range(start: -1h)
  |> filter(fn: (r) => r["_measurement"] == "weather")
  |> filter(fn: (r) => r["_field"] == "${fieldName}")
  |> last()`;

    try {
        console.log(`Sending query for ${fieldName}...`);

        const res = await axios.post(INFLUX_URL, fluxQuery, {
            headers: {
                "Authorization": `Token ${TOKEN}`,
                "Content-Type": "application/vnd.flux",
                "Accept": "application/csv",
                "User-Agent": "ReactNativeWeatherApp/1.0"
            },
            timeout: 15000,
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            }
        });

        console.log(`Response status for ${fieldName}:`, res.status);

        if (!res.data || res.data.trim() === '') {
            console.log(`No ${fieldName} data found`);
            return null;
        }

        console.log(`Raw response for ${fieldName}:`, res.data.substring(0, 100) + '...');

        const lines = res.data.trim().split("\n");

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line && !line.startsWith(',result') && !line.startsWith('_result')) {
                const cols = line.split(",");

                if (cols.length >= 9 && cols[7]?.trim() === fieldName) {
                    const result = {
                        value: cols[6]?.trim(),
                        time: cols[5]?.trim(),
                        field: cols[7]?.trim(),
                        measurement: cols[8]?.trim()
                    };
                    console.log(`Parsed ${fieldName} data:`, result);
                    return result;
                }
            }
        }

        console.log(`No valid data found for ${fieldName}`);
        return null;

    } catch (err) {
        console.error(`Error fetching ${fieldName}:`, err.message);
        console.error('Error details:', err);

        if (err.code) {
            console.error('Error code:', err.code);
        }
        if (err.response) {
            console.error('Response error:', err.response.status, err.response.data);
        }

        return null;
    }
}

// Individual export functions for each metric
export const fetchHumidity = () => fetchWeatherData('humidity');
export const fetchTemperature = () => fetchWeatherData('temperature');
export const fetchPressure = () => fetchWeatherData('pressure');
export const fetchAltitude = () => fetchWeatherData('altitude');
export const fetchRain = () => fetchWeatherData('rain');