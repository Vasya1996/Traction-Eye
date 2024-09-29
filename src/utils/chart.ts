import { ChartData } from "@/types";

export const updateChartPnlData = (chartData?: ChartData[]): ChartData[] => {
    if(!chartData || chartData.length === 0) {
        return [];
    }

    const firstPointNetWorth = chartData[0].net_worth!;

    return chartData.map((data, index) => {
        if(index === 0) {
            return data;
        }
        const pnl_usd = firstPointNetWorth ? data.net_worth! - firstPointNetWorth : data.net_worth;
        const pnl_percentage = (firstPointNetWorth && pnl_usd) ? pnl_usd / firstPointNetWorth  * 100 : (pnl_usd ? 100 : 0);

        return {
            ...data,
            pnl_percentage,
            pnl_usd: pnl_usd ?? 0,
        }
    });
}

export const updateAssetChartPnlData = (chartData?: ChartData[]): ChartData[] => {
    if(!chartData || chartData.length === 0) {
        return [];
    }

    const firstPointNetWorth = chartData[0].total_price!;

    return chartData.map((data, index) => {
        if(index === 0) {
            return data;
        }
        const pnl_usd = firstPointNetWorth ? data.total_price! - firstPointNetWorth : data.total_price;
        const pnl_percentage = (firstPointNetWorth && pnl_usd) ? pnl_usd / firstPointNetWorth  * 100 : (pnl_usd ? 100 : 0);

        return {
            ...data,
            pnl_percentage,
            pnl_usd: pnl_usd ?? 0,
        }
    });
}