import { Payment } from "../models/payment.model";
import { http } from "./http";

export const addPayment = async (payment: Payment) => {
    return http.post<Payment>('payments', payment);
}

export const editPayment = async (payment: Payment) => {
    return http.put<Payment>(`payments/${payment?.id}`, payment);
}

export const deletePayment = async (payment: Payment) => {
    return http.delete<Payment>(`payments/${payment?.id}`);
}

export const getPayments = async (): Promise<Payment[]> => {
    return http.get<Payment[]>('payments');
};

export const getPaymentDetails = async (paymentId: string): Promise<Payment> => {
    return http.get<Payment>(`payments/${paymentId}`);
};