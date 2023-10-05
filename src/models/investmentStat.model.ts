import { Investment } from "./investment.model";
import { Investor } from "./investor.model";

export interface InvestmentStat {
    investor?: Investor;
    investment?: Investment;
    totalPayments?: number;
    percentagePaid?: number;
    thisMonthPaymentsTotal?: number;
    thisMonthCommission?: number;
    balanceToTwentyPercent?: number;
}