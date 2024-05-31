import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseGetAuth from "../hooks/useGetAuth";
import { hideEditCompanyModal } from "../redux/editCompany";
import { companyProps } from "../types";
import ProfileDetails from "./ProfileDetails";
import { FormGroup } from "./SmallerComponents";

type editModalProps = {
  editCompanyModal: { editCompanyModal: boolean };
};

const EditCompanyForm = () => {
  const { user, isAdmin } = UseGetAuth();
  const [formData, setFormData] = useState<companyProps>(user);
  const { editCompanyModal } = useSelector(
    (state: editModalProps) => state.editCompanyModal
  );
  const dispatch = useDispatch();

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const profileTitle = isAdmin ? user.companyName : "";

  // const handleUpdateInfo = () => {
  //   return "";
  // };

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
          <FormGroup
            onInputChange={handleInputChange}
            label={"Organization's Name"}
            name={"companyName"}
            value={formData?.companyName}
            labelClassName="text-gray-500"
          />
          <FormGroup
            onInputChange={handleInputChange}
            label={"Organization's Email"}
            name={"companyEmail"}
            value={formData?.companyEmail}
            labelClassName="text-gray-500"
          />
        </form>
      </div>
    </Modal>
  );
};

export default EditCompanyForm;
