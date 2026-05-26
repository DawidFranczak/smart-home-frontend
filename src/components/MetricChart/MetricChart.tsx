import {useMemo} from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import IMetricSeries from "../../interfaces/IMetricSeries.ts";
import styles from "./MetricChart.module.css"
import {useTranslation} from "react-i18next";
import convertUtcToTimezone from "../../utils/convertUtcToTimezone.ts";

function prepareDynamicData(series: IMetricSeries[]) {
    const dataMap: { [key: string]: any } = {};
    series.forEach(s => {
        s.data?.forEach(item => {
            const ts = convertUtcToTimezone(item.timestamp);
            if (!dataMap[ts]) dataMap[ts] = { timestamp: ts};
            dataMap[ts][s.key] = item.value.toFixed(2);
        });
    });

    return Object.values(dataMap).sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
}
interface IProps {
    series: IMetricSeries[];
}

export default function MetricChart({ series }: IProps) {
    const chartData = useMemo(() => prepareDynamicData(series), [series]);
    const hasLeftAxis = series.some(s => s.yAxisSide === 'left' && s.data?.length > 1);
    const hasRightAxis = series.some(s => s.yAxisSide === 'right' && s.data?.length > 1);
    const {t} = useTranslation();
    if (!hasLeftAxis && !hasRightAxis) return (
        <div className={styles.emptyContainer}>
            <span className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>{t("measurementHistoryManager.noDataTitle")}</p>
            <p className={styles.emptyText}>{t("measurementHistoryManager.noData")}</p>
        </div>
    )

    return (
        <div className={styles.chartShell}>
            <ResponsiveContainer width="100%" height="100%" className={styles.chart}>
                <LineChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
                    <defs>
                        {series.map(s => (
                            <linearGradient key={s.key} id={`metric-${s.key}`} x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor={s.color} stopOpacity={0.55} />
                                <stop offset="100%" stopColor={s.color} stopOpacity={1} />
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray="4 8" stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
                    <XAxis
                        dataKey="timestamp"
                        interval="preserveStartEnd"
                        minTickGap={30}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: 'rgba(148, 163, 184, 0.18)' }}
                    />

                    {hasLeftAxis && (
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: 'rgba(148, 163, 184, 0.18)' }}
                        />
                    )}

                    {hasRightAxis && (
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: 'rgba(148, 163, 184, 0.18)' }}
                        />
                    )}

                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(5, 7, 11, 0.94)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '12px',
                            boxShadow: '0 18px 42px rgba(0, 0, 0, 0.32)',
                            color: '#f8fafc'
                        }}
                        labelStyle={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 700 }}
                        itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                    />
                    <Legend
                        iconType="circle"
                        wrapperStyle={{ color: '#cbd5e1', fontSize: '12px', paddingTop: '10px' }}
                    />

                    {series.map(s => (
                        s.data?.length > 1 && (
                            <Line
                                key={s.key}
                                yAxisId={s.yAxisSide}
                                type="monotone"
                                dataKey={s.key}
                                name={s.label}
                                stroke={`url(#metric-${s.key})`}
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 5, strokeWidth: 0, fill: s.color }}
                                connectNulls
                            />
                        )
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
