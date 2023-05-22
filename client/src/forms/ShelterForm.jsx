import { useEffect } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Input, Button, ErrorText, Field, Form } from '../components';
import { styles } from '../styles';
import authRequest from '../utils/authRequest';

const validationSchema = Yup.object({
  name: Yup.string().required('Add shelter name'),
  phoneNumber: Yup.string()
    .required('Add phone number')
    .matches(/^\d{9,15}$/, 'Incorrect phone number.'),
  email: Yup.string().email('Invalid email address').required('Add email'),
  address: Yup.object().shape({
    city: Yup.string().required('Add city'),
    street: Yup.string().required('Add street'),
  }),
});

const submitShelter = async (shelterData, resetForm, isEdit, id) => {
  try {
    isEdit
      ? await authRequest.put(`api/shelters/${id}`, shelterData)
      : await authRequest.post('api/shelters/add', shelterData);
    resetForm();
  } catch (error) {
    console.error(error);
  }
};

const shelterForm = ({ isEdit, id }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      email: '',
      address: {
        city: '',
        street: '',
      },
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      submitShelter(values, resetForm, isEdit, id);
    },
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`api/shelters/${id}`).then((res) => {
        formik.setValues(res.data);
      });
    }
  }, [id, isEdit]);

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
        </Form.Column>
        <Form.Column>
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
        </Form.Column>
      </Form.Row>
      <Field className={styles.flexCenter}>
        <Button variant="primary">
          {isEdit ? 'Edit Shelter' : 'Add Shelter'}
        </Button>
      </Field>
    </Form>
  );
};

export default shelterForm;
