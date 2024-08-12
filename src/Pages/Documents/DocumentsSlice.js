import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';

const societyId = '6683b57b073739a31e8350d0';

// router.get('/getDocumentsBySocietyId/:societyId', getDocumentsBySocietyId);
export const fetchDocuments = createAsyncThunk(
  'fetchDocuments',
  async () => {
    const response = await axiosInstance.get(`/getDocumentsBySocietyId/${societyId}`);
    return response.data.document
    ;
  }
);


// router.delete('/deleteDocuments/:id', deleteDocuments);
export const deleteDocuments = createAsyncThunk(
  'deleteDocuments',
  async ({ id }) => {
    const response = await axiosInstance.delete(`/deleteDocuments/${id}`);
    return response.data;
  }
);


const DocumentsSlice = createSlice({
  name: 'documents',
  initialState: {
    document: [],
    status: 'idle',
    error: null,
    successMessage: null
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.document = action.payload;
      })      
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.document = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});



export const DocumentsReducer = DocumentsSlice.reducer;
