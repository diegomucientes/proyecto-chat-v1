import React from "react";

const Avatar = ({ user }) => {
  return (
    <>
      <img
        src={user.picture}
        alt={user.name}
        title={user.name}
        className={"avatar"}
      ></img>
    </>
  );
};

export default Avatar;