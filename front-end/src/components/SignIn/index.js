import React, { useState, useEffect } from "react";
import Input from "../../reuseble/input";
import Layout from "../Layout";
import { isUserLoggedIn, login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import validator from "validator";

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailValidation, setemailValidation] = useState("");
  const [passValidation, setpassValidation] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (email === "") {
      setemailValidation("*email is requried");
    } else if (!validator.isEmail(email)) {
      setemailValidation(" Enter valid Email!");
    }
    if (password === "") {
      setpassValidation(true);
    }
    if (email !== "" && password !== "") {
      const user = {
        email,
        password,
      };
      const res = await dispatch(login(user));
    }
  };

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Layout className="text-center">
        <div className="row m-0 d-flex justify-content-center pt-5 mt-5">
          <form className="col-md-6 col sm-col-12">
            <Input
              type="text"
              placeholder="please enter email"
              label="Email"
              value={email}
              onChange={(e) => {
                {
                  setemail(e.target.value);
                  setemailValidation("");
                }
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
                {
                  setpassword(e.target.value);
                  setpassValidation(false);
                }
              }}
            />
            {passValidation && (
              <p className="text-danger">*password requried</p>
            )}

            {/* {auth.error !== "" && <p>{auth.error}</p>} */}

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

export default SignIn;
