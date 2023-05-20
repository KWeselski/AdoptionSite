import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Input, Select, Button, ErrorText, Field, TextArea, Dialog, Table, Pagination, ImageUpload, Loader } from "../components";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  name: Yup.string().required("Add animal name"),
  species: Yup.string().required("Add animal species"),
  gender: Yup.string().required("Select gender"),
  city: Yup.string().required("Add city"),
  age: Yup.number()
    .required("Required")
    .positive("Must be positive")
    .integer("Must be an integer"),
  size: Yup.string().required("Select animal size"),
  description: Yup.string().required("Required"),
  shelter: Yup.string().required("Select shelter"),
});

const ShelterDialog = ({ selectShelter, onClose }) => {
  const shelters = useSelector((state) => state.shelters);
  return (
    <Loader data={shelters}>
      {(shelters) => (
        <Dialog title="Select shelter" onClose={onClose}>
          <div className="flex w-full flex-col sm:flex-row justify-between items-center p-4">
            <Pagination values={shelters} perPage={4}>
              {(currentData) => (
                <Table>
                  <Table.Row size={3}>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>City</Table.Header>
                    <Table.Header>Actions</Table.Header>
                  </Table.Row>
                  {currentData.map((request, index) => (
                    <Table.Row size={3} key={index}>
                      <Table.Cell primary>{request.name}</Table.Cell>
                      <Table.Cell>{request.city}</Table.Cell>
                      <Table.Actions>
                        <Button
                          variant="primary"
                          onClick={() => selectShelter(request)}
                        >
                          Select
                        </Button>
                      </Table.Actions>
                    </Table.Row>
                  ))}
                </Table>
              )}
            </Pagination>
          </div>
        </Dialog>
      )}
    </Loader>
  );
};

const createPetAdoption = async (petData, image) => {
  const formData = new FormData();
  formData.append("image", image);

  for (const key in petData) {
    if (petData.hasOwnProperty(key)) {
      formData.append(key, petData[key]);
    }
  }
  try {
    const response = await axios.post("api/animals/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const PetForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedShelter, setSelectShelter] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      species: "Dog",
      gender: "Male",
      city: "",
      age: "",
      size: "Small",
      description: "",
      shelter: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      createPetAdoption(values, image);
    },
  });

  const handleSelectShelter = (shelter) => {
    setSelectShelter(shelter);
    setIsOpen(false);
    formik.setFieldValue("shelter", shelter._id);
  };

  const handleImageUpload = (image) => {
    setImage(image);
  };

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
              label="Species"
              name="species"
              onChange={formik.handleChange}
              value={formik.values.species}
              options={["Dog", "Cat"]}
            />
            {formik.errors.species ? (
              <ErrorText>{formik.errors.species}</ErrorText>
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
          <Field className={"mt-10"}>
            <ImageUpload onFileSelect={handleImageUpload} />
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
          <Field>
            <Input
              label="Shelter"
              name="shelter"
              onChange={formik.handleChange}
              value={selectedShelter?.name}
            />
            {formik.errors.shelter ? (
              <ErrorText>{formik.errors.shelter}</ErrorText>
            ) : null}
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              Select Shelter
            </Button>
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
      {isOpen ? (
        <ShelterDialog
          selectShelter={handleSelectShelter}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
      <Field>
        <Button variant="primary">Add Animal</Button>
      </Field>
    </form>
  );
};

export default PetForm;