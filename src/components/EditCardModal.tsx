import { FunctionComponent, useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getCardById, updateCardByid } from "../services/cardService";
import Card from "../interfaces/card";
import * as yup from "yup";
import { useFormik } from "formik";
import { successMsg } from "../services/feedbackService";
import { motion } from "framer-motion";
import { SiteTheme } from "../App";

interface EditCardModalProps {
  cardId: string;
  userInfo: any;
  dataUpdated: boolean;
  setDataUpdated: Function;
}

const EditCardModal: FunctionComponent<EditCardModalProps> = ({
  cardId,
  userInfo,
  dataUpdated,
  setDataUpdated,
}) => {
  let theme = useContext(SiteTheme);
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const [show, setShow] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card>({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    postDate: "",
    webSite: "",
    businessImgURL: "",
    businessImgAlt: "",
    country: "",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    zipcode: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let formik = useFormik({
    initialValues: {
      email: currentCard.email,
      title: currentCard.title,
      subtitle: currentCard.subtitle,
      description: currentCard.description,
      country: currentCard.country,
      phone: currentCard.phone,
      businessImgURL: currentCard.businessImgURL,
      businessImgAlt: currentCard.businessImgAlt,
      city: currentCard.city,
      zipcode: currentCard.zipcode,
      state: currentCard.state,
      street: currentCard.street,
      houseNumber: currentCard.houseNumber,
      webSite: currentCard.webSite,
      postDate: currentDate,
    },
    validationSchema: yup.object({
      email: yup.string().required().email("Invalid email"),
      title: yup.string().required().max(50).min(2),
      subtitle: yup
        .string()
        .required()
        .min(5, "Too short! subtitle should be at least 5 characters"),
      description: yup
        .string()
        .min(20, "Too short! description should be at least 20 characters"),
      phone: yup.string().required().min(10),
      businessImgURL: yup.string().min(2),
      businessImgAlt: yup.string().min(2),
      state: yup.string().min(2),
      country: yup.string().min(3).required(),
      city: yup.string().min(2).required(),
      houseNumber: yup.number().required().typeError("A number is required"),
      zipcode: yup.number().min(2),
      website: yup.string()
    }),
    enableReinitialize: true,
    onSubmit: (values: Card) => {
      updateCardByid(cardId, {
        ...values,
        postDate: currentDate,
        ownerId: userInfo.userId,
      })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      successMsg(values.title + " Card updated successfully");
      setDataUpdated(!dataUpdated);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardResponse = await getCardById(cardId as string);
        setCurrentCard(cardResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cardId]);

  return (
    <>
      <motion.i
        className="ms-2 fa-solid fa-file-pen"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
        whileHover={{ scale: 1.2 }}
      ></motion.i>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={`${theme}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit {currentCard?.title} card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <form onSubmit={formik.handleSubmit} className="text-center">
              <h4 className="display-6">Card Details</h4>
              <div className="row mb-3">
                <div className="g-2 form-floating col-6">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    id="floatingInputtitle"
                    placeholder="israel"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="floatingInputtitle">title *</label>
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-danger">{formik.errors.title}</p>
                  )}
                </div>
                <div className=" g-2 form-floating col-6">
                  <input
                    name="subtitle"
                    type="text"
                    className="form-control"
                    id="floatingSubtitle"
                    placeholder="subtitle"
                    onChange={formik.handleChange}
                    value={formik.values.subtitle}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label htmlFor="floatingSubtitle">subtitle *</label>
                  {formik.touched.subtitle && formik.errors.subtitle && (
                    <p className="text-danger">{formik.errors.subtitle}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="g-2 form-floating col-12">
                  <textarea
                    style={{ height: "10rem" }}
                    name="description"
                    className="form-control"
                    id="floatingInputdescription"
                    placeholder="israel"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="floatingInputdescription">description*</label>
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-danger">{formik.errors.description}</p>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="g-2 form-floating col-6">
                  <input
                    type="text"
                    name="businessImgURL"
                    className="form-control"
                    id="floatingInputImgURL"
                    placeholder="Image Url"
                    onChange={formik.handleChange}
                    value={formik.values.businessImgURL}
                    onBlur={formik.handleBlur}
                  />

                  <label htmlFor="floatingInputImageURL">image URL</label>
                </div>
                <div className=" g-2 form-floating col-6">
                  <input
                    type="text"
                    name="businessImgAlt"
                    className="form-control"
                    id="businessImgAlt"
                    placeholder="ImageAlt"
                    onChange={formik.handleChange}
                    value={formik.values.businessImgAlt}
                    onBlur={formik.handleBlur}
                  ></input>

                  <label htmlFor="businessImageAlt">image ALT</label>
                </div>
              </div>

              <h4 className="display-6">Business Details</h4>
              <hr className="hr" />

              <div className="row mb-3">
                <div className="g-2 form-floating col-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="floatingInput">Email address*</label>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-danger">{formik.errors.email}</p>
                  )}
                </div>
                <div className=" g-2 form-floating col-6">
                  <input
                    name="webSite"
                    type="webSite"
                    className="form-control"
                    id="floatingwebSite"
                    placeholder="webSite"
                    onChange={formik.handleChange}
                    value={formik.values.webSite}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label htmlFor="floatingwebSite">webSite *</label>
                  {formik.touched.webSite && formik.errors.webSite && (
                    <p className="text-danger">{formik.errors.webSite}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="g-2 form-floating col-6">
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    id="floatingInputstate"
                    placeholder="State"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    onBlur={formik.handleBlur}
                  />

                  <label htmlFor="floatingInputState">State</label>
                </div>
                <div className=" g-2 form-floating col-6">
                  <input
                    name="country"
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="country"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label htmlFor="country">Country*</label>
                  {formik.touched.country && formik.errors.country && (
                    <p className="text-danger">{formik.errors.country}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="g-2 form-floating col-6">
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    id="floatingInputCity"
                    placeholder="Tel aviv"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="floatingInputCity">City*</label>
                  {formik.touched.city && formik.errors.city && (
                    <p className="text-danger">{formik.errors.city}</p>
                  )}
                </div>
                <div className=" g-2 form-floating col-6">
                  <input
                    name="street"
                    type="text"
                    className="form-control"
                    id="street"
                    placeholder="street"
                    onChange={formik.handleChange}
                    value={formik.values.street}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label htmlFor="street">street*</label>
                  {formik.touched.street && formik.errors.street && (
                    <p className="text-danger">{formik.errors.street}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="g-2 form-floating col-6">
                  <input
                    type="text"
                    name="houseNumber"
                    className="form-control"
                    id="floatingInputhouseNumber"
                    placeholder="House Number"
                    onChange={formik.handleChange}
                    value={formik.values.houseNumber}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor="floatingInputhouseNumber">
                    House Number*
                  </label>
                  {formik.touched.houseNumber && formik.errors.houseNumber && (
                    <p className="text-danger">{formik.errors.houseNumber}</p>
                  )}
                </div>
                <div className=" g-2 form-floating col-6">
                  <input
                    name="zipcode"
                    type="text"
                    className="form-control"
                    id="zipcode"
                    placeholder="Image Alt"
                    onChange={formik.handleChange}
                    value={formik.values.zipcode}
                    onBlur={formik.handleBlur}
                  ></input>

                  <label htmlFor="zipcode">zip Code</label>
                </div>
              </div>
              <div className="row mb-3">
                <div className=" g-2 form-floating col-12">
                  <input
                    name="phone"
                    type="tel"
                    className="form-control"
                    id="floatingNumber"
                    placeholder="+97252000000"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                  ></input>
                  <label htmlFor="floatingNumber">Phone Number*</label>
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-danger">{formik.errors.phone}</p>
                  )}
                </div>
              </div>

              <div
                className="form-check "
                style={{
                  inlineSize: "fit-content",
                }}
              ></div>

              <button
                type="submit"
                className="btn btn-success mt-4 w-100 mb-5"
                disabled={!formik.isValid || !formik.dirty}
                onClick={handleClose}
              >
                Post a new card
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCardModal;
