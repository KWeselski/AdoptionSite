import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import Select from "../components/Select";
import Field from "../components/Field";
import axios from "axios";
import Checkbox from "../components/Checkbox";
import styles from "../styles";
import { useParams } from "react-router-dom";

const options = {
  previousPets: ["No", "Yes"],
  children: ["No", "Yes"],
  homeType: ["House", "Apartment"],
  petDuration: ['Less than 2 hours', '2-4 hours', '4-6 hours', '6-8 hours', 'More than 8 hours'],
  dailyExercise: ['Short walks', 'Medium-length walks', 'Long walks or runs', 'Home exercises and games', 'Joint exercises'],
  activityType: ['Outdoor activities', 'Training', 'Home games', 'Spending time with other dogs', 'Relaxation']
};

const validationSchema = Yup.object({
  personalInformation: Yup.object().shape({
    firstName: Yup.string().required("Add first name"),
    lastName: Yup.string().required("Add last name"),  
    phoneNumber: Yup.string().required("Add phone number").matches(/^\d{9,15}$/, "Incorrect phone number."),
    email: Yup.string().matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Incorrect format").required("Add email"),
    address: Yup.object().shape({
      city: Yup.string().required("Add city"),
      street: Yup.string().required("Add street"),
    }),
  }),
  homeInformation: Yup.object().shape({
    type: Yup.string().required("Select home type"),
    children: Yup.string().required("Select children"),
  }),
  experience: Yup.object().shape({
    previousPets: Yup.string().required("Select previous pets"),
    petDuration: Yup.string().required("Select pet duration"),
  }),
  careAndActivityPlans: Yup.object().shape({
  dailyExercise: Yup.array().min(1, 'Select at least one option'),
  activityType: Yup.array().min(1, 'Select at least one option')
 })
});

const createApplication = async (applicationData, petId) => {
  console.log(applicationData)
  try {
    await axios.post("/api/applications/add", {pet: petId, ...applicationData});
  } catch (error) {
    console.error(error);
  }
};

const applicationForm = () => {
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      personalInformation: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: {
          city: "",
          street: ""
        }
      },
      homeInformation: {
        type: "House",
        children: "No",
      },
      experience: {
      previousPets: "No",
      petDuration: "Less than 2 hours",
      },
      careAndActivityPlans: {
      dailyExercise: [],
      activityType: [],
      }
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      createApplication(values, id);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full justify-center flex flex-col"
    >
      <div className="flex flex-col md:flex-row  gap-4 ">
        <div className="w-full md:w-1/2">
          <Field>
            <Input
              label="First Name"
              name="personalInformation.firstName"
              onChange={formik.handleChange}
              value={formik.values.personalInformation.firstName}
            />
            {formik.errors.personalInformation?.firstName ? (
              <ErrorText>{formik.errors.personalInformation.firstName}</ErrorText>
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
              <ErrorText>{formik.errors.personalInformation.lastName}</ErrorText>
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
              <ErrorText>{formik.errors.personalInformation.phoneNumber}</ErrorText>
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
              <ErrorText>{formik.errors.personalInformation.address.city}</ErrorText>
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
              <ErrorText>{formik.errors.personalInformation.address.street}</ErrorText>
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
        </div>
        <div className="w-full md:w-1/2">
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
            <Checkbox
            name="careAndActivityPlans.activityType"
            label="What kind of activities would you like to do with your dog?" 
            options={options.activityType}
            values={formik.values.careAndActivityPlans.activityType}
            handleChange={formik.handleChange}
            />
            {formik.errors.careAndActivityPlans?.activityType ? (
            <ErrorText>{formik.errors.careAndActivityPlans.activityType}</ErrorText>
             ) : null}
            </Field>
          <Field>
            <Checkbox 
            name="careAndActivityPlans.dailyExercise" 
            label="How much time can you spend with your dog?"
            options={options.dailyExercise}
            values={formik.values.careAndActivityPlans.dailyExercise}
            handleChange={formik.handleChange}
            />
          {formik.errors.careAndActivityPlans?.dailyExercise ? (
              <ErrorText>{formik.errors.careAndActivityPlans.dailyExercise}</ErrorText>
          ) : null}
          </Field>
        </div>
      </div>
      <Field className={styles.flexCenter}>
        <Button variant="primary" type="submit">Send application</Button>
      </Field>
    </form>
  );
};

export default applicationForm;
