import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, Input, ErrorText, Form, Field } from '../components';
import {styles } from '../styles'

const LoginForm = ({ handleLogin }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter email'),
    password: Yup.string().required('Please enter password'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: (values) => handleLogin(values),
  });

  return (
    <Form onSubmit={formik.handleSubmit} fullWidth>
      <Field>
        <Input
          name="email"
          placeholder="Please enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <ErrorText>{formik.errors.email}</ErrorText>
        )}
      </Field>
      <Field>
        <Input
          name="password"
          placeholder="Please enter password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorText>{formik.errors.password}</ErrorText>
        )}
      </Field>
      <Field className={styles.flexCenter}>
        <Button variant="primary">Login</Button>
      </Field>
    </Form>
  );
};

export default LoginForm;
