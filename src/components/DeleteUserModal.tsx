import { motion } from "framer-motion";
import { FunctionComponent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../services/userServices";

interface DeleteUserModalProps {
  userId: number;
  dataUpdated: boolean;
  setDataUpdated: Function;
}

const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = ({
  userId,
  dataUpdated,
  setDataUpdated,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let handleDelete = (id: number) => {
    deleteUser(id)
      .then((res) => {
        setDataUpdated(!dataUpdated);
      })
      .catch((err) => console.log("error"));
  };

  return (
    <>
      <motion.i
        className="ms-2 fa-solid fa-trash col-4"
        style={{ cursor: "pointer" }}
        onClick={() => handleShow()}
        whileHover={{ scale: 1.2 }}
      ></motion.i>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure you want to Delete This User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="secondary"
            className="mt-2 w-100"
            onClick={() => handleDelete(userId as number)}
          >
            Delete
          </Button>

          <Button
            variant="secondary"
            className="mt-2 w-100"
            onClick={handleClose}
          >
            Back
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
