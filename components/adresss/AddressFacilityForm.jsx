import React, { useState } from "react";
import {
  getProvincesOptions,
  getDistrictOptions,
  getFacilitiesOptions,
} from "../extraData/options";
import { v4 as uuid } from "uuid";

const AddressFacilityForm = ({
  address = {},
  setAddress,
  errors = {},
  title = "Addressss",
}) => {
  const [addressType, setAddressType] = useState("facility");

  const formId = uuid();
  return (
    <>
      <h4 className="ui dividing header">{title}</h4>
      <div className="ui segment">
        <div className="inline fields">
          <div className="field">
            <div
              className="ui radio checkbox"
              onClick={() => setAddressType("facility")}
            >
              <input
                type="radio"
                name={formId}
                className="hidden"
                checked={addressType === "facility"}
              />
              <label>Facility</label>
            </div>
          </div>
          <div className="field">
            <div
              className="ui radio checkbox"
              onClick={() => setAddressType("address")}
            >
              <input
                type="radio"
                name={formId}
                className="hidden"
                checked={addressType === "address"}
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
              onChange={(e) =>
                setAddress({
                  ...address,
                  province: e.target.value,
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
                onChange={(e) =>
                  setAddress({
                    ...address,
                    district: e.target.value,
                  })
                }
              >
                <option></option>
                {getDistrictOptions(address.province)}
              </select>
            </div>
          )}
          {address.district && addressType !== "facility" && (
            <div className="eight wide field">
              <label>Place</label>
              <input
                type="text"
                value={address.place}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    place: e.target.value.toUpperCase(),
                  })
                }
              />
              {errors.place && <div className="error">{errors.place}</div>}
            </div>
          )}
          {address.district && addressType === "facility" && (
            <div className="eight wide field">
              <label>Facility</label>
              <select
                className="ui fluid dropdown"
                value={address.facility}
                onChange={(e) =>
                  setAddress({
                    ...address,
                    facility: e.target.value,
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
  );
};

export default AddressFacilityForm;
