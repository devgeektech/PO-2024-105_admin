/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { login } from "../core/_requests";
import { useAuth } from "../core/Auth";
import logo from '../../../../_metronic/assets/logo/logo.svg';
import "./style.scss";
import { notify } from "../../../../utils/shared";
import { Link } from "react-router-dom";
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const [newPassType, setNewPassType] = useState(true);
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await login(values.email, values.password);
        saveAuth(auth?.data);
        setCurrentUser(auth["data"]);
        notify(auth.responseMessage, 'success');
      } catch (error: any) {
        console.log(error)
        saveAuth(undefined);
        setSubmitting(false);
        setLoading(false);
        notify(error?.response?.data?.responseMessage, 'error');
      }
    },
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      <div className="fv-row mb-5 text-center">
        <img className="w-50 h-50" src={logo} alt="logo" />
      </div>
      {/* begin::Form group */}
      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-dark">Email</label>
        <input
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-3">
        <div className="d-flex w-100 justify-content-between">
        <label className="form-label fw-bolder text-dark fs-6 mb-0">
          Password
        </label>
        <Link to={'/auth/forgot-password'}><span className="cursor-pointer"><i className="fw-bold">Forgot Password</i></span></Link>
        </div>
        <div className="position-relative">
        <input
          placeholder="Password"
          type={newPassType ? "password" : "text"}
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.password && formik.errors.password,
            },
            {
              "is-valid": formik.touched.password && !formik.errors.password,
            }
          )}
          name="password"
        />
        <i
          className={
            newPassType
              ? "bi bi-eye-slash-fill eyeIcon"
              : "bi bi-eye-fill eyeIcon"
          }
          onClick={() => {
            setNewPassType(!newPassType);
          }}
        ></i>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      {/* begin::Action */}
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Continue</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
