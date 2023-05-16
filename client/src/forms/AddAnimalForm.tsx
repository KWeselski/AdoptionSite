import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import Field from "../components/Field";
import TextArea from "../components/TextArea";

const validationSchema = Yup.object({
  name: Yup.string().required("Add animal name"),
  breed: Yup.string().required("Add animal breed"),
  gender: Yup.string().required("Select gender"),
  city: Yup.string().required("Add city"),
  age: Yup.number()
    .required("Required")
    .positive("Must be positive")
    .integer("Must be an integer"),
  size: Yup.string().required("Select animal size"),
  description: Yup.string().required("Required"),
});

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      breed: "",
      gender: "",
      city: "",
      age: "",
      size: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
            <Select
              label="Breed"
              name="breed"
              onChange={formik.handleChange}
              value={formik.values.breed}
              options={["Dog", "Cat"]}
            />
            {formik.errors.breed ? (
              <ErrorText>{formik.errors.breed}</ErrorText>
            ) : null}
          </Field>

          <Field>
            <Input
              label="City"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            {formik.errors.city ? (
              <ErrorText>{formik.errors.city}</ErrorText>
            ) : null}
          </Field>
        </div>
        <div className="w-full md:w-1/2">
          <Field>
            <Input
              label="Age"
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
            />
            {formik.errors.age ? (
              <ErrorText>{formik.errors.age}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Select
              label="Size"
              name="size"
              onChange={formik.handleChange}
              value={formik.values.size}
              options={["Small", "Medium", "Large"]}
            />
            {formik.errors.size ? (
              <ErrorText>{formik.errors.size}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Select
              label="Gender"
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
              options={["Male", "Female"]}
            />
            {formik.errors.gender ? (
              <ErrorText>{formik.errors.gender}</ErrorText>
            ) : null}
          </Field>
        </div>
      </div>

      <Field>
        <TextArea
          label="Description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </Field>
      <Field>
        <Button variant="primary">Add Animal</Button>
      </Field>
    </form>
  );
};

export default MyForm;
