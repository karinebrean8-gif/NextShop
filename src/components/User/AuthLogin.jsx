import { api } from "../api/client";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const AuthLogin = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    api.post("/api/login/", {
      username: "test",
      password: "1234",
    }).then((data) => {
      dispatch(loginSuccess({
        user: data.user,
        token: data.access,
      }));
    });
  };

  return (
    <button onClick={handleLogin} className="bg-black text-white p-2">
      Login
    </button>
  );
};

export default AuthLogin;