import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';

const societyId = '6683b57b073739a31e8350d0';

// router.post('/createCommityMembers', createCommityMembers);
export const createCommityMembers = createAsyncThunk(
    'createCommityMembers',
    async (formData) => {
        const response = await axiosInstance.post('/createCommityMembers', formData, {
          headers: {
              'Content-Type': 'multipart/form-data' 
          }
      });
        return response.data;
    }
  );

// router.get('/getCommityMembersBySocietyId/:societyId', getCommityMembersBySocietyId);
export const fetchCommityMembers = createAsyncThunk(
  'fetchCommityMembers',
  async () => {
    const response = await axiosInstance.get(`/getCommityMembersBySocietyId/${societyId}`);
    return response.data.commityMember
    ;
  }
);

// router.get('/getCommityMembersById/:id', getCommityMembersById);
export const getCommityMembersById = createAsyncThunk(
  'getCommityMembersById',
  async (id) => {
    const response = await axiosInstance.get(`/getCommityMembersById/${id}`);
    return response.data.commityMember;
  }
);

// router.put('/editCommityMembers/:id', editCommityMembers);
export const editCommityMembers = createAsyncThunk(
  'editCommityMembers',
  async ({ id, formData }) => {
      const response = await axiosInstance.put(`/editCommityMembers/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data' 
        }
    });
    return response.data;
  }
);

// router.delete('/deletecommityMembers/:id', deletecommityMembers);
export const deletecommityMembers = createAsyncThunk(
  'deletecommityMembers',
  async ({ id }) => {
    const response = await axiosInstance.delete(`/deletecommityMembers/${id}`);
    return response.data;
  }
);


const CommityMembersSlice = createSlice({
  name: 'commityMember',
  initialState: {
    commityMember: [],
    status: 'idle',
    error: null,
    successMessage: null

  },
  extraReducers: (builder) => {
    builder

    .addCase(createCommityMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCommityMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commityMember = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(createCommityMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(fetchCommityMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommityMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commityMember = action.payload;
      })      
      .addCase(fetchCommityMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getCommityMembersById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCommityMembersById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commityMember = action.payload;
      })      
      .addCase(getCommityMembersById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(editCommityMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editCommityMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commityMember = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(editCommityMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(deletecommityMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletecommityMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commityMember = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(deletecommityMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});



export const CommityMembersReducer = CommityMembersSlice.reducer;
