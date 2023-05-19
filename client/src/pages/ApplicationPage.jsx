import React from 'react'
import ApplicationForm from "../forms/ApplicationForm";
import SectionHero from "../components/SectionHero";
import styles from "../styles";

const ApplicationPage = () => {
  const handleCheck = (id) => {
    return () => {
      setOpen(true);
      setId(id);
    };
  };

  return (
    <div className={`${styles.flexCenter} flex-col`}>
      <SectionHero title="Application for adoption"/>
      <div className="bg-white p-6 rounded-lg shadow">
        <ApplicationForm />
      </div>
      </div>
  );
}

export default ApplicationPage