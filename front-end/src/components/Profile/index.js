import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../actions";
import "./style.scss";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

import moment from "moment";

const Profile = () => {
  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    dispatch(getProfile(id));
  }, []);
  const dispatch = useDispatch();
  let history = useHistory();

  const viewProfile = useSelector((state) => state.register.viewProfile);
  return (
    <div>
      <Layout>
        <Button
          type="primary"
          className="m-3 back-to-home"
          onClick={() => history.push("/")}
        >
          Back to home
        </Button>
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="row container d-flex justify-content-center mt-4">
              <div className="col-xl-6 col-md-12">
                <div className="card user-card-full">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25">
                          <img
                            src="https://img.icons8.com/bubbles/100/000000/user.png"
                            className="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>
                        <h6 className="f-w-600">{viewProfile.name}</h6>
                        <p>{viewProfile.branch}</p>
                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-block">
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                          Information
                        </h6>
                        <div className="row">
                          <div className="col-sm-6 col-md-12">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h6 className="text-muted f-w-400">
                              {viewProfile.email}
                            </h6>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-sm-6 ">
                            <p className="m-b-10 f-w-600">Birth Date</p>
                            <h6 className="text-muted f-w-400">
                              {moment(viewProfile.birthDate).format(
                                "DD/MM/YYYY"
                              )}
                            </h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Gender</p>
                            <h6 className="text-muted f-w-400">
                              {viewProfile.gender}
                            </h6>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Roll Number</p>
                            <h6 className="text-muted f-w-400">
                              {viewProfile.rollNumber}
                            </h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Registered</p>
                            <h6 className="text-muted f-w-400">
                              {viewProfile.registered ? "Yes" : "No"}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
