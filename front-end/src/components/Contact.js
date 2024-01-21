import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Contact";
import { useDispatch } from "react-redux";
import ContactInfo from "./ContactInfo";
import moment from "moment";
import {
  deleteContact,
  setEditContact,
} from "../features/contact/contactSlice";

const Contact = ({
  _id,
  relation,
  name,
  location,
  mobilePhone,
  createdAt,
  officePhone,
  email,
}) => {
  const dispatch = useDispatch();

  console.log(email);

  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p> {officePhone && `Office Phone : ${officePhone}`}</p>
          <p> {mobilePhone && `Mobile Phone : ${mobilePhone}`}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ContactInfo icon={<FaLocationArrow />} text={location} />
          <ContactInfo icon={<FaBriefcase />} text={email} />
          <ContactInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${relation}`}>{relation}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-contact"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditContact({
                    editContactId: _id,
                    relation,
                    email,
                    name,
                    location,
                    mobilePhone,
                    officePhone,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteContact(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Contact;
