import React from 'react'
import {
  getProvincesOptions,
  getDistrictOptions
} from '../extraData/options'

const AddressForm = ({ address, setAddress, errors = {} }) => {
  return (
    <>
      <h4 className="ui dividing header">Address</h4>
      <div className="ui segment">
        <div className="two fields">
          <div className=" field">
            <label>Region</label>
            <select
              className="ui dropdown"
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
            {errors.province && <div className="error">{errors.province}</div>}
          </div>
          {address.province && (
            <div className="field">
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
              {errors.address && <div className="error">{errors.address}</div>}
            </div>
          )}
        </div>
        <div className="two fields">
          {address.district && (
            <div className="eight wide field">
              <label>City</label>
              <input
                type="text"
                value={address.city}
                onChange={e =>
                  setAddress({
                    ...address,
                    city: e.target.value
                  })
                }
              />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>
          )}
          {address.district && (
            <div className="eight wide field">
              <label>Compound</label>
              <input
                type="text"
                value={address.compound}
                onChange={e =>
                  setAddress({
                    ...address,
                    compound: e.target.value
                  })
                }
              />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>
          )}{' '}
        </div>
        {address.district && (
          <div className=" field">
            <label>Physical Address</label>
            <input
              type="text"
              value={address.address}
              onChange={e =>
                setAddress({
                  ...address,
                  address: e.target.value
                })
              }
            />
          </div>
        )}{' '}
      </div>
    </>
  )
}

export default AddressForm
