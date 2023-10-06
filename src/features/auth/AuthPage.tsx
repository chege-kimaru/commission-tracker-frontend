import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "success") {
      navigate("/");
    } else {
      setAuthFailed(true);
      setLoading(false);
    }
  }, [window.location.search]);

  return isLoading ? (
    <div>Authenticating...</div>
  ) : authFailed ? (
    <div>Authentication failed</div>
  ) : (
    <></>
  );
};
