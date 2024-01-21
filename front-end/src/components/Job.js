import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch } from "react-redux";
import ContactInfo from "./JobInfo";
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

  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{mobilePhone}</h5>
          <h5>{officePhone}</h5>
          <p>{name}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ContactInfo icon={<FaLocationArrow />} text={location} />
          <ContactInfo icon={<FaCalendarAlt />} text={date} />
          <contactInfo icon={<FaBriefcase />} text={email} />
          <div className={`status ${relation}`}>{relation}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditContact({
                    editcontactId: _id,
                    relation,
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
