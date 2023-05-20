import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button, ErrorText, Field } from "../components";
import axios from "axios";

const validationSchema = Yup.object({
  name: Yup.string().required("Add shelter name"),
  phoneNumber: Yup.string()
    .required("Add phone number")
    .matches(/^\d{9,15}$/, "Incorrect phone number."),
  email: Yup.string()
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Incorrect format")
    .required("Add email"),
    address: Yup.object().shape({
      city: Yup.string().required("Add city"),
      street: Yup.string().required("Add street"),
    }),
});

const createShelter = async (shelterData) => {
  try {
    await axios.post("api/shelters/add", shelterData);
  } catch (error) {
    console.error(error);
  }
};

const shelterForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: {
        city: "",
        street: ""
      }
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      createShelter(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full xl:w-1/2 justify-center flex flex-col"
    >
      <div className="flex flex-col md:flex-row  gap-4 ">
        <div className="w-full md:w-1/2">
          <Field>
            <Input
              label="Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <ErrorText>{formik.errors.name}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Input
              label="Phone Number"
              name="phoneNumber"
              tel
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
            {formik.errors.phoneNumber ? (
              <ErrorText>{formik.errors.phoneNumber}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Input
              label="City"
              name="address.city"
              onChange={formik.handleChange}
              value={formik.values.address.city}
            />
            {formik.errors.address?.city ? (
              <ErrorText>{formik.errors.address.city}</ErrorText>
            ) : null}
          </Field>
        </div>
        <div className="w-full md:w-1/2">
          <Field>
            <Input
              label="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <ErrorText>{formik.errors.email}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Input
              label="Street"
              name="address.street"
              onChange={formik.handleChange}
              value={formik.values.address.street}
            />
            {formik.errors.address?.street ? (
              <ErrorText>{formik.errors.address.street}</ErrorText>
            ) : null}
          </Field>
        </div>
      </div>
      <Field>
        <Button variant="primary">Add Shelter</Button>
      </Field>
    </form>
  );
};

export default shelterForm;