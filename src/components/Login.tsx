import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkUser } from "../services/userServices";
import { successMsg, errorMsg } from "../services/feedbackService";
import User from "../interfaces/user";

interface LoginProps {
  userInfo: User;
  setUserInfo: Function;
}

const Login: FunctionComponent<LoginProps> = ({userInfo, setUserInfo}) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email("Invalid email"),
      password: yup
        .string()
        .required()
        .min(8, "Too short! Password should be at least 8 characters"),
    }),
    onSubmit: (values) => {
      checkUser(values)
        .then((res) => {
          if (res.data.length) {
            successMsg(`Welcom back ${res.data[0].firstName} ${res.data[0].lastName}`);            
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({
                email: res.data[0].email,
                role: res.data[0].role,
                userId: res.data[0].id,
              })
            );

            navigate("/");
            setUserInfo(
              JSON.parse(sessionStorage.getItem("userInfo") as string)
            );

          } else errorMsg("Acount Not Found");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="w-50 container">
        <form onSubmit={formik.handleSubmit} className="text-center">
          <h3 className="display-3 container text-center">Login</h3>
          <div className="form-floating mb-3">
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
            <label htmlFor="floatingInput">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating">
            <input
              name="password"
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            ></input>
            <label htmlFor="floatingPassword">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
            <button
              type="submit"
              className="btn btn-success mt-4 w-100"
              disabled={!formik.isValid || !formik.dirty}
            >
              Login
            </button>
          </div>
        </form>

        <Link to="/register">
          <p className="text-center mt-3">New user? Register here</p>
        </Link>
      </div>
    </>
  );
};

export default Login;
