import React from "react";

export const useLoginProps = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };

  return { hidePassword, togglePassword };
};
