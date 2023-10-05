import { Investor } from "./investor.model";
import { Payment } from "./payment.model";

export interface Investment {
    id?: string;
    investor?: Investor;
    investorId?: string;
    project?: string;
    typology?: string;
    unitNumber?: string;
    price?: number;
    commissionPercentage?: number;
    payments?: Payment[];
}