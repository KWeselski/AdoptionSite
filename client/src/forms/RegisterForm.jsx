import { useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button, Checkbox, ErrorText, Field, Form, Input } from '../components';
import { IS_DEVELOPMENT } from '../constants';
import { register } from '../redux/actions/auth';
import { styles } from '../styles';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter email'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Please enter password'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      ...(IS_DEVELOPMENT ? { isSuperUser: false } : null),
    },
    validateOnChange: false,
    validationSchema,
    onSubmit: ({ email, password, isSuperUser }) => {
      dispatch(register(email, password, isSuperUser));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} fullWidth>
      <Field>
        <Input
          name="email"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorText>{formik.errors.password}</ErrorText>
        )}
      </Field>
      {IS_DEVELOPMENT && (
        <Field>
          <Checkbox
            name="isSuperUser"
            label="Create admin account (only for testing)"
            checked={formik.values.isSuperUser}
            onChange={(event) => {
              formik.setFieldValue(event.target.name, event.target.checked);
            }}
          />
        </Field>
      )}
      <Field className={styles.flexCenter}>
        <Button variant="primary" type="submit">
          Create account
        </Button>
      </Field>
    </Form>
  );
};

export default RegisterForm;
