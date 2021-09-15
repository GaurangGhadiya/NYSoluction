import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfile,
  getProfile,
  getRegistration,
  removeProfile,
} from "../../actions";
import { Table, Button, Space } from "antd";
import { useHistory } from "react-router-dom";
import "./style.scss";

const RegistrationList = ({ handleEdit }) => {
  const [registrationList, setregistrationList] = useState([]);
  const auth = useSelector((state) => state);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const data = dispatch(getRegistration());
    setregistrationList(auth.register.registerData);
  }, []);

  const handleView = (data) => {
    history.push(`/profile/${data._id}`);
  };

  const handleDelete = async (data) => {
    await dispatch(removeProfile(data._id));
    await dispatch(getRegistration());
  };

  const editclick = async (data) => {
    await dispatch(editProfile(data._id));
    history.push(`/register`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.rollNumber - b.rollNumber,
      ellipsis: true,
    },

    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      filters: [
        { text: "Information Technology", value: "Information " },
        { text: "Computer Engineering", value: "Computer" },
        { text: "Civil Engineering", value: "Civil" },
        { text: "Chemical Engineering", value: "Chemical" },
        { text: "Mechanical Engineering", value: "Mechanical" },
      ],
      onFilter: (value, record) => record.branch.indexOf(value) === 0,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleView(text)}>View</a>
          <a onClick={() => editclick(text)}>Edit</a>
          <a onClick={() => handleDelete(text)}>Delete</a>
          &nbsp;&nbsp;
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Layout>
        <Button
          type="primary"
          className="m-3 float-right"
          onClick={() => history.push(`/register`)}
        >
          Add New
        </Button>

        <Table
          // className="p-3"
          columns={columns}
          scroll={{ x: 400 }}
          dataSource={auth && auth.register && auth.register.registerData}
          //   onChange={this.handleChange}
        />
      </Layout>
    </div>
  );
};

export default RegistrationList;
