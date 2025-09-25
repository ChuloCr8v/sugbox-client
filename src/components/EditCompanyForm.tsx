import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseGetAuth from "../hooks/useGetAuth";
import { hideEditCompanyModal } from "../redux/editCompany";
import { companyProps } from "../types";
import ProfileDetails from "./ProfileDetails";
import FormItemWrapper from "./FormItemWrapper";

type editModalProps = {
  editCompanyModal: { editCompanyModal: boolean };
};

const EditCompanyForm = () => {
  const { user, isAdmin } = UseGetAuth();
  const [_formData, _setFormData] = useState<companyProps>(user);
  const { editCompanyModal } = useSelector(
    (state: editModalProps) => state.editCompanyModal
  );
  const dispatch = useDispatch();

  const profileTitle = isAdmin ? user.companyName : "";

  return (
    <Modal
      open={editCompanyModal}
      onCancel={() => dispatch(hideEditCompanyModal())}
      title={
        <p className="">
          {" "}
          <span className="uppercase">{profileTitle}</span>'s Profile
        </p>
      }
      // footer={
      //   <ModalFooter
      //     handleOk={handleUpdateInfo}
      //     onClose={() => dispatch(hideEditCompanyModal())}
      //     okText={"Update"}
      //   />
      // }
    >
      <div className="">
        <div className="mt-6 flex items-center justify-center w-full">
          <ProfileDetails />
        </div>
        <form action="" className="pb-6 grid gap-4 w-full mt-4">
          <FormItemWrapper label={"Organization's Name"} name={"companyName"} />
          <FormItemWrapper
            label={"Organization's Email"}
            name={"companyEmail"}
          />
        </form>
      </div>
    </Modal>
  );
};

export default EditCompanyForm;
