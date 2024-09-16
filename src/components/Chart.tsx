import { useState, useEffect } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip, ReferenceLine, XAxis, YAxis} from "recharts";

interface ChartMouseEvent {
    activeTooltipIndex?: number;
    activeLabel?: string | number;  // Use more specific type if known
    activeCoordinate?: { x: number; y: number };
    // Add other properties you expect
}

interface PnlData {
    pnl_percentage: number;
    pnl_usd: number;
}

export interface SelectedPoint { 
    netWorth: number;
    pnlData: PnlData;
    timestamp: number;
}

export interface ChartProps {
    worth_chart: Array<[number, number]>;
    onMouseMove?: (data: ChartMouseEvent) => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onSelectPoint: (point: { netWorth: number, pnlData: PnlData, timestamp: number }) => void;
}

export default function Chart({ worth_chart, onMouseMove, onMouseDown, onMouseUp, onSelectPoint }: ChartProps) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>(undefined);
    const [activeX, setActiveX] = useState<number | null>(null);
    const [activeY, setActiveY] = useState<number | null>(null);

    const transformed_chart = worth_chart.map((item, index) => ({
        timestamp: item[0],
        price: item[1],
        isHighlighted: index === highlightedIndex,
    }));

    useEffect(() => {
        if (isMouseDown) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isMouseDown]);

    const handleChartMouseMove = (data: ChartMouseEvent) => {
        if (data && data.activeLabel !== undefined) {
            const index = data.activeTooltipIndex;
            if (index !== undefined && worth_chart) {

                const chartData = worth_chart[index];
                const pointTimestamp = chartData[0];
                const updatedNetWorth = chartData[1];
                const updatedPnlData = {
                    pnl_percentage: 20,
                    pnl_usd: 1000
                };

                setHighlightedIndex(index);

                setActiveX(pointTimestamp);
                setActiveY(updatedNetWorth);

                onSelectPoint({
                    netWorth: updatedNetWorth,
                    pnlData: updatedPnlData,
                    timestamp: pointTimestamp,
                });

                onMouseMove && onMouseMove(data);
            }
        }
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
        onMouseDown && onMouseDown();
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        onMouseUp && onMouseUp();
    };

    return (
        <ResponsiveContainer width="100%" height={120}>
            <LineChart
                data={transformed_chart}
                onMouseMove={handleChartMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <Line
                    type="monotone"
                    dataKey="price"
                    dot={false}
                    stroke="#82ca9d"
                    strokeOpacity={highlightedIndex !== undefined ? 0.7 : 1} // Example: Dim the line if a point is highlighted
                />

                <XAxis hide dataKey="timestamp" domain={['dataMin', 'dataMax']} />
                <YAxis hide dataKey="price" domain={['auto', 'auto']} />

                {activeX !== null && (
                    <ReferenceLine x={activeX} stroke="#82ca9d" strokeDasharray="3 3" />
                )}
                {activeY !== null && (
                    <ReferenceLine y={activeY} stroke="#82ca9d" strokeDasharray="3 3" />
                )}
                <Tooltip cursor={false} content={<div></div>} />
            </LineChart>
        </ResponsiveContainer>
    );
}
