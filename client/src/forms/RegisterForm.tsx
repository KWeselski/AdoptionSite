import axios from "axios";
import { useFormik } from "formik";
import Button from "../components/Button";
import Input from "../components/Input";
import * as Yup from "yup";

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

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

  const onSubmit = async ({ name, email, password }: RegistrationValues) => {
    // try {
    //   const response = await axios.post("/api/user/login", {
    //     email,
    //     password,
    //   });
    //   const data = response.data;
    //   if (response.status === 201) {
    //     const { token, expiresIn, username } = data;
    //     const expirationDate = new Date(
    //       new Date().getTime() + expiresIn * 1000
    //     );
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("username", username);
    //     localStorage.setItem("expiresIn", expirationDate.toISOString());
    //     dispatch(login(token, username, expirationDate.toISOString()));
    //     navigate("/");
    //   } else {
    //     console.log("Error: " + data.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
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
            <p className="font-semibold">{formik.errors.name}</p>
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
            <p className="font-semibold">{formik.errors.email}</p>
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
