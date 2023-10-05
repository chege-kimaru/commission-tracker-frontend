import { Investment } from "./investment.model";

export interface Payment {
    id?: string;
    investment?: Investment;
    investmentId?: string;
    paidOn?: Date;
    amount?: number;
}