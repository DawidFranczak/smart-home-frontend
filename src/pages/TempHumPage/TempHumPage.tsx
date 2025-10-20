import {useParams} from "react-router-dom";
import useTempHumQuery from "../../hooks/queries/useTempHumQuery.tsx"
import LoadingAnimation from "../../components/ui/LoadingAnimation/LoadingAnimation.tsx";
import PageContainer from "../../components/ui/containers/PageContainer/PageContainer.tsx";
import PageHeader from "../../components/ui/Headers/PageHeader/PageHeader.tsx";
import ButtonContainer from "../../components/ui/containers/ButtonContainer/ButtonContainer.tsx";
import StyledLink from "../../components/ui/StyledLink/StyledLink.tsx";
import WifiStrength from "../../components/ui/WiFiStrength/WiFiStrength.tsx";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import useTempHumHistoryQuery from "../../hooks/queries/useTempHumHistoryQuery.tsx";
import {SyntheticEvent, useState} from "react";
import { DateRangePicker, Panel, Grid, Row, Col } from 'rsuite';
import {DateRange} from "rsuite/DateRangePicker";
import formatDate from "../../utils/formatDate.tsx";

export default function TempHumPage (){
    const sensor_id:number = parseInt(useParams().id as string)
    const {tempHumData} = useTempHumQuery(sensor_id)
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>( null);
    const {tempHumHistoryData} = useTempHumHistoryQuery(sensor_id,startDate,endDate)

    const prepareChartData = () => {
        if (!tempHumHistoryData?.temperature?.chart_data || !tempHumHistoryData?.humidity?.chart_data) {
            return [];
        }

        const tempData = tempHumHistoryData.temperature.chart_data;
        const humData = tempHumHistoryData.humidity.chart_data;

        const mergedData = tempData.map((tempItem: any, index: number) => {
            const humItem = humData[index];

            const dataPoint: any = {
                timestamp: tempItem.timestamp,
            };

            if (tempItem.value !== null && tempItem.value !== undefined) {
                dataPoint.temperature = tempItem.value;
            }

            if (humItem?.value !== null && humItem?.value !== undefined) {
                dataPoint.humidity = humItem.value;
            }

            return dataPoint;
        }).filter((item: any) => item.temperature !== undefined || item.humidity !== undefined);

        return mergedData;
    };

    const chartData = prepareChartData();

    if (!tempHumData) return <LoadingAnimation size="xlarge" type="spinner" glow={true}/>;

    function test(value: DateRange|null, _:SyntheticEvent) {
        if (! value) return;
        setStartDate(formatDate(value[0] as Date,"YYYY-MM-DD"));
        setEndDate(formatDate(value[1] as Date,"YYYY-MM-DD"));
    }

    const StatCard = ({ title, value, unit, color, icon }: { title: string; value: number | null | undefined; unit: string; color: string; icon: string }) => (
        <Panel
            bordered
            style={{
                background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
                borderColor: `${color}40`,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'default'
            }}
            bodyFill
        >
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
                <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '8px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {title}
                </div>
                <div style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: color,
                    marginBottom: '4px'
                }}>
                    {value !== null && value !== undefined ? value.toFixed(1) : '--'}
                </div>
                <div style={{ fontSize: '14px', color: '#999', fontWeight: 500 }}>{unit}</div>
            </div>
        </Panel>
    );

    const AggregationSection = () => {
        const tempAgg = tempHumHistoryData?.temperature?.aggregation_data;
        const humAgg = tempHumHistoryData?.humidity?.aggregation_data;

        return (
            <div style={{ margin: '30px 0' }}>
                <h3 style={{
                    marginBottom: '20px',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#333'
                }}>
                    Statystyki dla wybranego okresu
                </h3>

                <Grid fluid>
                    <Row gutter={16} style={{ marginBottom: '20px' }}>
                        <Col xs={24} sm={12} md={8}>
                            <StatCard
                                title="Średnia temperatura"
                                value={tempAgg?.avg}
                                unit="°C"
                                color="#82ca9d"
                                icon="🌡️"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <StatCard
                                title="Maksymalna temperatura"
                                value={tempAgg?.max}
                                unit="°C"
                                color="#ff6b6b"
                                icon="🔥"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <StatCard
                                title="Minimalna temperatura"
                                value={tempAgg?.min}
                                unit="°C"
                                color="#4dabf7"
                                icon="❄️"
                            />
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8}>
                            <StatCard
                                title="Średnia wilgotność"
                                value={humAgg?.avg}
                                unit="%"
                                color="#8884d8"
                                icon="💧"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <StatCard
                                title="Maksymalna wilgotność"
                                value={humAgg?.max}
                                unit="%"
                                color="#339af0"
                                icon="🌊"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <StatCard
                                title="Minimalna wilgotność"
                                value={humAgg?.min}
                                unit="%"
                                color="#91a7ff"
                                icon="☁️"
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    };
    console.log(tempHumData)
    return (
        <PageContainer>
            <PageHeader title={tempHumData.name}>
                <ButtonContainer>
                    <StyledLink type="fancy" to={`/button/${tempHumData.id}/settings/`}>
                        Ustawienia urządzenia
                    </StyledLink>
                    <WifiStrength strength={tempHumData.is_online?tempHumData.wifi_strength:-100} size="large"/>
                </ButtonContainer>
            </PageHeader>

            <div style={{ marginBottom: '20px' }}>
                <DateRangePicker
                    format="MM/dd/yyyy"
                    character=" – "
                    onChange={test}
                    style={{ width: '100%', maxWidth: '400px' }}
                    placeholder="Wybierz zakres dat"
                />
            </div>

            <div style={{padding: '20px'}}>
                {!tempHumHistoryData ? (
                    <LoadingAnimation size="large" type="spinner" glow={true}/>
                ) : (
                    <>
                       {chartData.length > 0 ? (
                            <Panel
                                bordered
                                style={{
                                    marginTop: '20px',
                                    borderRadius: '12px',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{
                                        marginBottom: '20px',
                                        fontSize: '20px',
                                        fontWeight: 600,
                                        color: '#333'
                                    }}>
                                        Wykres historyczny
                                    </h3>
                                    <div style={{width: '100%', height: '500px'}}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                                <XAxis
                                                    dataKey="timestamp"
                                                    tickFormatter={(value) => formatDate(value,"DD/MM HH")}
                                                    stroke="#666"
                                                />
                                                <YAxis
                                                    yAxisId="right"
                                                    orientation="right"
                                                    stroke="#8884d8"
                                                    label={{ value: 'Wilgotność (%)', angle: 90, position: 'insideRight' }}
                                                />
                                                <YAxis
                                                    yAxisId="left"
                                                    orientation="left"
                                                    stroke="#82ca9d"
                                                    label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }}
                                                />
                                                <Tooltip
                                                    labelFormatter={(value) => formatDate(value,"DD/MM HH:MM:SS")}
                                                    formatter={(value: number) => value.toFixed(2)}
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                    }}
                                                />
                                                <Legend />
                                                <Line
                                                    yAxisId="left"
                                                    type="monotone"
                                                    dataKey="humidity"
                                                    stroke="#8884d8"
                                                    strokeWidth={2}
                                                    name="Wilgotność (%)"
                                                    connectNulls={false}
                                                    dot={false}
                                                />
                                                <Line
                                                    yAxisId="right"
                                                    type="monotone"
                                                    dataKey="temperature"
                                                    stroke="#82ca9d"
                                                    strokeWidth={2}
                                                    name="Temperatura (°C)"
                                                    connectNulls={false}
                                                    dot={false}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Panel>
                        ) : (
                            <Panel bordered style={{ marginTop: '20px', borderRadius: '12px' }}>
                                <div style={{textAlign: 'center', padding: '40px'}}>
                                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                                    <p style={{ fontSize: '16px', color: '#666' }}>Brak danych dla wybranego zakresu dat</p>
                                </div>
                            </Panel>
                        )}
                        {tempHumHistoryData?.temperature?.aggregation_data &&
                            tempHumHistoryData?.humidity?.aggregation_data && (
                                <AggregationSection />
                            )}
                    </>
                )}
            </div>

        </PageContainer>
    )
}