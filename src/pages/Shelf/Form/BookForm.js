import { useId } from "react";
import { toast } from "react-toastify";
import { AiOutlineCaretDown, AiOutlineCalendar } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorMessageHandler from "../../../components/form/ErrorMessage";
import { useTokenContext } from "../../../context/tokenContext";
import { useActionsBooksContext } from "../../../context/actionsBookContext";
import { createBookReq, updateBookReq } from "../../../api/books";
import { URL_REGEX } from "../../../util/regex";
import { ACTION_DISCARTED, BOOK_SUCCESS_TOAST } from "../../../util/toast.options";

const BookForm = () => {
  const { token, user } = useTokenContext();
  const { action, formValues, resetAction } = useActionsBooksContext();
  const reactId = useId();
  const nameId = `${reactId}:name`;
  const descripId = `${reactId}:descrip`;
  const formValuesName = Object.keys(formValues);

  function validateForm(values) {
    const errors = {};
    values.visibility = values.visibility

    // Check image
    if (!URL_REGEX.test(values.imgUrl)) errors.imgUrl = "Invalid URL";

    // Check for input is not empty
    Object.values(values).forEach((each, index) => {
      if (!each) {
        errors[formValuesName[index]] = `Please fill up the field`;
      }
    });

    return errors;
  }

  async function handleSubmit(values, actions) {
    const {
      name,
      author,
      description,
      category,
      published,
      imgUrl,
      visibility
    } = values;
    const book = {
      ownerId: user._id,
      name,
      author,
      description,
      category,
      published,
      imgUrl,
      visibility,
    };
    console.log('first')
    if (action === "edit") {
      // If the user wants to edit some book, the form will got a new hidden field which is "id"
      const res = await updateBookReq(book, values.id, token)
      if (res.status === 200) {
        toast("Book updated successfully. Reload for see changes", BOOK_SUCCESS_TOAST)
        resetAction()
        actions.resetForm()
      }
    } else if (action === "create") {
      const res = await createBookReq(book, token);
      if (res.status === 201) {
        toast("New book created successfully. Reload for see changes", BOOK_SUCCESS_TOAST);
        actions.resetForm();
      }
    }


  }

  return (
    <section className="px-4 py-5 border-r border-dashed border-gray-400/25 basis-1/5">
      <Formik
        initialValues={formValues}
        validate={validateForm}
        enableReinitialize={true}
      >
        {({ errors, touched, values, resetForm }) => (
          <Form>
            <div className="form-control font-medium text-sm">
              <label htmlFor={nameId}>Name</label>
              <Field
                id={nameId}
                name="name"
                type="text"
                autoComplete="off"
              ></Field>
              <ErrorMessage
                name="name"
                component={() => (
                  <ErrorMessageHandler
                    touched={touched.name}
                    content={errors.name}
                    textSmall={true}
                  />
                )}
              />
            </div>
            <div className="form-control font-medium text-sm">
              <label htmlFor="author">Author</label>
              <Field
                id="author"
                name="author"
                type="text"
                autoComplete="off"
              ></Field>
              <ErrorMessage
                name="author"
                component={() => (
                  <ErrorMessageHandler
                    touched={touched.author}
                    content={errors.author}
                    textSmall={true}
                  />
                )}
              />
            </div>
            <div className="form-control font-medium text-sm">
              <label htmlFor={descripId}>Description</label>
              <Field
                id={descripId}
                name="description"
                as="textarea"
                autoComplete="off"
                className="scroll"
              ></Field>
              <ErrorMessage
                name="description"
                component={() => (
                  <ErrorMessageHandler
                    touched={touched.description}
                    content={errors.description}
                    textSmall={true}
                  />
                )}
              />
            </div>
            <div className="w-full relative">
              <div className="form-control font-medium text-sm">
                <label htmlFor="published">Date of publication</label>
                <Field
                  id="published"
                  name="published"
                  type="date"
                  autoComplete="off"
                ></Field>
                <ErrorMessage
                  name="published"
                  component={() => (
                    <ErrorMessageHandler
                      touched={touched.published}
                      content={errors.published}
                      textSmall={true}
                    />
                  )}
                />
              </div>
              <AiOutlineCalendar className="absolute top-8 right-1.5 cursor-pointer pointer-events-none text-gray-400" />
            </div>
            <div className="form-control font-medium text-sm">
              <label htmlFor="category">Category</label>
              <div className="w-full relative">
                <Field
                  id="category"
                  name="category"
                  autoComplete="off"
                  as="select"
                >
                  <option value="sciencie">Sciencie fiction</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="horror">Horror</option>
                  <option value="police">Police</option>
                  <option value="history">History</option>
                </Field>

                <AiOutlineCaretDown className="absolute right-2 top-1.5 text-gray-400 pointer-events-none" />
                <ErrorMessage
                  name="category"
                  component={() => (
                    <ErrorMessageHandler
                      touched={touched.category}
                      content={errors.category}
                      textSmall={true}
                    />
                  )}
                />
              </div>
            </div>
            <div className="form-control font-medium text-sm">
              <label htmlFor="visibility">Visibility</label>
              <div className="w-full relative">
                <Field
                  id="visibility"
                  name="visibility"
                  autoComplete="off"
                  as="select"
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </Field>
                <AiOutlineCaretDown className="absolute right-2 top-1.5 text-gray-400 pointer-events-none" />
                <ErrorMessage
                  name="visibility"
                  component={() => (
                    <ErrorMessageHandler
                      touched={touched.visibility}
                      content={errors.visibility}
                      textSmall={true}
                    />
                  )}
                />
              </div>
            </div>
            <div className="form-control font-medium text-sm">
              <label htmlFor="imgUrl">Image URL</label>
              <Field
                id="imgUrl"
                name="imgUrl"
                type="text"
                autoComplete="off"
              ></Field>
              <ErrorMessage
                name="imgUrl"
                component={() => (
                  <ErrorMessageHandler
                    touched={touched.imgUrl}
                    content={errors.imgUrl}
                    textSmall={true}
                  />
                )}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-white/10 px-10 py-3 rounded-md text-sm font-medium w-full hover:bg-white/20 transition-colors"
                onClick={() => handleSubmit(values, { resetForm })}
              >
                {action === "edit" ? "Update" : "Create"}
              </button>
              {action === "edit" && (
                <button
                  type="button"
                  className="bg-white/10 px-10 py-3 rounded-md text-sm font-medium w-full hover:bg-red-200/20 transition-colors"
                  onClick={() => {
                    toast("Edit discarted", ACTION_DISCARTED)
                    resetAction()
                  }}
                >
                  Discard
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default BookForm;
