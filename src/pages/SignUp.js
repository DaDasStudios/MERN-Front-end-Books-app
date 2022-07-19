import { useNavigate } from 'react-router-dom'
import { BiInfoCircle } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { Formik, Form, Field, ErrorMessage, } from "formik";
import ErrorMessageComp from '../components/form/ErrorMessage'
import Container from '../components/ui/Container'
import { useTokenContext } from '../context/tokenContext'
import { ERROR_TOAST } from '../util/toast.options';
import { EMAIL_REGEX, USERNAME_REGEX } from '../util/regex'
import { signUpRequest } from '../api/auth'
import { BOOK_SUCCESS_TOAST } from '../util/toast.options'

const SignUp = () => {
    const { setTokenTo } = useTokenContext()
    const navigate = useNavigate()

    return (
        <Container>
            <div className="flex items-center justify-center mb-40">
                <div className='font-medium text-lg rounded-3xl shadow-3xl p-10 transform hover:scale-105 transition-transform duration-500'>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            matchPassword: ''
                        }}

                        validate={(values) => {
                            const errors = {}
                            const { username, email, password, matchPassword } = values
                            const valuesName = Object.keys(values)

                            // Check for a valid username
                            if (!USERNAME_REGEX.test(username)){
                                errors.username = "Only letters and spaces are allowed for username"
                            }

                            // Check for a valid email
                            if (!EMAIL_REGEX.test(email)) {
                                errors.email = "Make sure you're typing a valid email"
                            }

                            // Check for password length 
                            if (password.length < 4) {
                                errors.password = "Password must be atleast four characters"
                            }

                            // Chech for match password
                            if (password !== matchPassword) {
                                errors.matchPassword = "Password and confirm password must match"
                            }

                            // Check for input is not empty
                            Object.values(values).forEach((each, value) => {
                                if (!each) {
                                    errors[valuesName[value]] = `Please fill up the ${valuesName[value]} field`
                                }
                            })

                            return errors
                        }}

                        onSubmit={ async (values, actions) => {
                            const res = await signUpRequest({ username: values.username, email: values.email, password: values.password})
                            if (res.data.token) {
                                setTokenTo(res.data.token)
                                actions.resetForm()
                                navigate('/')
                                toast("Account create successfully", BOOK_SUCCESS_TOAST)
                            }
                            else if (res.status === 400) toast("Email already registered", ERROR_TOAST)
                        }}
                    >
                        {({errors, touched}) => (
                            <Form>
                                <div className='form-control'>
                                    <label htmlFor="username">Username</label>
                                    <Field
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name='username' component={() => <ErrorMessageComp touched={touched} content={errors.username}/>}/>
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name='email' component={() => <ErrorMessageComp touched={touched.email} content={errors.email}/>}/>
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name='password' component={() => <ErrorMessageComp touched={touched.password} content={errors.password}/>}/>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="matchPassword">Confirm password</label>
                                    <Field
                                        id="matchPassword"
                                        name="matchPassword"
                                        type="password"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name='matchPassword' component={() => <ErrorMessageComp touched={touched.matchPassword} content={errors.matchPassword}/>}/>
                                    <p className='text-gray-400 font-normal'><BiInfoCircle className='inline mr-1 mb-1' />We will never share your information with third parties</p>
                                </div>
                                <div className="form-control">
                                    <button type='submit' className='btn btn-primary opacity-90 mx-auto'>Sign Up</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    )
}

export default SignUp