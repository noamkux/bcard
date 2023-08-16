import { FunctionComponent, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface EditRoleProps {
  userId: number;
}

const EditRole: FunctionComponent<EditRoleProps> = ({ userId }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <i
        className="ms-2 fa-solid fa-file-pen"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      ></i>
    </>
  );
};

export default EditRole;
