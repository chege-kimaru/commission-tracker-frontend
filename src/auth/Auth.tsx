import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { AuthService } from "./auth.service";
import { useStore } from "../stores/store";

export const Auth = observer(() => {
  const { authStore } = useStore();

  useEffect(() => {
    (async () => {
      try {
        const user = await AuthService.getUser();
        if (user) {
          authStore.setUser(user);
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
