import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { AuthService } from "./auth.service";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router-dom";

export const Auth = observer(() => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await AuthService.getUser();
        if (user) {
          authStore.setUser(user);
          navigate("/");
        } else {
          throw new Error("User not found");
        }
      } catch (e) {
        await AuthService.login();
      }
    })();
  }, []);

  return <>Authenticating...</>;
});
