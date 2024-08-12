import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

const societyId = '6683b57b073739a31e8350d0';

export const fetchVisitors = createAsyncThunk(
  'visitors/fetchVisitors',
  async () => {
    const response = await axiosInstance(`/getAllVisitorsBySocietyId/${societyId}`);
    return response.data.visitors;
  }
);

//router.get('/getVisitorByIdAndSocietyId/:societyId/:visitorId', getVisitorByIdAndSocietyId);
export const getVisitor = createAsyncThunk(
  'visitors/getVisitor',
  async (visitorId) => {
    const response = await axiosInstance(`/getVisitorByIdAndSocietyId/${societyId}/${visitorId}`);
    return response.data.visitor;
  }
);


const visitorsSlice = createSlice({
  name: 'visitors',
  initialState: {
    visitors: [],
    status: 'idle',
    error: null,
    successMessage: null,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchVisitors.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.visitors = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getVisitor.pending, state => {
        state.status = "loading";
      })
      .addCase(getVisitor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.visitors = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(getVisitor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});


export const visitorsReducer = visitorsSlice.reducer;