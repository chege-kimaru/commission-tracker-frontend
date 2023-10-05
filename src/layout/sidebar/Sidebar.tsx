import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";

export const Sidebar = observer(() => {
  const {
    commonStore: { navOpen, closeNav, openNav },
  } = useStore();

  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/", icon: "fa-chart-line" },
    { name: "Payments", path: "/payments", icon: "fa-money-bill-wave" },
    { name: "Investments", path: "/investments", icon: "fa-receipt" },
    { name: "Investors", path: "/investors", icon: "fa-user" },
  ];

  const handleNavClick = (e: any, path: string) => {
    e.preventDefault();
    navigate(path);
    closeNav();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${navOpen ? "sidebar-overlay-show" : ""}`}
        onClick={navOpen ? closeNav : openNav}
      ></div>
      <nav
        className={`sidebar list-group list-group-flush bg-white ${
          navOpen ? "sidebar-show" : ""
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            onClick={(e) => handleNavClick(e, item.path)}
            className="list-group-item list-group-item-action"
          >
            <i className={`fa fa-solid ${item.icon} me-4`}></i>
            {item.name}
          </a>
        ))}
      </nav>
    </>
  );
});
