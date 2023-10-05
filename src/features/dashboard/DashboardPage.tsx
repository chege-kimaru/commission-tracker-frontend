import { useNavigate } from "react-router-dom";
import { MonthCommissionStat } from "./components/month-commission-stat/MonthCommissionStat";
import "./DashboardPage.scss";
import { InvestmentStat } from "../../models/investmentStat.model";
import { getInvestmentsStats } from "../../api/investment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatNum } from "../../utils";
import { Loader } from "../../components/loader/Loader";
import moment from "moment";

export const DashboardPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [investmentStats, setInvestmentStats] = useState<InvestmentStat[]>([]);
  const [thisMonthTotalCommission, setThisMonthTotalCommission] =
    useState<number>(0);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const data = await getInvestmentsStats();
      setInvestmentStats(data.investments);
      setThisMonthTotalCommission(data.thisMonthTotalCommission);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Error loading stats");
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <section className="DashboardPage">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <MonthCommissionStat commission={thisMonthTotalCommission} />
          </div>
          <div className="mt-5">
            <table className="table table-hover table-responsive">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>INVESTMENT</th>
                  <th>% PAID</th>
                  <th className="text-uppercase">
                    {moment().format("MMM")} COMMISSION
                  </th>
                </tr>
              </thead>
              <tbody>
                {investmentStats &&
                  investmentStats?.map((investmentStat) => (
                    <tr
                      key={investmentStat?.investment?.id}
                      className={
                        investmentStat?.thisMonthCommission
                          ? "table-success"
                          : investmentStat?.percentagePaid || 0 < 20
                          ? "table-warning"
                          : ""
                      }
                      onClick={() =>
                        navigate(
                          `/investments/${investmentStat?.investment?.id}`
                        )
                      }
                    >
                      <td>{investmentStat?.investor?.name}</td>
                      <td>
                        <p className="m-0">
                          {investmentStat?.investment?.project}
                        </p>
                        <p className="m-0">
                          {investmentStat?.investment?.typology} (
                          {investmentStat?.investment?.unitNumber})
                        </p>
                      </td>
                      <td>{formatNum(investmentStat?.percentagePaid || 0)}%</td>
                      <td>
                        KES{" "}
                        {formatNum(investmentStat?.thisMonthCommission || 0)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};
