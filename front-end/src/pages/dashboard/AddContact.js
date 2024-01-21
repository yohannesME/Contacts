import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  createContact,
  editContact,
} from "../../features/contact/contactSlice";
import { useEffect } from "react";
const Addcontact = () => {
  const {
    isLoading,
    relation,
    relationOption,
    name,
    location,
    email,
    mobilePhone,
    createdAt,
    officePhone,
    isEditing,
    editContactId,
  } = useSelector((store) => store.contact);


  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !location || !mobilePhone) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editContact({
          contactId: editContactId,
          contact: {
            name,
            email,
            location,
            relation,
            mobilePhone,
            officePhone,
            createdAt,
          },
        })
      );
      return;
    }
    dispatch(
      createContact({
        name,
        email,
        location,
        relation,
        mobilePhone,
        officePhone,
        createdAt,
      })
    );
  };

  const handlecontactInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  // useEffect(() => {
  //   if (!isEditing) {
  //     dispatch(
  //       handleChange({
  //         name: "contactLocation",
  //         value: user.location,
  //       })
  //     );
  //   }
  // }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit contact" : "add job"}</h3>
        <div className="form-center">
          {/* email */}
          <FormRow
            type="text"
            name="email"
            value={email}
            handleChange={handlecontactInput}
          />
          {/* name */}
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handlecontactInput}
          />
          {/* location */}
          <FormRow
            type="text"
            name="location"
            labelText="contact location"
            value={location}
            handleChange={handlecontactInput}
          />
          {/* mobilePhone */}
          <FormRow
            type="text"
            name="mobilePhone"
            labelText="Mobile Phone"
            value={mobilePhone}
            handleChange={handlecontactInput}
          />
          {/* office Phone */}
          <FormRow
            type="text"
            name="officePhone"
            labelText="Office Phone"
            value={officePhone}
            handleChange={handlecontactInput}
          />
          {/* relation */}
          <FormRowSelect
            name="relation"
            value={relation}
            handleChange={handlecontactInput}
            list={relationOption}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default Addcontact;
