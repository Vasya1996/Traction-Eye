import { LineChart, Line, ResponsiveContainer } from "recharts";

export interface ChartProps {
  worth_chart: Array<[number, number]>;
}

export default function Chart(props: ChartProps) {
	const transformed_chart = props.worth_chart.map((item) => ({
		price: item[1],
	}));

	return (
		<ResponsiveContainer width="100%" height={50}>
			<LineChart data={transformed_chart}>
				<Line type="monotone" dataKey="price" dot={false} stroke="#82ca9d" />
			</LineChart>
		</ResponsiveContainer>
	);
}
