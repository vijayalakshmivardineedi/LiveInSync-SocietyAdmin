import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

const societyId = '6683b57b073739a31e8350d0';

// router.get('/getAllVisitorsStaffBySocietyId/:societyId', getAllVisitorsStaffBySocietyId);
export const fetchStaffRecord = createAsyncThunk(
  'staff/fetchStaffRecord',
  async () => {
    const response = await axiosInstance(`/getAllVisitorsStaffBySocietyId/${societyId}`);
    return response.data.staff;
  }
);

// router.get('/getVisitorsStaffByIdAndSocietyId/:societyId/:userId', getVisitorsStaffByIdAndSocietyId);
export const getStaffRecordPerson = createAsyncThunk(
  'staff/getStaffRecordPerson',
  async (userId) => {
    const response = await axiosInstance(`/getVisitorByIdAndSocietyId/${societyId}/${userId}`);
    return response.data.staff;
  }
);


const StaffRecordSlice = createSlice({
  name: 'staff',
  initialState: {
    staff: [],
    status: 'idle',
    error: null,
    successMessage: null,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchStaffRecord.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchStaffRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staff = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(fetchStaffRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getStaffRecordPerson.pending, state => {
        state.status = "loading";
      })
      .addCase(getStaffRecordPerson.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staff = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(getStaffRecordPerson.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});


export const staffRecordReducer = StaffRecordSlice.reducer;