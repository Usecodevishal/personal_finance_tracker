import React from "react";
import Header from "../components/Header";
import SingupSigninComponent from "../components/SignupSignin";

const Signup = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">{<SingupSigninComponent/>}</div>
    </div>
  );
};

export default Signup;
