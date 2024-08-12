import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';

const initialState = {
  resident: null,
  loading: false,
  error: null,
};

const societyId = "6683b57b073739a31e8350d0";

export const fetchResidentProfile = createAsyncThunk(
  'profile/fetchResidentProfile',
  async () => {
      const response = await axiosInstance.get(`/society/profile/${societyId}`);
      return response.data.admins; 
      
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: [],
    status: 'idle',
    error: null,
    successMessage: null,
},

  extraReducers: (builder) => {
    builder
      .addCase(fetchResidentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResidentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchResidentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});




export const profileReducer = profileSlice.reducer;