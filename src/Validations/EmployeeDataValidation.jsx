import * as Yup from "yup";

export const employeeDataValidationSchema = Yup.object().shape({
            employeeName: Yup.string().required('Employee name is required'),
            employeeEmail: Yup.string().email('Invalid Email address').required('Employee email is required'),
            jobTitle: Yup.string().required('Job title is required'),
            employeeAge: Yup.number('Employee age is required').min(18, 'You must be at least 18 years old').required('Employee age is required'),
        });