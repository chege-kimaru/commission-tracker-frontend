import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Investment } from "../../../../models/investment.model";
import { deleteInvestment, getInvestments } from "../../../../api/investment";
import { toast } from "react-toastify";
import { Loader } from "../../../../components/loader/Loader";
import { formatNum } from "../../../../utils";
import { withSwal } from "react-sweetalert2";

export const InvestmentsPage = observer(
  withSwal(({ swal }: { swal: any }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [investments, setInvestments] = useState<Investment[]>([]);

    const loadInvestments = async () => {
      setIsLoading(true);
      try {
        const investments = await getInvestments();
        setInvestments(investments);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        toast.error("Error loading investments");
      }
    };

    const handleDeleteInvestment = async (investment: Investment) => {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete!",
          cancelButtonText: "No, cancel!",
        })
        .then(async (result: any) => {
          if (result.isConfirmed) {
            try {
              await deleteInvestment(investment);
              toast.success("Deleted successfully");
              loadInvestments();
            } catch (e) {
              toast.error("Deleting failed");
            }
          }
        });
    };

    useEffect(() => {
      loadInvestments();
    }, []);

    return (
      <section>
        <div className="d-flex">
          <h1 className="fs-3 flex-fill">Investments</h1>
          <button className="btn btn-primary" onClick={() => navigate("new")}>
            <i className="fa fa-plus me-2"></i> Add
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table table-responsive mt-4">
            <thead>
              <tr>
                <th>Investor</th>
                <th>Project</th>
                <th>Price</th>
                <th>%</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr key={investment?.id}>
                  <td>{investment.investor?.name}</td>
                  <td>
                    <p className="my-0">{investment.project}</p>
                    <p className="my-0">
                      {investment.typology}
                      {investment?.unitNumber
                        ? `(${investment?.unitNumber})`
                        : ""}
                    </p>
                  </td>
                  <td>KES {formatNum(investment.price)}</td>
                  <td>{investment.commissionPercentage}%</td>
                  <td>
                    <button
                      className="btn btn-light"
                      onClick={() => navigate(`edit/${investment?.id}`)}
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteInvestment(investment)}
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
