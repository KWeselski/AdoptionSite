import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import Field from "../components/Field";
import TextArea from "../components/TextArea";
import axios from "axios";
import Dialog from "../components/Dialog";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

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
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get("api/shelters", {
          params: {
            partial: true,
          },
        });
        setShelters(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchShelters();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog title="Select shelter" onClose={onClose}>
      <div className="flex w-full flex-col sm:flex-row justify-between items-center p-4">
        <Pagination values={shelters} perPage={2}>
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
  );
};

const createPetAdoption = async (petData) => {
  try {
    const response = await axios.post("api/animals/add", petData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const petAdoptionForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShelter, setSelectShelter] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      species: "",
      gender: "",
      city: "",
      age: "",
      size: "",
      description: "",
      shelter: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createPetAdoption(values);
    },
  });

  const handleSelectShelter = (shelter) => {
    setSelectShelter(shelter);
    setIsOpen(false);
    formik.setFieldValue("shelter", shelter);
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
          open={isOpen}
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

export default petAdoptionForm;
