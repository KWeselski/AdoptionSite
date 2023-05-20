import axios from "axios";
import { useFormik } from "formik";
import Button from "../components/Button";
import Input from "../components/Input";
import * as Yup from "yup";
import ErrorText from "../components/ErrorText";

const RegisterForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter username"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter email"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Please enter password"),
  });

  const onSubmit = async ({ name, email, password }) => {
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-8">
          <Input
            name="name"
            placeholder="Enter your username"
            value={formik.values.name}
            onChange={formik.handleChange}
            icon="fas fa-envelope"
          />
          {formik.touched.name && formik.errors.name && (
            <ErrorText>{formik.errors.name}</ErrorText>
          )}
        </div>
        <div className="mt-8">
          <Input
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            icon="fas fa-envelope"
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorText>{formik.errors.email}</ErrorText>
          )}
        </div>
        <div className="mt-8">
          <Input
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            icon="fas fa-lock"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="font-semibold">{formik.errors.password}</p>
          )}
        </div>
        <div className="mt-8">
          <Button variant="primary">Create account</Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
