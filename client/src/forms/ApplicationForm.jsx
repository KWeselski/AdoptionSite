import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Input,
  Button,
  ErrorText,
  Select,
  Field,
  Checkbox,
  Form,
} from '../components';
import { setError } from '../redux/actions/errors';
import styles from '../styles';
import authRequest from '../utils/authRequest';

const options = {
  previousPets: ['No', 'Yes'],
  children: ['No', 'Yes'],
  homeType: ['House', 'Apartment'],
  petDuration: [
    '< 1 year',
    '1-3 years',
    '4-6 years',
    '6-8 years',
    'More than 8 years',
  ],
  dailyExercise: [
    'Short walks',
    'Medium-length walks',
    'Long walks or runs',
    'Home exercises and games',
    'Joint exercises',
  ],
  activityType: [
    'Outdoor activities',
    'Training',
    'Home games',
    'Spending time with other dogs',
    'Relaxation',
  ],
};

const validationSchema = Yup.object({
  personalInformation: Yup.object().shape({
    firstName: Yup.string().required('Add first name'),
    lastName: Yup.string().required('Add last name'),
    phoneNumber: Yup.string()
      .required('Add phone number')
      .matches(/^\d{9,15}$/, 'Incorrect phone number.'),
    email: Yup.string().email('Invalid email address').required('Add email'),
    address: Yup.object().shape({
      city: Yup.string().required('Add city'),
      street: Yup.string().required('Add street'),
    }),
  }),
  homeInformation: Yup.object().shape({
    type: Yup.string().required('Select home type'),
    children: Yup.string().required('Select children'),
  }),
  experience: Yup.object().shape({
    previousPets: Yup.string().required('Select previous pets'),
    petDuration: Yup.string().required('Select pet duration'),
  }),
  careAndActivityPlans: Yup.object().shape({
    dailyExercise: Yup.array().min(1, 'Select at least one option'),
    activityType: Yup.array().min(1, 'Select at least one option'),
  }),
});

const createApplication = async (
  applicationData,
  petId,
  navigate,
  dispatch
) => {
  try {
    await authRequest.post('/api/applications/add', {
      pet: petId,
      ...applicationData,
    });
    navigate(`/animals/${petId}`);
  } catch (error) {
    dispatch(setError(error.response.data.error));
  }
};

const ApplicationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      personalInformation: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: {
          city: '',
          street: '',
        },
      },
      homeInformation: {
        type: 'House',
        children: 'No',
      },
      experience: {
        previousPets: 'No',
        petDuration: '< 1 year',
      },
      careAndActivityPlans: {
        dailyExercise: [],
        activityType: [],
      },
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => createApplication(values, id, navigate, dispatch),
  });

  return (
    <Form onSubmit={formik.handleSubmit} fullWidth>
      <Form.Row>
        <Form.Column>
          <Field>
            <Input
              label="First Name"
              name="personalInformation.firstName"
              onChange={formik.handleChange}
              value={formik.values.personalInformation.firstName}
            />
            {formik.errors.personalInformation?.firstName ? (
              <ErrorText>
                {formik.errors.personalInformation.firstName}
              </ErrorText>
            ) : null}
          </Field>
          <Field>
            <Input
              label="Last Name"
              name="personalInformation.lastName"
              onChange={formik.handleChange}
              value={formik.values.personalInformation.lastName}
            />
            {formik.errors.personalInformation?.lastName ? (
              <ErrorText>
                {formik.errors.personalInformation.lastName}
              </ErrorText>
            ) : null}
          </Field>
          <Field>
            <Input
              label="Phone Number"
              name="personalInformation.phoneNumber"
              tel
              onChange={formik.handleChange}
              value={formik.values.personalInformation.phoneNumber}
            />
            {formik.errors.personalInformation?.phoneNumber ? (
              <ErrorText>
                {formik.errors.personalInformation.phoneNumber}
              </ErrorText>
            ) : null}
          </Field>
          <Field>
            <Input
              label="Email"
              name="personalInformation.email"
              tel
              onChange={formik.handleChange}
              value={formik.values.personalInformation.email}
            />
            {formik.errors.personalInformation?.email ? (
              <ErrorText>{formik.errors.personalInformation.email}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Input
              label="City"
              name="personalInformation.address.city"
              onChange={formik.handleChange}
              value={formik.values.personalInformation.address.city}
            />
            {formik.errors.personalInformation?.address?.city ? (
              <ErrorText>
                {formik.errors.personalInformation.address.city}
              </ErrorText>
            ) : null}
          </Field>
          <Field>
            <Input
              label="Street"
              name="personalInformation.address.street"
              onChange={formik.handleChange}
              value={formik.values.personalInformation.address.street}
            />
            {formik.errors.personalInformation?.address?.street ? (
              <ErrorText>
                {formik.errors.personalInformation.address.street}
              </ErrorText>
            ) : null}
          </Field>
          <Field>
            <Select
              label="What type of home do you live in?"
              name="homeInformation.type"
              onChange={formik.handleChange}
              value={formik.values.homeInformation.type}
              options={options.homeType}
            />
            {formik.errors.homeInformation?.type ? (
              <ErrorText>{formik.errors.homeInformation?.type}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Select
              label="Do you have children?"
              name="homeInformation.children"
              onChange={formik.handleChange}
              value={formik.values.homeInformation.children}
              options={options.children}
            />
            {formik.errors.homeInformation?.children ? (
              <ErrorText>{formik.errors.homeInformation.children}</ErrorText>
            ) : null}
          </Field>
        </Form.Column>
        <Form.Column>
          <Field>
            <Select
              label="Did you have a pet before?"
              name="experience.previousPets"
              onChange={formik.handleChange}
              value={formik.values.experience.previousPets}
              options={options.previousPets}
            />
            {formik.errors.experience?.previousPets ? (
              <ErrorText>{formik.errors.experience.previousPets}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Select
              label="How long did you have a pet?"
              name="experience.petDuration"
              onChange={formik.handleChange}
              value={formik.values.experience.petDuration}
              options={options.petDuration}
            />
            {formik.errors.experience?.petDuration ? (
              <ErrorText>{formik.errors.experience.petDuration}</ErrorText>
            ) : null}
          </Field>
          <Field>
            <Checkbox.Multi
              name="careAndActivityPlans.activityType"
              label="What kind of activities would you like to do with your dog?"
              options={options.activityType}
              values={formik.values.careAndActivityPlans.activityType}
              handleChange={formik.handleChange}
            />
            {formik.errors.careAndActivityPlans?.activityType ? (
              <ErrorText>
                {formik.errors.careAndActivityPlans.activityType}
              </ErrorText>
            ) : null}
          </Field>
          <Field>
            <Checkbox.Multi
              name="careAndActivityPlans.dailyExercise"
              label="How much time can you spend with your dog?"
              options={options.dailyExercise}
              values={formik.values.careAndActivityPlans.dailyExercise}
              handleChange={formik.handleChange}
            />
            {formik.errors.careAndActivityPlans?.dailyExercise ? (
              <ErrorText>
                {formik.errors.careAndActivityPlans.dailyExercise}
              </ErrorText>
            ) : null}
          </Field>
        </Form.Column>
      </Form.Row>
      <Field className={styles.flexCenter}>
        <Button variant="primary" type="submit">
          Send application
        </Button>
      </Field>
    </Form>
  );
};

export default ApplicationForm;
