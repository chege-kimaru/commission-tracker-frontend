import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Investor } from "../../../../models/investor.model";
import { Loader } from "../../../../components/loader/Loader";
import { deleteInvestor, getInvestors } from "../../../../api/investor";
import { withSwal } from "react-sweetalert2";

export const InvestorsPage = observer(
  withSwal(({ swal }: { swal: any }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [investors, setInvestors] = useState<Investor[]>([]);

    const loadInvestors = async () => {
      setIsLoading(true);
      try {
        const investors = await getInvestors();
        setInvestors(investors);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
        toast.error("Error loading investors");
      }
    };

    const handleDeleteInvestor = async (investor: Investor) => {
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
              await deleteInvestor(investor);
              toast.success("Deleted successfully");
              loadInvestors();
            } catch (e) {
              toast.error("Deleting failed");
            }
          }
        });
    };

    useEffect(() => {
      loadInvestors();
    }, []);

    return (
      <section>
        <div className="d-flex">
          <h1 className="fs-3 flex-fill">Investors</h1>
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
                <th>Tsavorite Number</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {investors.map((investor) => (
                <tr key={investor?.id}>
                  <td>{investor.name}</td>
                  <td>{investor.tsavoriteNumber}</td>
                  <td>
                    <button
                      className="btn btn-light"
                      onClick={() => navigate(`edit/${investor?.id}`)}
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteInvestor(investor)}
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
