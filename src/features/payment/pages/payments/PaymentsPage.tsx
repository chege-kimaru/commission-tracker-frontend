import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Payment } from "../../../../models/payment.model";
import { deletePayment, getPayments } from "../../../../api/payment";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Loader } from "../../../../components/loader/Loader";
import moment from "moment";
import { withSwal } from "react-sweetalert2";

export const PaymentsPage = observer(
  withSwal(({ swal }: { swal: any }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [payments, setPayments] = useState<Payment[]>([]);

    const loadPayments = async () => {
      setIsLoading(true);
      try {
        const payments = await getPayments();
        setPayments(payments);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        toast.error("Error loading payments");
      }
    };

    const handleDeletePayment = async (payment: Payment) => {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete!",
          cancelButtonText: "No, cancel!"
        })
        .then(async (result: any) => {
          if (result.isConfirmed) {
            try {
              await deletePayment(payment);
              toast.success('Deleted successfully');
              loadPayments();
            } catch (e) {
              toast.error("Deleting failed");
            }
          }
        });
    };

    useEffect(() => {
      loadPayments();
    }, []);

    return (
      <section>
        <div className="d-flex">
          <h1 className="fs-3 flex-fill">Payments</h1>
          <button className="btn btn-primary" onClick={() => navigate("new")}>
            <i className="fa fa-plus me-2"></i> Add
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table mt-4 table-responsive">
            <thead>
              <tr>
                <th>Investor</th>
                <th>Investment</th>
                <th>Date</th>
                <th>Amount</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment) => (
                <tr key={payment?.id}>
                  <td>{payment.investment?.investor?.name}</td>
                  <td>{payment.investment?.project}</td>
                  <td>{moment(payment.paidOn).format("do, MMM yyyy")}</td>
                  <td>{payment.amount}</td>
                  <td>
                    <button
                      className="btn btn-light"
                      onClick={() => navigate(`edit/${payment?.id}`)}
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeletePayment(payment)}
                      className="btn btn-light"
                    >
                      <i className="fa fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    );
  })
);
