import { observer } from "mobx-react-lite";
import { Payment } from "../../../../models/payment.model";
import { Investment } from "../../../../models/investment.model";
import {
  addPayment,
  editPayment,
  getPaymentDetails,
} from "../../../../api/payment";
import { getInvestments } from "../../../../api/investment";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../../components/loader/Loader";

export const PaymentForm = observer(() => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payment, setPayment] = useState<Payment>({});
  const [investments, setInvestments] = useState<Investment[]>([]);

  const submit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (payment.id) {
        await editPayment(payment);
      } else {
        await addPayment(payment);
      }
      setIsSubmitting(false);
      toast.success("Payment saved");
      navigate("/payments");
    } catch (e: any) {
      setIsSubmitting(false);
      toast.error("Error saving payment");
    }
  };

  const loadInvestments = async () => {
    try {
      const investments = await getInvestments();
      setInvestments(investments);
    } catch (e) {
      toast.error("Error loading investments. Please refresh page");
    }
  };

  const loadPayment = async (paymentId: string) => {
    setIsLoading(true);
    try {
      const payment = await getPaymentDetails(paymentId);
      setPayment(payment);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Error loading payment");
    }
  };

  const handleChange = (e: any, field: string) => {
    setPayment({ ...payment, [field]: e.target.value });
  };

  useEffect(() => {
    loadInvestments();
  }, []);

  useEffect(() => {
    if (params.paymentId) {
      loadPayment(params.paymentId);
    }
  }, [params.paymentId]);

  return (
    <div className="InvestorForm container d-flex flex-column align-items-center">
      <h1 className="fs-3">{payment?.id ? "Edit" : "Add"} Payment</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form className="w-100">
          <div className="mb-3">
            <label htmlFor="inputInvestment" className="form-label">
              Investment
            </label>
            <select
              className="form-select"
              id="inputInvestment"
              required
              onChange={(e) => handleChange(e, "investmentId")}
              value={payment?.investmentId}
            >
              <option value="">Select investment</option>
              {investments?.map((investment) => (
                <option key={investment.id} value={investment.id}>
                  {investment.investor?.name} ({investment.project || "-"}) (
                  {investment.typology || "-"}) ({investment.unitNumber || "-"})
                </option>
              ))}
            </select>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <label htmlFor="amountInput" className="form-label">
                Amount
              </label>
              <div className="input-group">
                <span className="input-group-text">KES</span>
                <input
                  type="number"
                  className="form-control"
                  id="amountInput"
                  onChange={(e) => handleChange(e, "amount")}
                  value={payment?.amount}
                />
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="dateinput" className="form-label">
                Date of payment
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa fa-calendar"></i>
                </span>
                <input
                  type="date"
                  className="form-control"
                  id="dateinput"
                  onChange={(e) => handleChange(e, "paidOn")}
                  value={payment?.paidOn ? payment?.paidOn + "" : undefined}
                />
              </div>
            </div>
          </div>
          <button
            disabled={isSubmitting}
            onClick={submit}
            type="submit"
            className="btn btn-primary"
          >
            {isSubmitting && (
              <i className="fa fa-circle-notch fa-spin me-3"></i>
            )}
            Save
          </button>
        </form>
      )}
    </div>
  );
});
