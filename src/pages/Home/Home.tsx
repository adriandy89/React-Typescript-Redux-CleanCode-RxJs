import { People } from "@/data";
import { addPeople } from "@/redux/states";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PeopleTable } from "./components";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(addPeople(People));
  }, []);


  return (
    <>
     <PeopleTable />
    </>
  );
};

export default Home;
