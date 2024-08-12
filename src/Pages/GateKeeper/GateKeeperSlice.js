import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';

const societyId = "6683b57b073739a31e8350d0";

export const fetchGatekeepers = createAsyncThunk(
  'sequrity/fetchGatekeepers',
  async () => {
    const response = await axiosInstance.get(`/sequrity/getSequrityBySocietyId/${societyId}`);
    return response.data.sequrity;
  }
);

// router.get('/sequrity/getSequrityPerson/:societyId/:sequrityId'
export const getSequrityPerson = createAsyncThunk(
  'sequrity/getSequrityPerson',
  async (sequrityId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/sequrity/getSequrityPerson/${societyId}/${sequrityId}`);
      return response.data.sequrity;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
);

//router.get('/sequrity/getAttendanceOfId/:societyId/:sequrityId', getAttendanceOfSequrityId);
export const getAttendanceOfId = createAsyncThunk(
  'sequrity/getAttendanceOfId',
  async (sequrityId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/sequrity/getAttendanceOfId/${societyId}/${sequrityId}`);
      return response.data.sequrity;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
);

export const createSequrity = createAsyncThunk(
  'sequrity/createSequrity',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/sequrity/createSequrity', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
);

export const updateSequrity = createAsyncThunk(
  'sequrity/updateSequrity',
  async ({ sequrityId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/sequrity/updateSequrityById/${sequrityId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
);

export const checkAttendanceStatus = createAsyncThunk(
  'sequrity/checkAttendanceStatus',
  async ({ sequrityId, date }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/sequrity/checkAttendanceStatus/${sequrityId}`, { date });
      return response.data
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
);

export const sequrityCheckIn = createAsyncThunk(
  'sequrity/sequrityCheckIn',
  async ({ sequrityId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/sequrity/addCheckIn/${sequrityId}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
);

// router.put('/sequrity/addCheckOut/:sequrityId/:attendanceId', addCheckOut);
export const sequrityCheckOut = createAsyncThunk(
  'sequrity/sequrityCheckOut',
  async ({ sequrityId, attendanceId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/sequrity/addCheckOut/${sequrityId}/${attendanceId}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
);


// router.delete('/sequrity/deleteSequrity/:id', deleteSequrityProfilePicture);
export const deleteGatekeepers = createAsyncThunk(
  'sequrity/deleteGatekeepers',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/sequrity/deleteSequrity/${id}`)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  }
);


const GateKeeperSlice = createSlice({
  name: 'sequrity',
  initialState: {
    sequrity: [],
    status: 'idle',
    error: null,
    successMessage: null,

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGatekeepers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGatekeepers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sequrity = action.payload;
      })
      .addCase(fetchGatekeepers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })

      .addCase(getSequrityPerson.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSequrityPerson.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sequrity = action.payload;
      })
      .addCase(getSequrityPerson.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })

      .addCase(getAttendanceOfId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAttendanceOfId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sequrity = action.payload;
      })
      .addCase(getAttendanceOfId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })

      .addCase(createSequrity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSequrity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sequrity = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(createSequrity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })

      .addCase(updateSequrity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSequrity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sequrity = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(updateSequrity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })

      .addCase(checkAttendanceStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAttendanceStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sequrity = action.payload;
      })
      .addCase(checkAttendanceStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })


      .addCase(sequrityCheckIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sequrityCheckIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sequrity = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(sequrityCheckIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })

      .addCase(sequrityCheckOut.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sequrityCheckOut.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sequrity = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(sequrityCheckOut.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })

      .addCase(deleteGatekeepers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteGatekeepers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = action.payload.message;
        state.sequrity = action.payload;
      })
      .addCase(deleteGatekeepers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  }
});



export const GateKeeperReducer = GateKeeperSlice.reducer;
