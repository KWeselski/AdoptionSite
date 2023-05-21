import React from 'react';

import SectionHero from '../components/SectionHero';
import ApplicationForm from '../forms/ApplicationForm';
import styles from '../styles';

const ApplicationPage = () => (
  <div className={`${styles.flexCenter} flex-col`}>
    <SectionHero title="Application for adoption" />
    <div className="bg-white p-6 rounded-lg shadow">
      <ApplicationForm />
    </div>
  </div>
);

export default ApplicationPage;
