import * as Yup from "yup";

export const companyDataValidationSchema = Yup.object({
    companyName: Yup.string().required('Company name is required'),
    companyEmail: Yup.string().email('Invalid email address').required('Email is required'),
    description: Yup.string(),
});