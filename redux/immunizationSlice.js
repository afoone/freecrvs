import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const synchronizeImmunizations = createAsyncThunk(
  "immunizations/syncStatus",
  async (arg, thunkAPI) => {
    const pendingImmunizations = thunkAPI.getState().immunization;
    console.log("thunk", arg, pendingImmunizations);

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
  },
  extraReducers: {
    [synchronizeImmunizations.fulfilled]: (state, action) => {
      console.log(
        "state on fullfiled",
        state,
        action.payload,
        ...state.filter((i) => action.payload.patient != i.patient)
      );
      return [...state.filter((i) => action.payload.patient != i.patient)];
    },
  },
});

export const { add } = immunizationSlice.actions;

export default immunizationSlice.reducer;
