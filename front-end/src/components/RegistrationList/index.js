import React, { useState, useEffect } from "react";
import {
  Input,
  InputNumber,
  Select,
  Radio,
  DatePicker,
  Checkbox,
  Button,
  Form,
} from "antd";
import moment from "moment";
import validator from "validator";

import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "antd/dist/antd.css";

import "./style.scss";
import { registration, updateData } from "../../actions";
import RegistrationList from "../RegistrationList";

const { Option } = Select;

const Home = () => {
  const [updateId, setupdateId] = useState("");
  const [data, setdata] = useState({
    fullName: "",
    rollNo: null,
    branch: "",
    email: "",
    gender: "",
    birthDate: {},
    registered: false,
  });
  // const [dataValidation, setdataValidation] = useState({
  //   fullName: false,
  //   rollNo: false,
  //   branch: false,
  //   email: false,
  //   gender: false,
  //   birthDate: false,
  // });
  const [nameValidation, setnameValidation] = useState(false);
  const [rollNoValidation, setrollNoValidation] = useState(false);
  const [branchValidation, setbranchValidation] = useState(false);
  const [emailValidation, setemailValidation] = useState("");
  const [genderValidation, setgenderValidation] = useState(false);
  const [birthDateValidation, setbirthDateValidation] = useState(false);
  let history = useHistory();

  const dispatch = useDispatch();
  const editData = useSelector((state) => state.register);
  useEffect(async () => {
    if (editData && editData.editProfile) {
      await setdata({
        fullName: editData.editProfile.name || "",
        rollNo: editData.editProfile.rollNumber || null,
        branch: editData.editProfile.branch || "",
        email: editData.editProfile.email || "",
        gender: editData.editProfile.gender || "",
        birthDate:
          moment(editData.editProfile.birthDate).format("DD/MM/YYYY") || {},
        registered: editData.editProfile.registered || false,
      });
      setupdateId(editData.editProfile._id);
    }
  }, [editData.editProfile]);

  const handleSubmit = () => {
    if (data.fullName === "") {
      setnameValidation(true);
    }
    if (data.rollNo === null) {
      setrollNoValidation(true);
    }
    if (data.branch === "") {
      setbranchValidation(true);
    }
    if (data.email === "") {
      setemailValidation("*email is requried");
    } else if (!validator.isEmail(data.email)) {
      setemailValidation(" enter valid email");
    }
    if (data.gender === "") {
      setgenderValidation(true);
    }
    if (!data.birthDate) {
      setbirthDateValidation(true);
    }
    if (
      data.fullName !== "" &&
      data.rollNo !== null &&
      data.branch !== "" &&
      data.email !== "" &&
      data.gender !== "" &&
      data.birthDate
    ) {
      if (editData.isEdit) {
        dispatch(updateData({ data, updateId }));
        history.push("/");
      } else {
        dispatch(registration(data));
        history.push("/");
      }
    }
  };
  const minimum = moment(new Date()).format("YYYY-MM-DD");

  return (
    <Layout>
      <div className="register_form my-3">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <p> Name : </p>
          <Input
            placeholder="Enter name"
            value={data.fullName}
            onChange={(e) => {
              setdata({ ...data, fullName: e.target.value });
              setnameValidation(false);
            }}
          />
          {nameValidation && <p className="text-danger">*name is requried</p>}
          <p className="mt-3"> Roll Number :</p>
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            placeholder="Enter roll number"
            value={data.rollNo}
            onChange={(e) => {
              setdata({ ...data, rollNo: e });
              setrollNoValidation(false);
            }}
          />
          {rollNoValidation && (
            <p className="text-danger">*roll number is requried</p>
          )}

          <p className="mt-3"> Branch :</p>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select branch"
            optionFilterProp="children"
            value={data.branch}
            onChange={(e) => {
              setdata({ ...data, branch: e });
              setbranchValidation(false);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Information Technology">
              Information Technology
            </Option>
            <Option value="Computer Engineering">Computer Engineering</Option>
            <Option value="Civil engineering">Civil Engineering</Option>
            <Option value="Chemical engineering">Chemical Engineering</Option>
            <Option value="Mechanical engineering">
              Mechanical Engineering
            </Option>
          </Select>
          {branchValidation && (
            <p className="text-danger">*branch is requried</p>
          )}

          <p className="mt-3"> Email :</p>
          <Input
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => {
              setdata({ ...data, email: e.target.value });
              setemailValidation("");
            }}
          />
          {emailValidation && <p className="text-danger">{emailValidation}</p>}

          <p className="mt-3">Select Gender :</p>
          <Radio.Group
            value={data.gender}
            onChange={(e) => {
              setdata({ ...data, gender: e.target.value });
              setgenderValidation(false);
            }}
          >
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
            <Radio value="Other">Other</Radio>
          </Radio.Group>
          {genderValidation && (
            <p className="text-danger">*gender is requried</p>
          )}

          <p className="mt-3">Select Birth Date :</p>
          <DatePicker
            // defaultValue={moment(data.birthDate, "DD/MM/YYYY")}
            //  defaultValue={moment()}
            format="DD/MM/YYYY"
            onChange={(e) => {
              setdata({ ...data, birthDate: e });
              setbirthDateValidation(false);
            }}
            disabledDate={(d) => !d || d.isAfter(minimum)}
          />
          {birthDateValidation && (
            <p className="text-danger">*birth date is requried</p>
          )}

          <Checkbox
            className="mt-3"
            checked={data.registered}
            onChange={(e) => setdata({ ...data, registered: e.target.checked })}
          >
            Already registered
          </Checkbox>

          <Button
            type="primary"
            className="mt-5"
            style={{ float: "right" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Home;
