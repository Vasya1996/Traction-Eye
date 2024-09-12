import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

interface ChartMouseEvent {
    activeTooltipIndex?: number;
    activeLabel?: string | number;  // Use more specific type if known
    activeCoordinate?: { x: number; y: number };
    // Add other properties you expect
}

export interface ChartProps {
    worth_chart: Array<[number, number]>;
    onMouseMove?: (data: ChartMouseEvent) => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    highlightedIndex?: number;
}

export default function Chart(props: ChartProps) {
    const transformed_chart = props.worth_chart.map((item, index) => ({
        price: item[1],
        isHighlighted: index === props.highlightedIndex, // Add a flag to indicate if the point is highlighted
    }));

    return (
        <ResponsiveContainer width="100%" height={120}>
            <LineChart
                data={transformed_chart}
                onMouseMove={props.onMouseMove}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
            >
                <Line
                    type="monotone"
                    dataKey="price"
                    dot={false}
                    stroke="#82ca9d"
                    strokeOpacity={props.highlightedIndex !== undefined ? 0.7 : 1} // Example: Dim the line if a point is highlighted
                />
                <Tooltip content={<div></div>} />
            </LineChart>
        </ResponsiveContainer>
    );
}
