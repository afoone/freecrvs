import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const synchronizeImmunizations = createAsyncThunk(
  "immunizations/syncStatus",
  async (arg, thunkAPI) => {
    const pendingImmunizations = thunkAPI.getState().immunization;
    if (pendingImmunizations.length > 0) {
      const { data } = await axios.post(`/api/patients/`, {
        ...pendingImmunizations[0],
        pending: undefined,
      });
      console.log("returned data", data);
      return data;
    } else {
      return null;
    }
  }
);

export const immunizationSlice = createSlice({
  name: "counter",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({
        ...action.payload,
        pending: true,
      });
    },
    update: (state, action) => {
      state
        .filter((i) => i._id != action.payload._id)
        .push({
          ...action.payload,
          pending: true,
        });
    },
  },
  extraReducers: {
    [synchronizeImmunizations.fulfilled]: (state, action) => {
      if (!action.payload) {
        return state;
      }
      return [...state.filter((i) => action.payload.patient != i.patient)];
    },
  },
});

export const { add, update } = immunizationSlice.actions;

export default immunizationSlice.reducer;
