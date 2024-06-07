import React from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const User = () => {
  const sessionUser = useSelector((state: RootState) => state.users.username);

  return (
    <>
      <div>Welcome {sessionUser}</div>
    </>
  );
};

export default User;
