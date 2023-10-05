import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";

export const Navbar = observer(() => {
  const {
    commonStore: { navOpen, openNav, closeNav },
  } = useStore();

  const navigate = useNavigate();

  const navigateTo = (e: any, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <nav className="Navbar navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <button
          className="btn btn-primary menu-btn"
          onClick={navOpen ? closeNav : openNav}
        >
          <i className="fa fa-solid fa-bars"></i>
        </button>
        <a
          onClick={(e) => navigateTo(e, "/")}
          href="/"
          className="nav-link navbar-brand mb-0 h1 text-white"
        >
          Commission Tracker
        </a>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <button
              className="dropdown-toggle btn btn-primary text-white"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-plus me-2"></i> Add
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a
                  className="dropdown-item"
                  href="/payments/new"
                  onClick={(e) => navigateTo(e, "/payments/new")}
                >
                  Add payment
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="/investments/new"
                  onClick={(e) => navigateTo(e, "/investments/new")}
                >
                  Add investment
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="/investors/new"
                  onClick={(e) => navigateTo(e, "/investors/new")}
                >
                  Add investor
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
});
