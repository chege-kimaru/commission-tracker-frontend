import { DashboardPage } from "./features/dashboard/DashboardPage";
import { Navbar } from "./layout/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { InvestmentDetailsPage } from "./features/investment/pages/investment-details/InvestmentDetailsPage";
import { AuthPage } from "./features/auth/AuthPage";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/store";
import { Auth } from "./auth/Auth";
import { Sidebar } from "./layout/sidebar/Sidebar";
import { InvestorForm } from "./features/investor/pages/investor-form/InvestorForm";
import { InvestmentForm } from "./features/investment/pages/investment-form/InvestmentForm";
import { PaymentForm } from "./features/payment/pages/payment-form/PaymentForm";
import { PaymentsPage } from "./features/payment/pages/payments/PaymentsPage";
import { InvestmentsPage } from "./features/investment/pages/investments/InvestmentsPage";
import { InvestorsPage } from "./features/investor/pages/investors/InvestorsPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const App = observer(() => {
  const { authStore } = useStore();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {!authStore.isLoggedIn ? (
        <Auth />
      ) : (
        <section className="App">
          <Navbar />
          <Sidebar />
          <section className="main-layout p-4">
            <Routes>
              <Route path="/" element={<DashboardPage />}></Route>
              <Route
                path="/investment/:id"
                element={<InvestmentDetailsPage />}
              ></Route>
              <Route path="/auth" element={<AuthPage />}></Route>
              <Route path="/investors" element={<InvestorsPage />}></Route>
              <Route path="/investors/new" element={<InvestorForm />}></Route>
              <Route path="/investors/edit/:investorId" element={<InvestorForm />}></Route>
              <Route path="/investments" element={<InvestmentsPage />}></Route>
              <Route
                path="/investments/new"
                element={<InvestmentForm />}
              ></Route>
              <Route
                path="/investments/edit/:investmentId"
                element={<InvestmentForm />}
              ></Route>
              <Route
                path="/investments/:investmentId"
                element={<InvestmentDetailsPage />}
              ></Route>
              <Route path="/payments" element={<PaymentsPage />}></Route>
              <Route path="/payments/new" element={<PaymentForm />}></Route>
              <Route path="/payments/edit/:paymentId" element={<PaymentForm />}></Route>
            </Routes>
          </section>
        </section>
      )}
    </>
  );
});
