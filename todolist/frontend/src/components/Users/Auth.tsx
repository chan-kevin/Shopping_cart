import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { signup } from "../../store/userSlice";
import { login } from "../../store/userSlice";
import "./Auth.css";
import User from "./User";

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: RootState) => state.users.accessToken);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginUsername, setLoginusername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const handleSignUp = () => {
    dispatch(signup({ username: username, password: password }));
  };

  const handleLogin = () => {
    dispatch(login({ username: loginUsername, password: loginPassword }));
  };

  return (
    <>
      {!loginUser ? (
        <>
          <div className="auth-container">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              name="username"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              className="input"
            />

            <label htmlFor="password">Password</label>
            <input
              value={password}
              name="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="input"
            />
            <button onClick={handleSignUp} className="auth-btn btn">
              Sign Up
            </button>
          </div>

          <div className="auth-container">
            <label htmlFor="loginUsername">Username</label>
            <input
              value={loginUsername}
              name="loginUsername"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLoginusername(e.target.value)
              }
              className="input"
            />

            <label htmlFor="loginPassword">Password</label>
            <input
              value={loginPassword}
              name="loginPassword"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLoginPassword(e.target.value)
              }
              className="input"
            />
            <button onClick={handleLogin} className="auth-btn btn">
              Login
            </button>
          </div>
        </>
      ) : (
        <User />
      )}
    </>
  );
};

export default Auth;
