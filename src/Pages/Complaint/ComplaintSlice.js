import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

const societyId = "6683b57b073739a31e8350d0"


export const fetchComplaints = createAsyncThunk(
  "ComplaintList/fetchComplaints",
  async () => {
    const response = await axiosInstance.get(`/getAllComplaints/${societyId}`);
    return response.data.Complaints
    ;
  }
);


export const deleteComplaintAsync = createAsyncThunk(
  "Complaint/deleteComplaint",
  async ({complaintId }) => {
      const response = await axiosInstance.delete(
        `/deleteComplaint/${societyId}/${complaintId}`
      );
      return response.data
  }
);


const ComplaintSlice = createSlice({
    name: 'ComplaintList',
    initialState: {
      complaints: [],
      status: 'idle',
      error: null,
      successMessage: null
    },


  extraReducers: builder => {
    builder
      .addCase(fetchComplaints.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Complaints = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      .addCase(deleteComplaintAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComplaintAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteComplaintAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  }
});

export const ComplaintReducer = ComplaintSlice.reducer;