import { observer } from "mobx-react-lite";
import "./InvestorForm.scss";
import { Investor } from "../../../../models/investor.model";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  addInvestor,
  editInvestor,
  getInvestorDetails,
} from "../../../../api/investor";
import { Loader } from "../../../../components/loader/Loader";

export const InvestorForm = observer(() => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [investor, setInvestor] = useState<Investor>({});

  const submit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (investor.id) {
        await editInvestor(investor);
      } else {
        await addInvestor(investor);
      }
      setIsSubmitting(false);
      toast.success("Investor saved");
      navigate("/investors");
    } catch (e) {
      setIsSubmitting(false);
      toast.error("Error saving investor");
    }
  };

  const loadInvestor = async (investorId: string) => {
    setIsLoading(true);
    try {
      const investor = await getInvestorDetails(investorId);
      setInvestor(investor);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Error loading investor");
    }
  };

  const handleChange = (e: any, field: string) => {
    setInvestor({ ...investor, [field]: e.target.value });
  };

  useEffect(() => {
    if (params.investorId) {
      loadInvestor(params.investorId);
    }
  }, [params.investorId]);

  return (
    <div className="InvestorForm container d-flex flex-column align-items-center">
      <h1 className="fs-3">{investor?.id ? "Edit" : "Add"} Investor</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form className="w-100">
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              aria-describedby="nameHelp"
              required
              onChange={(e) => handleChange(e, "name")}
              value={investor?.name}
            />
            <div id="nameHelp" className="form-text">
              Name of the investor
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="tsavoriteNumberInput" className="form-label">
              Tsavorite Number
            </label>
            <input
              type="text"
              className="form-control"
              id="tsavoriteNumberInput"
              aria-describedby="tsavoriteNumberHelp"
              onChange={(e) => handleChange(e, "tsavoriteNumber")}
              value={investor?.tsavoriteNumber}
            />
            <div id="tsavoriteNumberHelp" className="form-text">
              Useful in cases where investors have the same name
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
