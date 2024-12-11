import { FC } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { COMPANY_STATUS, GENDERS } from "../../../../../../../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { updateCompany } from "../../../../../../../redux/features/company/_companyAction";
type Props = {
  userObj: any;
};

const StatusCell: FC<Props> = ({ userObj }) => {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);
  return (
    <>
      <Form.Group>
        <Select
          className="custom-select-box"
          value={COMPANY_STATUS.find((g) => g.value === userObj.status)}
          name="status"
          placeholder="Select status"
          onChange={(v) => {
            console.log(v.value, ">>> value >>>>>");
            let values: any = {status: v?.value}
            dispatch(
                updateCompany({
                  ...values,
                  id: userObj?._id,
                })
            )
            // userFormik.setFieldValue("gender", v?.value);
          }}
          options={COMPANY_STATUS}
        />
      </Form.Group>
    </>
  );
};

export { StatusCell };
