import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { LoginForm } from "./loginForm";

export const LoginModal = ({ credentials, onChange, onLogin }) => {
  const { store } = useContext(Context);
  return (
    <>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Log in
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <LoginForm
                  onLogin={onLogin}
                  onChange={onChange}
                  credentials={credentials}
                />
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
    </>
  );
};
