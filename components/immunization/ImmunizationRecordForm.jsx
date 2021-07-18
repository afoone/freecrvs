import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import AddressFacilityForm from "../adresss/AddressFacilityForm";

const ImmunizationRecordForm = ({
  title,
  immunization,
  setImmunization,
  errors,
  nextVisit,
}) => {
  const [aefi, setAefi] = useState(false);

  useEffect(() => {
    setAefi(immunization.aefi && immunization.aefi.length > 0);
  }, [immunization.aefi]);

  useEffect(() => {
    if (immunization.firstDoseDate)
      setImmunization({ ...immunization, date: immunization.firstDoseDate });
    else {
      setImmunization({ ...immunization, firstDoseDate: immunization.date });
    }
  }, []);

  return (
    <div>
      <h2 className="ui dividing header">{title}</h2>
      <div className="two fields">
        <div className="ui field">
          <label>Date of vaccination</label>
          <div className="datepicker-full">
            {/* first dose date for compatibility with version 1.0 */}
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={immunization.firstDoseDate}
              isClearable
              minDate={new Date("2021-03-01")}
              maxDate={new Date()}
              onChange={(date) =>
                setImmunization({
                  ...immunization,
                  firstDoseDate: date,
                })
              }
            />
          </div>
          {errors.firstDoseDate && (
            <div className="error">{errors.firstDoseDate}</div>
          )}
        </div>
        <div className="ui field">
          <label>Name of vaccine</label>
          <select
            name="last-name"
            value={immunization.nameOfTheVaccine}
            className="ui dropdown"
            required
            onChange={(e) =>
              setImmunization({
                ...immunization,
                nameOfTheVaccine: e.target.value,
              })
            }
            placeholder="Name of the vaccine"
          >
            <option></option>
            <option>Astrazeneca</option>
            <option>Sinopharm</option>
            <option>Pfizer-BioNTech</option>
            <option>Moderna</option>
            <option>NovaVax</option>
            <option>Jhonson&Jhonson - Jansen</option>
          </select>
          {errors.nameOfTheVaccine && (
            <div className="error">{errors.nameOfTheVaccine}</div>
          )}
        </div>
      </div>
      <AddressFacilityForm
        address={immunization.placeofVaccination}
        setAddress={(address) =>
          setImmunization({ ...immunization, placeofVaccination: address })
        }
        title="Place of vaccination"
      ></AddressFacilityForm>
      <div className="two fields">
        <div className="ui field">
          <label>Batch Number</label>
          <input
            type="text"
            name="last-name"
            value={immunization.batchNumber}
            required
            onChange={(e) =>
              setImmunization({
                ...immunization,
                batchNumber: e.target.value.toUpperCase(),
              })
            }
            placeholder="Batch Number"
          ></input>
          {errors.batchNumber && (
            <div className="error">{errors.batchNumber}</div>
          )}
        </div>
        <div className="ui field">
          <label>Serial Number</label>
          <input
            type="text"
            name="last-name"
            value={immunization.serialNumber}
            required
            onChange={(e) =>
              setImmunization({
                ...immunization,
                serialNumber: e.target.value.toUpperCase(),
              })
            }
            placeholder="Serial Number"
          ></input>
          {errors.serialNumber && (
            <div className="error">{errors.serialNumber}</div>
          )}
        </div>
        <div className="ui field">
          <label>Expiry Date</label>
          <div className="datepicker-full">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              isClearable
              selected={
                immunization.expiryDate
                  ? new Date(immunization.expiryDate)
                  : null
              }
              onChange={(date) =>
                setImmunization({ ...immunization, expiryDate: date })
              }
            />
          </div>
          {errors.expiryDate && (
            <div className="error">{errors.expiryDate}</div>
          )}
        </div>
        {nextVisit && (
          <div className="ui field">
            <label>Date of next visit dose</label>
            <div className="datepicker-full">
              <DatePicker
                isClearable
                dateFormat="dd/MM/yyyy"
                selected={
                  immunization.dateOfNextVisit
                    ? new Date(immunization.dateOfNextVisit)
                    : null
                }
                onChange={(date) =>
                  setImmunization({ ...immunization, dateOfNextVisit: date })
                }
              />
            </div>{" "}
            {errors.dateOfNextVisit && (
              <div className="error">{errors.dateOfNextVisit}</div>
            )}
          </div>
        )}
      </div>
      <div className="ui field">
        <label>Vaccinator Full Name</label>
        <input
          type="text"
          name="last-name"
          value={immunization.vaccinatorFullName}
          required
          onChange={(e) =>
            setImmunization({
              ...immunization,
              vaccinatorFullName: e.target.value.toUpperCase(),
            })
          }
          placeholder="Vaccinator FullName"
        />
        {errors.vaccinatorFullName && (
          <div className="error">{errors.vaccinatorFullName}</div>
        )}
      </div>

      <h4 className="ui dividing header">Adverse effect</h4>
      <div className="ui field">
        <div className="two fields">
          <div
            className="ui field"
            onClick={() => {
              setAefi(!aefi);
              if (aefi) setImmunization({ ...immunization, aefi: [] });
            }}
          >
            <input type="checkbox" checked={aefi}></input> Adverse Event
            Following Immunization
          </div>
        </div>
      </div>
      {aefi && (
        <div className="fields">
          <div className="three wide field">
            <label>Severity</label>
            <select
              className="ui fluid dropdown"
              value={
                immunization.aefi && immunization.aefi.length > 0
                  ? immunization.aefi[0].aefiSeverity
                  : ""
              }
              onChange={(e) => {
                setImmunization({
                  ...immunization,
                  aefi: [
                    { ...immunization.aefi[0], aefiSeverity: e.target.value },
                  ],
                });
              }}
            >
              <option value="severe">Severe</option>
              <option value="minor">Minor</option>
            </select>
          </div>
          <div className="thirteen wide field">
            <label>AEFI description</label>
            <input
              type="text"
              value={
                immunization.aefi && immunization.aefi.length > 0
                  ? immunization.aefi[0].aefiDescription
                  : ""
              }
              onChange={(e) => {
                const aefi = immunization
                  ? immunization.aefi && immunization.aefi[0]
                  : null;
                setImmunization({
                  ...immunization,
                  aefi: [
                    {
                      ...aefi,
                      aefiDescription: e.target.value.toUpperCase(),
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImmunizationRecordForm;
