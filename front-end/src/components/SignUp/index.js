import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signup } from "../../actions";
import Input from "../../reuseble/input";
import Layout from "../Layout";
import validator from "validator";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [fnameValidation, setfnameValidation] = useState(false);
  const [lnameValidation, setlnameValidation] = useState(false);
  const [emailValidation, setemailValidation] = useState("");
  const [passwordValidation, setpasswordValidation] = useState(false);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let history = useHistory();

  const onSubmit = async () => {
    if (firstName === "") {
      setfnameValidation(true);
    }
    if (lastName === "") {
      setlnameValidation(true);
    }
    if (email === "") {
      setemailValidation("*email is requried");
    } else if (!validator.isEmail(email)) {
      setemailValidation(" Enter valid Email!");
    }
    if (password === "") {
      setpasswordValidation(true);
    }
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      const user = {
        firstName,
        lastName,
        email,
        password,
      };
      await dispatch(signup(user));
      history.push("/");
    }
  };

  return (
    <div>
      <Layout className="text-center">
        <div className="row m-0 d-flex justify-content-center pt-5 mt-5">
          <form className="col-md-6 col sm-col-12">
            <Input
              type="text"
              placeholder="please enter first name"
              label="First Name"
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
                setfnameValidation(false);
              }}
            />
            {fnameValidation && (
              <p className="text-danger">*first name is requried</p>
            )}
            <Input
              type="text"
              placeholder="please enter Last name"
              label="Last Name"
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
                setlnameValidation(false);
              }}
            />
            {lnameValidation && (
              <p className="text-danger">*last name is requried</p>
            )}
            <Input
              type="text"
              placeholder="please enter email"
              label="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
                setemailValidation(true);
              }}
            />
            {emailValidation && (
              <p className="text-danger">{emailValidation}</p>
            )}
            <Input
              type="password"
              placeholder="please enter password"
              label="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
                setpasswordValidation(false);
              }}
            />
            {passwordValidation && (
              <p className="text-danger">*password is requried</p>
            )}
            <button
              type="button"
              onClick={onSubmit}
              class="btn btn-primary mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default SignUp;
