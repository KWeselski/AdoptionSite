import React, { useState } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Input,
  Select,
  Button,
  ErrorText,
  Field,
  TextArea,
  Dialog,
  Table,
  Pagination,
  ImageUpload,
  Loader,
  Form,
} from '../components';
import { useShelters } from '../hooks';
import { styles } from '../styles';

const validationSchema = Yup.object({
  name: Yup.string().required('Add animal name'),
  species: Yup.string().required('Add animal species'),
  gender: Yup.string().required('Select gender'),
  breed: Yup.string(),
  city: Yup.string().required('Add city'),
  age: Yup.number()
    .required('Required')
    .positive('Must be positive')
    .integer('Must be an integer'),
  size: Yup.string().required('Select animal size'),
  description: Yup.string().required('Required'),
  shelter: Yup.string().required('Select shelter'),
});

const ShelterDialog = ({ isOpen, selectShelter, onClose }) => {
  if (!isOpen) return null;

  const shelters = useShelters();
  console.log(shelters);
  return (
    <Loader data={shelters}>
      {(shelters) => (
        <Dialog title="Select shelter" onClose={onClose}>
          <div
            className={`${styles.flexCenter} w-full flex-col sm:flex-row p-4`}
          >
            <Pagination values={shelters} perPage={4}>
              {(currentData) => (
                <Table>
                  <Table.Row size={3}>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>City</Table.Header>
                    <Table.Header>Actions</Table.Header>
                  </Table.Row>
                  {currentData.map((shelter, index) => (
                    <Table.Row size={3} key={index}>
                      <Table.Cell primary>{shelter.name}</Table.Cell>
                      <Table.Cell>{shelter.address.city}</Table.Cell>
                      <Table.Actions>
                        <Button
                          variant="primary"
                          onClick={() => selectShelter(shelter)}
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

const PetForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedShelter, setSelectShelter] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      species: 'Dog',
      gender: 'Male',
      breed: '',
      city: '',
      age: '',
      size: 'Small',
      description: '',
      shelter: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('api/animals/add', { ...values, image });
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleSelectShelter = (shelter) => {
    setSelectShelter(shelter);
    setIsOpen(false);
    formik.setFieldValue('shelter', shelter._id);
  };

  const handleImageUpload = (image) => {
    setImage(image);
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Row>
        <Form.Column>
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
              options={['Dog', 'Cat']}
            />
            {formik.errors.species ? (
              <ErrorText>{formik.errors.species}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Input
              label="Breed"
              name="breed"
              onChange={formik.handleChange}
              value={formik.values.breed}
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
          <Field className={'mt-10'}>
            <ImageUpload onFileSelect={handleImageUpload} />
          </Field>
        </Form.Column>
        <Form.Column>
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
              options={['Small', 'Medium', 'Large']}
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
              options={['Male', 'Female']}
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
        </Form.Column>
      </Form.Row>
      <Field>
        <TextArea
          label="Description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </Field>
      <ShelterDialog
        isOpen={isOpen}
        selectShelter={handleSelectShelter}
        onClose={() => setIsOpen(false)}
      />
      <Field className={styles.flexCenter}>
        <Button variant="primary">Add Animal</Button>
      </Field>
    </Form>
  );
};

export default PetForm;
