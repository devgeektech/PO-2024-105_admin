import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { changePassword } from "./core/_requests";
import { useAuth } from "../auth";
import { notify } from "../../../utils/shared";

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, "Minimum 8 symbols")
    .required("Old Password is required"),
  newPassword: Yup.string()
    .min(8, "Password must include atleast 8 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
    )
    .required("New Password is required"),
  cnfPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .min(8, "Password must include atleast 8 characters")
    .required("Confirm Password is required"),
});

const initialValues = {
  oldPassword: "",
  newPassword: "",
  cnfPassword: "",
};

const ChangePasswordForm = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passType, setPassType] = useState(true);
  const [newPassType, setNewPassType] = useState(true);
  const [cnfPassType, setCnfNewPassType] = useState(true);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      setSubmitting(true);
      try {
        const passObj = { oldPassword: values.oldPassword, newPassword: values.newPassword }
        const { data: auth } = await changePassword(passObj);
        if (auth['responseCode'] === 200) {
          notify('Password changed successfully.','success');
        }
        setLoading(false);
        setSubmitting(false);
        resetForm();
      } catch (ex: any) {
        const { responseMessage } = ex?.response?.data;
        notify(responseMessage,'error');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <form
        id="kt_modal_add_user_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div
          className="d-flex flex-column px-7 p-md-5 outer-wrapper"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">Old Password</label>
            <div className="new_pass_div">
              <input
                placeholder="Enter Old Password"
                {...formik.getFieldProps("oldPassword")}
                type={newPassType ? "password" : "text"}
                name="oldPassword"
                className={clsx(
                  "form-control form-control-solid mb-3 mb-lg-0",
                  {
                    "is-invalid":
                      formik.touched.oldPassword && formik.errors.oldPassword,
                  },
                  {
                    "is-valid":
                      formik.touched.oldPassword && !formik.errors.oldPassword,
                  }
                )}
                autoComplete="off"
                disabled={formik.isSubmitting}
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
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.oldPassword}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">New Password</label>
            <div className="new_pass_div">
              <input
                placeholder="Enter New Password"
                {...formik.getFieldProps("newPassword")}
                type={passType ? "password" : "text"}
                name="newPassword"
                className={clsx(
                  "form-control form-control-solid mb-3 mb-lg-0",
                  {
                    "is-invalid":
                      formik.touched.newPassword && formik.errors.newPassword,
                  },
                  {
                    "is-valid":
                      formik.touched.newPassword && !formik.errors.newPassword,
                  }
                )}
                autoComplete="off"
                disabled={formik.isSubmitting}
              />
              <i
                className={
                  passType
                    ? "bi bi-eye-slash-fill eyeIcon"
                    : "bi bi-eye-fill eyeIcon"
                }
                onClick={() => {
                  setPassType(!passType);
                }}
              ></i>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="fv-plugins-message-container ml-5">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.newPassword}</span>
                  </div>
                </div>
              )}
            </div>

            {/* end::Input */}
          </div>
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">
              Confirm Password
            </label>
            <div className="new_pass_div">
              <input
                placeholder="Enter Confirm Password"
                {...formik.getFieldProps("cnfPassword")}
                type={cnfPassType ? "password" : "text"}
                name="cnfPassword"
                className={clsx(
                  "form-control form-control-solid mb-3 mb-lg-0",
                  {
                    "is-invalid":
                      formik.touched.cnfPassword && formik.errors.cnfPassword,
                  },
                  {
                    "is-valid":
                      formik.touched.cnfPassword && !formik.errors.cnfPassword,
                  }
                )}
                autoComplete="off"
                disabled={formik.isSubmitting}
              />
              <i
                className={
                  cnfPassType
                    ? "bi bi-eye-slash-fill eyeIcon"
                    : "bi bi-eye-fill eyeIcon"
                }
                onClick={() => {
                  setCnfNewPassType(!cnfPassType);
                }}
              ></i>
              {formik.touched.cnfPassword && formik.errors.cnfPassword && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.cnfPassword}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center pb-5">
          <button
            type="submit"
            id="kt_sign_in_submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className="indicator-label">Change</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export { ChangePasswordForm };
