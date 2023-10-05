import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Investment } from "../../../../models/investment.model";
import {
  addInvestment,
  editInvestment,
  getInvestmentdetails,
} from "../../../../api/investment";
import { Investor } from "../../../../models/investor.model";
import { getInvestors } from "../../../../api/investor";
import { Loader } from "../../../../components/loader/Loader";

export const InvestmentForm = observer(() => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [investment, setInvestment] = useState<Investment>({
    commissionPercentage: 7,
  });
  const [investors, setInvestors] = useState<Investor[]>([]);

  const submit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if(investment.id) {
        await editInvestment(investment);
      } else {
        await addInvestment(investment);
      }
      setIsSubmitting(false);
      toast.success("Investor saved");
      navigate("/investments");
    } catch (e: any) {
      setIsSubmitting(false);
      toast.error("Error saving invetment");
    }
  };

  const loadInvestors = async () => {
    try {
      const investors = await getInvestors();
      setInvestors(investors);
    } catch (e) {
      toast.error("Error loading investors. Please refresh page");
    }
  };

  const loadInvestment = async (investmentId: string) => {
    setIsLoading(true);
    try {
      const investment = await getInvestmentdetails(investmentId);
      setInvestment(investment?.investment!);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Error loading investment");
    }
  };

  const handleChange = (e: any, field: string) => {
    setInvestment({ ...investment, [field]: e.target.value });
  };

  useEffect(() => {
    loadInvestors();
  }, []);

  useEffect(() => {
    if (params.investmentId) {
      loadInvestment(params.investmentId);
    }
  }, [params.investmentId]);

  return (
    <div className="InvestorForm container d-flex flex-column align-items-center">
      <h1 className="fs-3">{investment?.id ? "Edit" : "Add"} Investment</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form className="w-100">
          <div className="mb-3">
            <label htmlFor="inputInvestor" className="form-label">
              Investor
            </label>
            <select
              className="form-select"
              id="inputInvestor"
              required
              onChange={(e) => handleChange(e, "investorId")}
              value={investment?.investorId}
            >
              <option value="">Select Investor</option>
              {investors?.map((investor) => (
                <option key={investor.id} value={investor.id}>
                  {investor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row mb-4">
            <div className="col-4">
              <label htmlFor="projectInput" className="form-label">
                Project
              </label>
              <input
                type="text"
                className="form-control"
                id="projectInput"
                onChange={(e) => handleChange(e, "project")}
                value={investment?.project}
              />
            </div>
            <div className="col-4">
              <label htmlFor="topologyInput" className="form-label">
                Typology
              </label>
              <input
                type="text"
                className="form-control"
                id="topologyInput"
                onChange={(e) => handleChange(e, "typology")}
                value={investment?.typology}
              />
            </div>
            <div className="col-4">
              <label htmlFor="unitInput" className="form-label">
                Unit Number
              </label>
              <input
                type="text"
                className="form-control"
                id="unitInput"
                onChange={(e) => handleChange(e, "unitNumber")}
                value={investment?.unitNumber}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <label htmlFor="priceInput" className="form-label">
                Price
              </label>
              <div className="input-group">
                <span className="input-group-text">KES</span>
                <input
                  type="number"
                  className="form-control"
                  id="priceInput"
                  onChange={(e) => handleChange(e, "price")}
                  value={investment?.price}
                />
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="commissionInput" className="form-label">
                Commission
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="commissionInput"
                  onChange={(e) => handleChange(e, "commissionPercentage")}
                  value={investment?.commissionPercentage}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            onClick={submit}
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
