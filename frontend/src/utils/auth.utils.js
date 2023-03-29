import * as yup from 'yup';
const signInInitialValue = {
    username: '',
    password: ''
}

const signInSchema = yup.object().shape({
    username: yup.string().required("username is required").min(3, "minimum 3 letters are required"),
    password: yup.string().required("password is required").min(6, "minimum six characters password are required")
})

const signUpInitialValue = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpassword: ''
}

const signUpSchema = yup.object().shape({
    firstname: yup.string().required("firstname is required").min(3, "minimum 3 letters are required"),
    lastname: yup.string().required("lastname is required").min(3, "minimum 3 letters are required"),
    username: yup.string().required("username is required").min(3, "minimum 3 letters are required"),
    password: yup.string().required("password is required").min(6, "minimum six characters password are required"),
    confirmpassword:  yup.string().required('confirm password is required.').oneOf([yup.ref('password')], 'passwords do not match.')
})

const authUtills = {
    signUpInitialValue,
    signUpSchema,
    signInInitialValue,
    signInSchema
}

export default authUtills;