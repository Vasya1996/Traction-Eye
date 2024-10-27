import { ChartData } from "@/types";

export const updateChartPnlData = (chartData?: ChartData[]): ChartData[] => {
    if(!chartData || chartData.length === 0) {
        return [];
    }

    const firstPointNetWorth = chartData[0]?.net_worth;

    if(!Number.isFinite(firstPointNetWorth)) {
        return [];
    }

    return chartData.map((data, index) => {
        if(index === 0) {
            return data;
        }
        const pointNetWorth = data?.net_worth ?? 0;

        const pnl_usd = firstPointNetWorth ? pointNetWorth - firstPointNetWorth : pointNetWorth ?? 0;
        const pnl_percentage = (firstPointNetWorth && pnl_usd) ? pnl_usd / firstPointNetWorth  * 100 : (pnl_usd ? 100 : 0);

        return {
            ...data,
            pnl_percentage: Number.isFinite(pnl_percentage) ? pnl_percentage : 0,
            pnl_usd: Number.isFinite(pnl_usd) ? pnl_usd : 0,
        }
    });
}

export const updateAssetChartPnlData = (chartData?: ChartData[]): ChartData[] => {
    if(!chartData || chartData.length === 0) {
        return [];
    }

    const firstPointNetWorth = chartData[0]?.total_price;

    if(!Number.isFinite(firstPointNetWorth)) {
        return [];
    }

    return chartData.map((data, index) => {
        if(index === 0) {
            return data;
        }
        const pointTotalPrice = data?.total_price ?? 0;

        const pnl_usd = firstPointNetWorth ? pointTotalPrice - firstPointNetWorth : pointTotalPrice;
        const pnl_percentage = (firstPointNetWorth && pnl_usd) ? pnl_usd / firstPointNetWorth  * 100 : (pnl_usd ? 100 : 0);

        return {
            ...data,
            pnl_percentage: Number.isFinite(pnl_percentage) ? pnl_percentage : 0,
            pnl_usd: Number.isFinite(pnl_usd) ? pnl_usd : 0,
        }
    });
}