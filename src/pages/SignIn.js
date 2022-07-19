import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage, } from "formik";
import Container from '../components/ui/Container'
import ErrorMessageComp from '../components/form/ErrorMessage'
import { useTokenContext } from '../context/tokenContext'
import { EMAIL_REGEX } from '../util/regex'
import { ERROR_TOAST } from '../util/toast.options';
import { signInRequest } from '../api/auth'

const SignIn = () => {
    const { setTokenTo } = useTokenContext()
    const navigate = useNavigate()

    return (
        <Container>
            <div className="h-[500px] flex items-center justify-center">
                <div className='font-medium text-lg rounded-3xl shadow-3xl p-10 transform hover:scale-105 transition-transform duration-500'>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}

                        validate={(values) => {
                            const errors = {}
                            const { email } = values
                            const valuesName = Object.keys(values)

                            // Check for a valid email
                            if (!EMAIL_REGEX.test(email)) {
                                errors.email = "Make sure you're typing a valid email"
                            }

                            // Check for input is not empty
                            Object.values(values).forEach((each, value) => {
                                if (!each) {
                                    errors[valuesName[value]] = `Please fill up the ${valuesName[value]} field`
                                }
                            })

                            return errors
                        }}

                        onSubmit={async (values, actions) => {
                            const res = await signInRequest(values)
                            if (res.data.token) {
                                setTokenTo(res.data.token)
                                actions.resetForm()
                                navigate('/')
                            }
                            else {
                                switch (res.status) {
                                    case 404:
                                        toast("User not registered", ERROR_TOAST)

                                    // eslint-disable-next-line
                                    case 406:
                                        toast("Incorrect password", ERROR_TOAST)
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className='form-control'>
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name='email' component={() => <ErrorMessageComp touched={touched.email} content={errors.email} />} />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name='password' component={() => <ErrorMessageComp touched={touched.password} content={errors.password} />} />
                                </div>
                                <div className="form-control">
                                    <button type='submit' className='btn btn-primary opacity-90 mx-auto'>Sign In</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    )
}

export default SignIn