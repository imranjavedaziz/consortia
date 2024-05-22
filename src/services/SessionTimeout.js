import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../Context/authContext";

function SessionTimeout({ timeoutInMinutes = 30 }) {
  const { setNavigate } = useAuthContext()
  const [isIdle, setIsIdle] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    let timeoutId;

    // reset the idle state and start the timeout
    const resetIdleState = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("profile_info");
        localStorage.removeItem("access");
        setNavigate(false);
        navigation("/");
      }, timeoutInMinutes * 60 * 1000);
    };

    // reset the idle state on user activity
    const onUserActivity = () => {
      resetIdleState();
    };

    resetIdleState();

    window.addEventListener("mousemove", onUserActivity);
    window.addEventListener("keypress", onUserActivity);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", onUserActivity);
      window.removeEventListener("keypress", onUserActivity);
    };
  }, [isIdle]);

  return null;
}

export default SessionTimeout;
