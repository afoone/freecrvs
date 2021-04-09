import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const synchronizeImmunizations = createAsyncThunk(
  "immunizations/syncStatus",
  async (object, thunkAPI) => {
    const { data } = await axios.post(`/api/patients/`, {
      ...object,
      pending: undefined,
    });
    return data;
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
      console.log("state", state, action.payload);
      return [...state.filter((i) => action.payload.patient != i.patient)];
    },
  },
});

export const { add } = immunizationSlice.actions;

export default immunizationSlice.reducer;
