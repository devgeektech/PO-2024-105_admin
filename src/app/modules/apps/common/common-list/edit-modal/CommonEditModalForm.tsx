import { FC, useState, useRef, useEffect } from "react"; // Added 'useRef' import
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
// import { useListView } from "../core/ListViewProvider";
// import { PartnersListLoading } from "../components/loading/PartnersListLoading";
// import { useQueryResponse } from "../core/QueryResponseProvider";
// import { initialUser } from "../core/_models"; // Adjusted import path
import moment from "moment";
import { Col, Row } from "react-bootstrap";

type Props = {
  isUserLoading: boolean;
  user: any;
};

const editUserSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
  // bustFrom: Yup.string().required("bust is required"),
  // bustTo: Yup.string().required("bust is required"),
  // waistFrom: Yup.string().required("waist is required"),
  // waistTo: Yup.string().required("waist is required"),
  // lowWaistFrom: Yup.string().required("waist is required"),
  // lowWaistTo: Yup.string().required("waist is required"),
  // buttFrom: Yup.string().required("butt is required"),
  // buttTo: Yup.string().required("butt is required"),
  brand: Yup.string().required("Brand is required"),
  size: Yup.string().required("Size is required"),
  color: Yup.string().required("Color is required"),
  rentedDates: Yup.array().required("Rented Date is required"),
  price: Yup.string().required("Price is required"),
  images: Yup.array().required("Image is required"),
  status: Yup.string().required("Status is required"),
});

const PartnerEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  // const { itemIdForUpdate, setItemIdForUpdate } = useListView();
  // const { refetch } = useQueryResponse();
  const { REACT_APP_IMAGE_URL } = process.env;
  const inputRef = useRef<any>(null); // Create a ref for file input

  const [files, setFiles] = useState<any>([]); // State for storing selected files
  const [previews, setPreviews] = useState<any>([]); // State for storing file previews
  const [dateRange, setDateRange] = useState([null, null]);
  const [from, to] = dateRange;
  const [delImages, setDelImages] = useState<any>([]);


  const [userForEdit] = useState<any>({
    ...user,
    id: user.id || '',
  });

  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values: any, { setSubmitting }) => {
      setSubmitting(true);
      const formData: any = new FormData();
      console.log("onSubmit::values", values);
      if (values) {
        
      }
      try {
        console.log("onSubmit::formData", formData);

      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(false);
        cancel(true);
      }
    },
  });
  useEffect(() => {
    if (user?.images && user?.images?.length) {
      setFiles(user?.images);
    }
  }, []);
  const handleRentedDate = () => {
    if (from && to) {
      const newRentedDates: any = [
        ...formik.values.rentedDates,
        { from: from, to: to },
      ];
      formik.setFieldValue("rentedDates", newRentedDates);
      setDateRange([null, null]);
    }
  };

  // const handleRemoveRentedDate: any = (dateIndex : any) => {
  //   console.log("dateIndex", dateIndex)
  //   const newDate = formik.values.rentedDates.filter((e, index) => index !== dateIndex);
  //   console.log(newDate, "newDate");
  // }

  const handleRemoveRentedDate = (dateIndex: number) => {
    console.log("dateIndex", dateIndex);
    const newDates = formik.values.rentedDates.filter(
      (_, index) => index !== dateIndex
    );
    formik.setValues({ ...formik.values, rentedDates: newDates });
  };

  const cancel = (withRefresh?: boolean) => {
    // if (withRefresh) {
    //   refetch();
    // }
    // setItemIdForUpdate(undefined);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => file instanceof File);
    formik.setFieldValue("images", [...formik.values.images, ...validFiles]);
    generatePreviews([...formik.values.images, ...validFiles]);
  };

  const handleFileSelection = (event: any) => {
    const selectedFiles: any = Array.from(event.target.files);
    const validFiles = selectedFiles.filter((file) => file instanceof File);
    // console.log("validFiles", validFiles);
    formik.setFieldValue("images", [...formik.values.images, ...validFiles]);
    generatePreviews([...formik.values.images, ...validFiles]);
  };

  const generatePreviews = (fileList: any) => {
    const filePreviews: string[] = [];
    fileList.forEach((file) => {
      // console.log("file", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          filePreviews.push(e.target.result.toString());
          if (filePreviews.length === fileList.length) {
            setPreviews([...filePreviews]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...formik.values.images];
    updatedFiles.splice(index, 1);
    formik.setFieldValue("images", updatedFiles);

    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews([...updatedPreviews]);
  };

  const removeFile = (filename, index) => {
    let latestFiles = [...files];
    latestFiles.splice(index, 1);
    delImages.push(filename);
    setFiles(latestFiles);
  };

  // console.log("formik values", formik.values);

  return (
    <>
      <form
        id="kt_modal_add_user_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div
          className="d-flex flex-column scroll-y me-n7 px-7"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          <div className="fv-row mb-7 text-center">
            <div
              className="dropzone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {/* <h1> <img src={addstore} /> </h1> */}
              {/* <h1>Drag your file(s) to start uploading</h1>
              <h1>Or</h1> */}
              <input
                type="file"
                multiple
                onChange={handleFileSelection}
                hidden
                accept="image/png, image/jpeg"
                ref={inputRef}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => inputRef.current.click()}
              >
                Browse Files
              </button>
            </div>
            <div className="previews mt-3">
              <ul>
                {files.map((f, index) => (
                  <li
                    className="d-flex justify-content-between mb-1"
                    key={index}
                  >
                    <img
                      width={200}
                      height={100}
                      src={REACT_APP_IMAGE_URL + f}
                      className="product_img"
                      alt={`Preview ${index}`}
                    />
                    <button
                      type="button"
                      className="btn bg-white"
                      onClick={() => removeFile(f, index)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM15.5302 14.4698C15.6027 14.5388 15.6608 14.6216 15.7008 14.7133C15.7409 14.805 15.7622 14.9039 15.7635 15.004C15.7648 15.1041 15.746 15.2034 15.7083 15.2961C15.6706 15.3889 15.6147 15.4731 15.5439 15.5439C15.4731 15.6147 15.3889 15.6706 15.2961 15.7083C15.2034 15.746 15.1041 15.7648 15.004 15.7635C14.9039 15.7622 14.805 15.7409 14.7133 15.7008C14.6216 15.6608 14.5388 15.6027 14.4698 15.5302L12 13.0608L9.53016 15.5302C9.38836 15.6649 9.19955 15.7389 9.00398 15.7364C8.8084 15.7339 8.62155 15.6551 8.48325 15.5168C8.34495 15.3785 8.26614 15.1916 8.26364 14.996C8.26114 14.8005 8.33513 14.6116 8.46984 14.4698L10.9392 12L8.46984 9.53016C8.33513 9.38836 8.26114 9.19955 8.26364 9.00398C8.26614 8.8084 8.34495 8.62155 8.48325 8.48325C8.62155 8.34495 8.8084 8.26614 9.00398 8.26364C9.19955 8.26114 9.38836 8.33513 9.53016 8.46984L12 10.9392L14.4698 8.46984C14.6116 8.33513 14.8005 8.26114 14.996 8.26364C15.1916 8.26614 15.3785 8.34495 15.5168 8.48325C15.6551 8.62155 15.7339 8.8084 15.7364 9.00398C15.7389 9.19955 15.6649 9.38836 15.5302 9.53016L13.0608 12L15.5302 14.4698Z"
                          fill="#1D2433"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
                {previews &&
                  previews.length > 0 &&
                  previews?.map((preview, idx) => {
                    return (
                      <>
                        <li
                          className="d-flex justify-content-between mb-2"
                          key={idx}
                        >
                          <img
                            width={200}
                            height={100}
                            src={
                              preview.includes("product_")
                                ? REACT_APP_IMAGE_URL + preview
                                : preview
                            }
                            className="product_img"
                            alt={`Preview ${idx}`}
                          />
                          <button
                            type="button"
                            className="btn bg-white"
                            onClick={() => handleRemoveFile(idx)}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM15.5302 14.4698C15.6027 14.5388 15.6608 14.6216 15.7008 14.7133C15.7409 14.805 15.7622 14.9039 15.7635 15.004C15.7648 15.1041 15.746 15.2034 15.7083 15.2961C15.6706 15.3889 15.6147 15.4731 15.5439 15.5439C15.4731 15.6147 15.3889 15.6706 15.2961 15.7083C15.2034 15.746 15.1041 15.7648 15.004 15.7635C14.9039 15.7622 14.805 15.7409 14.7133 15.7008C14.6216 15.6608 14.5388 15.6027 14.4698 15.5302L12 13.0608L9.53016 15.5302C9.38836 15.6649 9.19955 15.7389 9.00398 15.7364C8.8084 15.7339 8.62155 15.6551 8.48325 15.5168C8.34495 15.3785 8.26614 15.1916 8.26364 14.996C8.26114 14.8005 8.33513 14.6116 8.46984 14.4698L10.9392 12L8.46984 9.53016C8.33513 9.38836 8.26114 9.19955 8.26364 9.00398C8.26614 8.8084 8.34495 8.62155 8.48325 8.48325C8.62155 8.34495 8.8084 8.26614 9.00398 8.26364C9.19955 8.26114 9.38836 8.33513 9.53016 8.46984L12 10.9392L14.4698 8.46984C14.6116 8.33513 14.8005 8.26114 14.996 8.26364C15.1916 8.26614 15.3785 8.34495 15.5168 8.48325C15.6551 8.62155 15.7339 8.8084 15.7364 9.00398C15.7389 9.19955 15.6649 9.38836 15.5302 9.53016L13.0608 12L15.5302 14.4698Z"
                                fill="#1D2433"
                              />
                            </svg>
                          </button>
                        </li>
                      </>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="fv-row mb-7">
            <label className="required fw-bold fs-6 mb-2">Title</label>
            <textarea
              placeholder="Enter Name"
              {...formik.getFieldProps("title")}
              type="text"
              name="title"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                { "is-invalid": formik.touched.title && formik.errors.title },
                {
                  "is-valid": formik.touched.title && !formik.errors.title,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.title}</span>
                </div>
              </div>
            )}
          </div>
          <div className="fv-row mb-7">
            <label className="required fw-bold fs-6 mb-2">ลายละเอียด</label>
            <textarea
              placeholder="Enter Product Description"
              {...formik.getFieldProps("description")}
              name="description"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                {
                  "is-invalid":
                    formik.touched.description && formik.errors.description,
                },
                {
                  "is-valid":
                    formik.touched.description && !formik.errors.description,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.description}</span>
                </div>
              </div>
            )}
          </div>

          <div className="fv-row mb-7">
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <div className="fv-row mb-7">
                  <label className="fw-bold fs-6 mb-2">อก</label>
                  <input
                    placeholder="จาก"
                    {...formik.getFieldProps("bustFrom")}
                    type="number"
                    name="bustFrom"
                    min={0}
                    className={clsx(
                      "form-control form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.bustFrom && formik.errors.bustFrom,
                      },
                      {
                        "is-valid":
                          formik.touched.bustFrom && !formik.errors.bustFrom,
                      }
                    )}
                    autoComplete="off"
                    disabled={formik.isSubmitting || isUserLoading}
                  />
                  {formik.touched.bustFrom && formik.errors.bustFrom && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{formik.errors.bustFrom}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6}>
                <div className="fv-row mb-7">
                  <label className="fw-bold fs-6 mb-2">อก</label>
                  <input
                    placeholder="ถึง"
                    {...formik.getFieldProps("bustTo")}
                    type="number"
                    name="bustTo"
                    className={clsx(
                      "form-control form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.bustTo && formik.errors.bustTo,
                      },
                      {
                        "is-valid":
                          formik.touched.bustTo && !formik.errors.bustTo,
                      }
                    )}
                    autoComplete="off"
                    disabled={formik.isSubmitting || isUserLoading}
                  />
                  {formik.touched.bustTo && formik.errors.bustTo && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{formik.errors.bustTo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <div className="fv-row mb-7">
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <div className="fv-row mb-7">
                  <label className="fw-bold fs-6 mb-2">เอว</label>
                  <input
                    placeholder="จาก"
                    {...formik.getFieldProps("waistFrom")}
                    type="number"
                    name="waistFrom"
                    min={0}
                    className={clsx(
                      "form-control form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.waistFrom && formik.errors.waistFrom,
                      },
                      {
                        "is-valid":
                          formik.touched.waistFrom && !formik.errors.waistFrom,
                      }
                    )}
                    autoComplete="off"
                    disabled={formik.isSubmitting || isUserLoading}
                  />
                  {formik.touched.waistFrom && formik.errors.waistFrom && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{formik.errors.waistFrom}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6}>
                <div className="fv-row mb-7">
                  <label className="fw-bold fs-6 mb-2">เอว</label>
                  <input
                    placeholder="ถึง"
                    {...formik.getFieldProps("waistTo")}
                    type="number"
                    name="waistTo"
                    min={0}
                    className={clsx(
                      "form-control form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.waistTo && formik.errors.waistTo,
                      },
                      {
                        "is-valid":
                          formik.touched.waistTo && !formik.errors.waistTo,
                      }
                    )}
                    autoComplete="off"
                    disabled={formik.isSubmitting || isUserLoading}
                  />
                  {formik.touched.waistTo && formik.errors.waistTo && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{formik.errors.waistTo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>

          <div className="fv-row mb-7">
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <div className="fv-row mb-7">
                  <label className="fw-bold fs-6 mb-2">เอวตำ่</label>
                  <input
                    placeholder="จาก"
                    {...formik.getFieldProps("lowWaistFrom")}
                    type="number"
                    name="lowWaistFrom"
                    min={0}
                    className={clsx(
                      "form-control form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.lowWaistFrom &&
                          formik.errors.lowWaistFrom,
                      },
                      {
                        "is-valid":
                          formik.touched.lowWaistFrom &&
                          !formik.errors.lowWaistFrom,
                      }
                    )}
                    autoComplete="off"
                    disabled={formik.isSubmitting || isUserLoading}
                  />
                  {formik.touched.lowWaistFrom && formik.errors.lowWaistFrom && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{formik.errors.lowWaistFrom}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6}>
                <div className="fv-row mb-7">
                  <label className="fw-bold fs-6 mb-2">เอวตำ่</label>
                  <input
                    placeholder="ถึง"
                    {...formik.getFieldProps("lowWaistTo")}
                    type="number"
                    name="lowWaistTo"
                    min={0}
                    className={clsx(
                      "form-control form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.lowWaistTo && formik.errors.lowWaistTo,
                      },
                      {
                        "is-valid":
                          formik.touched.lowWaistTo &&
                          !formik.errors.lowWaistTo,
                      }
                    )}
                    autoComplete="off"
                    disabled={formik.isSubmitting || isUserLoading}
                  />
                  {formik.touched.lowWaistTo && formik.errors.lowWaistTo && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{formik.errors.lowWaistTo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col lg={6} md={6} sm={6} xs={6}>
              <div className="fv-row mb-7">
                <label className="fw-bold fs-6 mb-2">สะโพก</label>
                <input
                  placeholder="จาก"
                  {...formik.getFieldProps("buttFrom")}
                  type="number"
                  name="buttFrom"
                  min={0}
                  className={clsx(
                    "form-control form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.buttFrom && formik.errors.buttFrom,
                    },
                    {
                      "is-valid":
                        formik.touched.buttFrom && !formik.errors.buttFrom,
                    }
                  )}
                  autoComplete="off"
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.buttFrom && formik.errors.buttFrom && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert">{formik.errors.buttFrom}</span>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <div className="fv-row mb-7">
                <label className="fw-bold fs-6 mb-2">สะโพก</label>
                <input
                  placeholder="ถึง"
                  {...formik.getFieldProps("buttTo")}
                  type="number"
                  name="buttTo"
                  min={0}
                  className={clsx(
                    "form-control form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.buttTo && formik.errors.buttTo,
                    },
                    {
                      "is-valid":
                        formik.touched.buttTo && !formik.errors.buttTo,
                    }
                  )}
                  autoComplete="off"
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.buttTo && formik.errors.buttTo && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert">{formik.errors.buttTo}</span>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={6} sm={6} xs={6}>
              <div className="fv-row mb-7">
                <label className="required fw-bold fs-6 mb-2">Color</label>
                <select
                  placeholder="Select.."
                  {...formik.getFieldProps("color")}
                  name="color"
                  className={clsx(
                    "d-block w-100 p-3 form-control",
                    {
                      "is-invalid": formik.touched.color && formik.errors.color,
                    },
                    {
                      "is-valid": formik.touched.color && !formik.errors.color,
                    }
                  )}
                >
                  <option selected disabled value="">
                    Select Color
                  </option>
                  <option value="white">White</option>
                  <option value="black">Black</option>
                  <option value="purple">Purple</option>
                  <option value="pink">Pink</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="yellow">Yellow</option>
                  <option value="cream">Cream</option>
                  <option value="orange">Orange</option>
                  <option value="gray">Gray</option>
                </select>
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <div className="fv-row mb-7">
                <label className="required fw-bold fs-6 mb-2">Size</label>
                <select
                  placeholder="Select.."
                  {...formik.getFieldProps("size")}
                  name="size"
                  className={clsx(
                    "d-block w-100 p-3 form-control",
                    { "is-invalid": formik.touched.size && formik.errors.size },
                    {
                      "is-valid": formik.touched.size && !formik.errors.size,
                    }
                  )}
                >
                  <option value={""} disabled>
                    Select Size
                  </option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={6} xs={6}>
              <div className="fv-row mb-7">
                <label className="required fw-bold fs-6 mb-2">Brand</label>
                <select
                  placeholder="Select.."
                  {...formik.getFieldProps("brand")}
                  name="brand"
                  className={clsx(
                    "d-block w-100 p-3 form-control",
                    { "is-invalid": formik.touched.size && formik.errors.size },
                    {
                      "is-valid": formik.touched.size && !formik.errors.size,
                    }
                  )}
                >
                  <option value={""} disabled>
                    Select Brand
                  </option>
                  <option value="LSeoul">LSeoul</option>
                  <option value="Ononmade">Ononmade</option>
                  <option value="LaneCi">LaneCi</option>
                  <option value="Darling">Darling</option>
                  <option value="Rechic">Rechic</option>
                  <option value="Tipblu">Tipblu</option>
                  <option value="Lace">Lace</option>
                  <option value="Swan">Swan</option>
                  <option value="Ninisesi">Ninisesi</option>
                  <option value="Joiedesroses">Joiedesroses</option>
                  <option value="Laviici">Laviici</option>
                  <option value="Wabisabi">Wabisabi</option>
                  <option value="Beachclub">Beachclub</option>
                  <option value="RedBean">Red Bean</option>
                  <option value="She.by.shi">She.by.shi</option>
                  <option value="Kathy">Kathy</option>
                  <option value="Diliciae">Diliciae</option>
                  <option value="Colin">Colin</option>
                  <option value="Wetavocado">Wetavocado</option>
                  <option value="NoBrand">No Brand</option>
                </select>
                {/* 
            <input
              placeholder="Enter Brand"
              {...formik.getFieldProps("brand")}
              type="text"
              name="brand"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                { "is-invalid": formik.touched.brand && formik.errors.brand },
                {
                  "is-valid": formik.touched.brand && !formik.errors.brand,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.brand && formik.errors.brand && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.brand}</span>
                </div>
              </div>
            )} */}
              </div>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <div className="fv-row mb-7">
                <label className="required fw-bold fs-6 mb-2">
                  ราคาชุดซื้อมา (บาท)
                </label>
                <input
                  placeholder="Enter Price"
                  {...formik.getFieldProps("price")}
                  type="number"
                  name="price"
                  min={0}
                  className={clsx(
                    "form-control form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid": formik.touched.price && formik.errors.price,
                    },
                    {
                      "is-valid": formik.touched.price && !formik.errors.price,
                    }
                  )}
                  autoComplete="off"
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert">{formik.errors.price}</span>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          {/* <div className="fv-row mb-7">
            <label className="required fw-bold fs-6 mb-2">Status</label>
            <select
              placeholder="Select.."
              {...formik.getFieldProps("status")}
              name="status"
              className={clsx(
                "d-block w-100 p-3 form-control",
                { "is-invalid": formik.touched.status && formik.errors.status },
                {
                  "is-valid": formik.touched.status && !formik.errors.status,
                }
              )}
            >
              <option selected disabled value="">Change Status</option>
              <option value="Occupied">Occupied</option>
              <option value="Waiting for payment">Waiting for payment</option>
              <option value="Delivering">Delivering</option>
              <option value="Being returned">Being returned</option>
              <option value="Completed">Completed</option>
            </select>
          </div> */}
          {/* <div className="fv-row mb-7">
            <label className="required fw-bold fs-6 mb-2 w-100">Rented Dates</label>
            <div className="d-flex gap-5">
              <DatePicker
                className="form-control"
                selectsRange={true}
                startDate={from}
                endDate={to}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
              <button className="btn btn-primary" type="button" onClick={handleRentedDate}>Add</button>
            </div>

          </div> */}
          <div>
            {/* <h2>Rented Dates:</h2> */}
            <ul className="ps-0">
              {formik.values.rentedDates &&
                formik.values.rentedDates.length > 0 &&
                formik.values.rentedDates.map(
                  (dateRange: any, index: number) => (
                    <>
                      <li
                        key={index}
                        className="p-1 d-flex gap-3 align-items-center justify-content-between"
                      >
                        {moment(dateRange?.from).format("D/MM/YYYY")} -{" "}
                        {moment(dateRange?.to).format("D/MM/YYYY")}
                        <i
                          className="fas fa-trash text-danger cursor-pointer"
                          onClick={() => handleRemoveRentedDate(index)}
                        ></i>
                      </li>
                    </>
                  )
                )}
            </ul>
          </div>
        </div>
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={
              isUserLoading ||
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched
            }
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isUserLoading) }
    </>
  );
};

export { PartnerEditModalForm };
