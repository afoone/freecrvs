import React from 'react'
import { getFullName, getIdentifiers } from './ImmunizationList'

const PatientData = ({ patient }) => {
  return (
    <div>
      <div className="ui card">
        <div className="image">
          <img
            src={
              patient.gender === 'male'
                ? 'http://www.multimediaenglish.org/wp-content/uploads/2011/11/MysteryMan.jpg'
                : 'https://www.citycentrerecruitment.co.uk/wp-content/uploads/2019/03/mystery-woman.jpg'
            }
          />
        </div>
        <div className="content">
          <a className="header">{patient._id && getFullName(patient)}</a>
          <div className="meta">
            {patient._id ? (
              <span className="date">Birth Date: {patient.dateOfBirth}</span>
            ) : (
              <span className="date">New Patient</span>
            )}
          </div>
          <div className="description"></div>
        </div>
        <div className="extra content">
          {patient && getIdentifiers(patient)}
        </div>
      </div>
    </div>
  )
}

export default PatientData
