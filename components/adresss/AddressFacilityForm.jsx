import React from 'react'
import {
  getProvincesOptions,
  getDistrictOptions,
  getFacilitiesOptions
} from '../extraData/options'
import { v4 as uuid } from 'uuid'

const AddressFacilityForm = ({
  address = {},
  setAddress,
  errors = {},
  title = 'Addressss'
}) => {
  const radioButtonHandler = e => {
    setAddress({ ...address, addressType: e.target.value })
  }

  const formId = uuid()
  return (
    <>
      <h4 className="ui dividing header">{title}</h4>
      <div className="ui segment">
        <div className="inline fields">
          <div className="field">
            <div className="ui radio checkbox">
              <input
                type="radio"
                name={formId}
                value="facility"
                className="hidden"
                checked={address.addressType === 'facility'}
                onChange={radioButtonHandler}
              />
              <label>Facility</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input
                type="radio"
                name={formId}
                value="address"
                className="hidden"
                checked={address.addressType === 'address'}
                onChange={radioButtonHandler}
              />
              <label>Other Address</label>
            </div>
          </div>
        </div>
        <div className="fields">
          <div className="four wide field">
            <label>Region</label>
            <select
              className="ui fluid dropdown"
              value={address.province}
              onChange={e =>
                setAddress({
                  ...address,
                  province: e.target.value
                })
              }
            >
              <option></option>
              {getProvincesOptions()}
            </select>
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
          {address.province && (
            <div className="four wide field">
              <label>District</label>
              <select
                className="ui fluid dropdown"
                value={address.district}
                onChange={e =>
                  setAddress({
                    ...address,
                    district: e.target.value
                  })
                }
              >
                <option></option>
                {getDistrictOptions(address.province)}
              </select>
            </div>
          )}
          {address.district && address.addressType !== 'facility' && (
            <div className="eight wide field">
              <label>Place</label>
              <input
                type="text"
                value={address.place}
                onChange={e =>
                  setAddress({
                    ...address,
                    place: e.target.value
                  })
                }
              />
              {errors.place && <div className="error">{errors.place}</div>}
            </div>
          )}
          {address.district && address.addressType === 'facility' && (
            <div className="eight wide field">
              <label>Facility</label>
              <select
                className="ui fluid dropdown"
                value={address.facility}
                onChange={e =>
                  setAddress({
                    ...address,
                    facility: e.target.value
                  })
                }
              >
                <option></option>
                {getFacilitiesOptions()}
              </select>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AddressFacilityForm
