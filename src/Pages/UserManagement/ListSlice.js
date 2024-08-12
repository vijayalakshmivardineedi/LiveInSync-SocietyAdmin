import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';

const societyId = "6683b57b073739a31e8350d0";

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const response = await axiosInstance.get(`/user/getAllUserProfilesBySocietyId/${societyId}`);
    return response.data.userProfiles;
  }
);

// router.get('/user/getAllOwners/:societyId', getAllOwners);
export const getAllOwners = createAsyncThunk(
  'user/getAllOwners',
  async () => {
    const response = await axiosInstance.get(`/user/getAllOwners/${societyId}`);
    return response.data.userProfiles;
  }
);

export const fetchUserProfiles = createAsyncThunk(
  'user/fetchUserProfiles',
  async ({ userId }) => {
    const response = await axiosInstance.get(`/user/getUserProfiles/${userId}/${societyId}`);
    return response.data.userProfiles;
  }
);



export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ _id }) => {
    const response = await axiosInstance.delete(`/user/deleteUserProfile/${_id}`);
    return response.data;
  }
);


const ListSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    profiles: [],
    status: 'idle',
    error: null,
    successMessage: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getAllOwners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllOwners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getAllOwners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(fetchUserProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchUserProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});


// Export reducers as named exports
export const listReducer = ListSlice.reducer;
