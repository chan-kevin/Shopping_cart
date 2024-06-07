import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { signUp } from "../../store/userSlice";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = () => {
    dispatch(signUp({ username: username, password: password }));
  };

  return (
    <div>
      <input
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      <input
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default Users;
