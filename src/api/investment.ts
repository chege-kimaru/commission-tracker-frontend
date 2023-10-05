import { Investment } from "../models/investment.model";
import { InvestmentStat } from "../models/investmentStat.model";
import { http } from "./http";

export const addInvestment = async (investment: Investment) => {
    return http.post<Investment>('investments', investment);
}

export const editInvestment = async (investment: Investment) => {
    return http.put<Investment>(`investments/${investment?.id}`, investment);
}

export const deleteInvestment = async (investment: Investment) => {
    return http.delete<Investment>(`investments/${investment?.id}`);
}

export const getInvestments = async (): Promise<Investment[]> => {
    return http.get<Investment[]>('investments');
};

export const getInvestmentsStats = async (): Promise<{ thisMonthTotalCommission: number, investments: InvestmentStat[] }> => {
    return http.get<{ thisMonthTotalCommission: number, investments: InvestmentStat[] }>('investments/stats');
};

export const getInvestmentdetails = async (investmentId: string): Promise<InvestmentStat> => {
    return http.get<InvestmentStat>(`investments/${investmentId}`);
};