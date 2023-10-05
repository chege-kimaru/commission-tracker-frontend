import { useParams } from "react-router-dom";
import { InvestmentStat } from "../../../../models/investmentStat.model";
import "./InvestmentDetialsPage.scss";
import { getInvestmentdetails } from "../../../../api/investment";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Loader } from "../../../../components/loader/Loader";
import moment from "moment";
import { formatNum } from "../../../../utils";

export const InvestmentDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [investmentStat, setInvestmentStat] = useState<InvestmentStat>();

  const params = useParams();

  const loadInvestment = async (investmentId: string) => {
    setIsLoading(true);
    try {
      const investment = await getInvestmentdetails(investmentId);
      setInvestmentStat(investment);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Error loading investment");
    }
  };

  useEffect(() => {
    if (params.investmentId) loadInvestment(params.investmentId);
  }, [params]);

  return (
    <section className="InvestmentDetailsPage">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Investment Details */}
          <div className="shadow-sm bg-body rounded d-flex flex-row p-4 align-items-center">
            <div className="d-flex flex-column">
              <p className="fs-5 my-0 fw-bold">
                {investmentStat?.investor?.name}
              </p>
              <p className="fs-6 my-0">{investmentStat?.investment?.project}</p>
              <p className="fs-6 my-0">
                {investmentStat?.investment?.typology} (
                {investmentStat?.investment?.unitNumber || "-"})
              </p>
            </div>
            <p className="ms-5 fw-bold">
              KES {formatNum(investmentStat?.investment?.price)}
            </p>
            <p className="ms-5">
              @ {investmentStat?.investment?.commissionPercentage}% Commission
            </p>
          </div>

          {/* Investment stats */}
          <section className="d-flex flex-row justify-content-center mt-5 flex-wrap">
            <div className="shadow-lg rounded p-3 d-flex flex-column align-items-center w-25 stat">
              <p className="fs-6 text-muted my-0 text-uppercase">
                {moment().format("MMM")} EARNING
              </p>
              <p className="fs-1 my-0 fw-bold">
                <span className="fs-5 fw-normal">KES </span>{" "}
                {formatNum(investmentStat?.thisMonthCommission)}
              </p>
              <p className="fs-6 my-0">
                {investmentStat?.investment?.commissionPercentage}% of KES{" "}
                {formatNum(investmentStat?.thisMonthPaymentsTotal)}
              </p>
            </div>
            <div className="shadow-lg rounded p-3 d-flex flex-column align-items-center w-25 stat ms-5">
              <p className="fs-6 text-muted my-0">PAID</p>
              <p className="fs-1 my-0 fw-bold">
                {formatNum(investmentStat?.percentagePaid)}%
              </p>
              <p className="fs-5 my-0">
                KES {formatNum(investmentStat?.totalPayments)}
              </p>
            </div>
            <div className="shadow-lg rounded p-3 d-flex flex-column align-items-center w-25 stat ms-5">
              <p className="fs-6 text-muted my-0">
                BALANCE <span className="fs-7">TO 20%</span>
              </p>
              <p className="fs-1 my-0 fw-bold">
                {formatNum(
                  20 - (investmentStat?.percentagePaid || 0) < 0
                    ? 0
                    : 20 - (investmentStat?.percentagePaid || 0)
                )}
                %
              </p>
              <p className="fs-5 my-0">
                KES {formatNum(investmentStat?.balanceToTwentyPercent)}
              </p>
            </div>
          </section>

          {/* Payment History */}
          <section className="mt-5">
            <h4 className="fs-5">Payment History</h4>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {
                  investmentStat?.investment?.payments && investmentStat?.investment?.payments?.map((payment) => (
                    <tr key={payment?.id}>
                      <td>{moment(payment?.paidOn).format("DD, MMMM YYYY")}</td>
                      <td>KES {formatNum(payment?.amount)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </section>
        </>
      )}
    </section>
  );
};
