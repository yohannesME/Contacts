import { useEffect } from "react";
import Contact from "./Contact";
import Wrapper from "../assets/wrappers/ContactsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";
import { getAllContacts } from "../features/allJobs/allContactsSlice";
const ContactsContainer = () => {
  const {
    contacts,
    isLoading,
    page,
    totalContacts,
    numOfPages,
    search,
    searchRelation,
    searchType,
    sort,
  } = useSelector((store) => store.allContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  }, [page, search, searchRelation, searchType, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (contacts.length === 0) {
    return (
      <Wrapper>
        <h2>No contacts to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalContacts} contact{contacts.length > 1 && "s"} found
      </h5>
      <div className="contacts">
        {contacts.map((job) => {
          return <Contact key={contacts._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default ContactsContainer;
