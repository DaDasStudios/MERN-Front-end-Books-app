import { useId } from "react";
import { toast } from 'react-toastify'
import { BiInfoCircle } from 'react-icons/bi'
import { Formik, Form, ErrorMessage, Field } from "formik";
import ErrorMessageHandler from "../../../components/form/ErrorMessage";
import { useTokenContext } from "../../../context/tokenContext";
import { ACCOUNT_UPDATED_TOAST, ERROR_TOAST } from '../../../util/toast.options'
import { USERNAME_REGEX, EMAIL_REGEX } from "../../../util/regex";
import { updateUser } from '../../../api/auth'

const UserForm = () => {
    const { user, token, setUser } = useTokenContext();
    const reactId = useId();
    const usernameId = reactId + "username";
    const emailId = reactId + "email";
    const passwordId = reactId + "pwd";

    const INITIAL_VALUES = {
        username: user.username,
        email: user.email,
        password: "",
    };
    const VALUES_NAMES = Object.keys(INITIAL_VALUES);

    function validateForm(values) {
        const errors = {};

        // Check email and username
        if (!EMAIL_REGEX.test(values.email)) errors.email = "Invalid email";
        if (!USERNAME_REGEX.test(values.username))
            errors.username = "Invalid username";

        // Check for input is not empty
        Object.values(values).forEach((each, index) => {
            if (!each) {
                errors[VALUES_NAMES[index]] = `Please fill up the field`;
            }
        });

        return errors
    }

    async function handleSubmit(values) {
        const { username, email, password } = values
        const res = await updateUser(token, {
            id: user._id, username, email, password
        })

        if (res.status === 201) {
            toast("Account updated successfully!", ACCOUNT_UPDATED_TOAST)
            setUser(res.data)
        } else {
            toast("Something went wrong", ERROR_TOAST)
        }
    }

    return (
        <section className="px-4 py-5 border-r border-dashed border-gray-400/25 basis-1/5">
            <Formik
                enableReinitialize={true}
                initialValues={INITIAL_VALUES}
                validate={validateForm}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="form-control text-sm font-medium">
                            <label htmlFor={usernameId}>Username</label>
                            <Field
                                id={usernameId}
                                name="username"
                                type="text"
                                autoComplete="off"
                            ></Field>
                            <ErrorMessage
                                name="username"
                                component={() => (
                                    <ErrorMessageHandler
                                        content={errors.username}
                                        touched={touched.username}
                                        textSmall={true}
                                    />
                                )}
                            ></ErrorMessage>
                        </div>

                        <div className="form-control text-sm font-medium">
                            <label htmlFor={emailId}>Email</label>
                            <Field
                                id={emailId}
                                name="email"
                                type="text"
                                autoComplete="off"
                            ></Field>
                            <ErrorMessage
                                name="email"
                                component={() => (
                                    <ErrorMessageHandler
                                        content={errors.email}
                                        touched={touched.email}
                                        textSmall={true}
                                    />
                                )}
                            ></ErrorMessage>
                        </div>

                        <div className="form-control text-sm font-medium">
                            <label htmlFor={passwordId}>Password</label>
                            <Field
                                id={passwordId}
                                name="password"
                                type="password"
                                autoComplete="off"
                            ></Field>
                            <p className='text-gray-400 font-normal'><BiInfoCircle className='inline mr-1 mb-1' />Please type your password for updating your data</p>
                            <ErrorMessage
                                name="password"
                                component={() => (
                                    <ErrorMessageHandler
                                        content={errors.password}
                                        touched={touched.password}
                                        textSmall={true}
                                    />
                                )}
                            ></ErrorMessage>
                        </div>

                        <button className="bg-white/10 px-10 py-3 rounded-md text-sm font-medium w-full hover:bg-white/20 transition-colors" type="submit">Update</button>

                    </Form>
                )}
            </Formik>
        </section>
    );
};

export default UserForm;
