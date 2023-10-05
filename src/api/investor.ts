import { Investor } from "../models/investor.model";
import { http } from "./http";

export const addInvestor = async (investor: Investor) => {
    return http.post<Investor>('investors', investor);
}

export const editInvestor = async (investor: Investor) => {
    return http.put<Investor>(`investors/${investor?.id}`, investor);
}

export const deleteInvestor = async (investor: Investor) => {
    return http.delete<Investor>(`investors/${investor?.id}`);
}

export const getInvestors = async (): Promise<Investor[]> => {
    return http.get<Investor[]>('investors');
};

export const getInvestorDetails = async (investorId: string): Promise<Investor> => {
    return http.get<Investor>(`investors/${investorId}`);
};