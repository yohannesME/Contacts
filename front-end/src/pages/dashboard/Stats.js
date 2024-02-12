import { useEffect } from "react";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/allContactsSlice";

const Stats = () => {
  const { isLoading } = useSelector(
    (store) => store.allContacts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return (
    <>
      <StatsContainer />
      {  <ChartsContainer />}
    </>
  );
};
export default Stats;
