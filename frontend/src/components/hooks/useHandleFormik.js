import { useFormik } from 'formik';

const useHandleFormik = (initialValue,validationSchema, handleSubmit) => {
    const handleFormik = useFormik({
        initialValues: initialValue,
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
            try {
                handleSubmit();
                console.log(values);
                setSubmitting(false);
                resetForm();
            } catch (error) {
                setSubmitting(false);
                setErrors(error);
            }
        }

    })
    return handleFormik;
}

export default useHandleFormik;
