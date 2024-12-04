import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setAssignMembersModalStaus } from "../../../../redux/features/shared/sharedSlice";
import { FormikProvider, useFormik } from "formik";
import { Form } from "react-bootstrap";
import { assignMemberToTrainer } from "../../../../redux/features/user/_userAction";
import VisibilityBox from "../common/visibility-box/VisibilityBox";
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  getAllMembers,
  getAssignedUser,
} from "../../../../services/user.service";
import Required from "../common/Required";

function AssignMemberModal() {
  const dispatch: any = useDispatch();
  const sharedActions: any = useSelector((state: any) => state.sharedActions);
  const [members, setMembers] = useState<any[]>([]);
  const [assignendMember, setAssignedMember] = useState<any[]>([]);
  const formIntialValues = {
    participants: sharedActions?.formDetails?.participants?.length
      ? sharedActions?.formDetails?.participants?.map((p: any) => p?.user)
      : [],
  };

  const assignFormik = useFormik({
    initialValues: formIntialValues,
    onSubmit: async (values: any, { resetForm }) => {
      let trainer = sharedActions.memberAssignedTrainerDetails._id;
      let result = await dispatch(
        assignMemberToTrainer({ ...values, trainer: trainer })
      );
      dispatch(setAssignMembersModalStaus(result.payload.data[0]));
      setTimeout(() => {
        dispatch(setAssignMembersModalStaus(false));
        resetForm();
      }, 500);
    },
  });

  useEffect(() => {
    getMemberData();
    getTrainerAssignedUser();
  }, []);

  const closeModal = () => {
    dispatch(setAssignMembersModalStaus(false));
  };

  const handleSelectMember = (selectedList: any, selectedItem: any) => {
    assignFormik.setFieldValue("participants", selectedList);
  };

  const getMemberData = async () => {
    const result = await getAllMembers({ limit: 100, page: 1 });
    if (result?.data?.length) {
      setMembers(result?.data);
    }
  };
  const getTrainerAssignedUser = async () => {
    let trainer = sharedActions.memberAssignedTrainerDetails?._id;
    const result = await getAssignedUser(trainer);
    if (result?.data?.length) {
      let assignend = result.data;
      setAssignedMember(assignend);
    }
  };

  return (
    <>
      <Modal
        backdrop="static"
        show={sharedActions.assignMemberModal}
        onHide={closeModal}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormikProvider value={assignFormik}>
            <Form onSubmit={assignFormik.handleSubmit} method="POST">
              <VisibilityBox show={true}>
                <div>
                  <div className="my-2">
                    <h4>
                      Members
                      <Required />
                    </h4>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-4 mb-6">
                      <Form.Group>
                        <Multiselect
                          selectedValues={assignendMember}
                          placeholder="Select Participant"
                          displayValue="firstName"
                          id="_id"
                          isObject={true}
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={handleSelectMember}
                          onSearch={function noRefCheck() {}}
                          onSelect={handleSelectMember}
                          options={members}
                          showCheckbox
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </VisibilityBox>
              <Modal.Footer>
                <Button
                  type="button"
                  variant="secondary"
                  className="primaryBtn"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button type="submit" className="primaryBtn active">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </FormikProvider>
        </Modal.Body>
      </Modal>
    </>
  );
}

export { AssignMemberModal };
