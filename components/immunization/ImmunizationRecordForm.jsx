import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import AddressFacilityForm from '../adresss/AddressFacilityForm'

const ImmunizationRecordForm = ({
  title,
  immunization,
  setImmunization,
  errors,
  nextVisit
}) => {
  const [aefi, setAefi] = useState(false)

  useEffect(() => {
    console.log(
      'setting aefi',
      immunization.aefi && immunization.aefi.length > 0
    )
    setAefi(immunization.aefi && immunization.aefi.length > 0)
  }, [immunization.aefi])

  return (
    <div>
      <h2 className="ui dividing header">{title}</h2>
      <div className="two fields">
        <div className="ui field">
          <label>Date of giving</label>
          <div className="datepicker-full">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={immunization.date ? new Date(immunization.date) : null}
              onChange={date =>
                setImmunization({
                  ...immunization,
                  date
                })
              }
            />
          </div>
          {errors.firstDoseDate && (
            <div className="error">{errors.firstDoseDate}</div>
          )}
        </div>
        {nextVisit && (
          <div className="ui field">
            <label>Date of Next Visit</label>
            <div className="datepicker-full">
              <DatePicker
                isClearable
                dateFormat="dd/MM/yyyy"
                selected={
                  immunization.dateOfNextVisit
                    ? new Date(immunization.dateOfNextVisit)
                    : null
                }
                onChange={date =>
                  setImmunization({ ...immunization, dateOfNextVisit: date })
                }
              />
            </div>{' '}
            {errors.dateOfNextVisit && (
              <div className="error">{errors.dateOfNextVisit}</div>
            )}
          </div>
        )}
      </div>
      <div className="three fields">
        <div className="ui field">
          <label>Name of the vaccine</label>
          <select
            name="last-name"
            value={immunization.nameOfTheVaccine}
            className="ui dropdown"
            required
            onChange={e =>
              setImmunization({
                ...immunization,
                nameOfTheVaccine: e.target.value
              })
            }
            placeholder="Name of the vaccine"
          >
            <option></option>
            <option>Astrazeneca</option>
            <option>Pfizer-BioNTech</option>
            <option>Moderna</option>
            <option>NovaVax</option>
            <option>Jhonson&Jhonson - Jansen</option>
          </select>
          {errors.nameOfTheVaccine && (
            <div className="error">{errors.nameOfTheVaccine}</div>
          )}
        </div>

        <div className="ui field">
          <label>Batch Number</label>
          <input
            type="text"
            name="last-name"
            value={immunization.batchNumber}
            required
            onChange={e =>
              setImmunization({ ...immunization, batchNumber: e.target.value })
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
            onChange={e =>
              setImmunization({ ...immunization, serialNumber: e.target.value })
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
                immunization.expirydate
                  ? new Date(immunization.expirydate)
                  : null
              }
              onChange={date =>
                setImmunization({ ...immunization, expirydate: date })
              }
            />
          </div>
          {errors.expirydate && (
            <div className="error">{errors.expirydate}</div>
          )}
        </div>
      </div>
      <div className="ui field">
        <label>Vaccinator Full Name</label>
        <input
          type="text"
          name="last-name"
          value={immunization.vaccinatorFullName}
          required
          onChange={e =>
            setImmunization({
              ...immunization,
              vaccinatorFullName: e.target.value
            })
          }
          placeholder="Vaccinator FullName"
        />
        {errors.vaccinatorFullName && (
          <div className="error">{errors.vaccinatorFullName}</div>
        )}
      </div>
      <AddressFacilityForm
        address={immunization.placeOfVaccination}
        setAddress={address =>
          setImmunization({ ...immunization, placeOfVaccination: address })
        }
        title="Place of Vaccination"
      ></AddressFacilityForm>
      <h4 className="ui dividing header">Adverse effect</h4>
      <div className="ui field">
        <div className="two fields">
          <div className="ui field">
            <input
              type="checkbox"
              checked={aefi}
              onChange={() => {
                setAefi(!aefi)
                setImmunization({ ...immunization, aefi: [] })
              }}
            ></input>
            Adverse Event Following Immunization
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
                  : ''
              }
              onChange={e =>
                setImmunization({
                  ...immunization,
                  aefi: [{ ...aefi[0], aefiSeverity: e.target.value }]
                })
              }
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
                  : ''
              }
              onChange={e =>
                setImmunization({
                  ...immunization,
                  aefi: [{ ...aefi[0], aefiDescription: e.target.value }]
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImmunizationRecordForm
