import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';

const societyId = "6683b57b073739a31e8350d0";


// router.get('/getAdvertisements/:societyId', getAdvertisements);
export const fetchAdvertisements = createAsyncThunk(
  'adds/fetchAdvertisements',
  async () => {
    const response = await axiosInstance.get(`/getAdvertisements/${societyId}`);
    return response.data.addv;
  }
);


// router.get('/getAdvertisementsById/:id', getAdvertisementsById);
export const getAdvertisementsById = createAsyncThunk(
  'adds/getAdvertisementsById',
  async (id) => {
    const response = await axiosInstance.get(`/getAdvertisementsById/${id}`);
    return response.data.advertisement;
  }
);




// router.get('/getAdvertisementsByAdv/:adv', getAdvertisementsByAdv);
export const getAdvertisementsByAdv = createAsyncThunk(
  'adds/getAdvertisementsByAdv',
  async (adv) => {
    const response = await axiosInstance.get(`/getAdvertisementsByAdv/${adv}`);
    return response.data.sequrity;
  }
);

// router.post('/createAdvertisements', createAdvertisements);
export const createAdvertisements = createAsyncThunk(
  'adds/createAdvertisements',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/createAdvertisements', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// router.put('/editAdvertisement/:id', editAdvertisement);
export const editAdvertisement = createAsyncThunk(
  'adds/editAdvertisement',
  async ({ id, formData }) => {
      const response = await axiosInstance.put(`/editAdvertisement/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data' 
        }
    });
    return response.data;
  }
);

// router.delete('/deleteAdvertisement/:id', deleteAdvertisement);
export const deleteAdvertisement = createAsyncThunk(
  'adds/deleteAdvertisement',
  async ({ id }) => {
    const response = await axiosInstance.delete(`/deleteAdvertisement/${id}`);
    return response.data;
  }
);


const AdvertisementSlice = createSlice({
  name: 'adds',
  initialState: {
    adds: [],
    status: 'idle',
    error: null,
    successMessage: null,

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertisements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdvertisements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adds = action.payload;
      })      
      .addCase(fetchAdvertisements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getAdvertisementsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdvertisementsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adds = action.payload;
      })      
      .addCase(getAdvertisementsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      .addCase(getAdvertisementsByAdv.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdvertisementsByAdv.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adds = action.payload;
      })      
      .addCase(getAdvertisementsByAdv.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(createAdvertisements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAdvertisements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adds = action.payload;
        state.successMessage = action.payload.message;
        
      })
      .addCase(createAdvertisements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })

      .addCase(editAdvertisement.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editAdvertisement.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adds = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(editAdvertisement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteAdvertisement.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAdvertisement.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = action.payload.message;
        state.adds = action.payload;
      })
      .addCase(deleteAdvertisement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});



export const AdvertisementReducer = AdvertisementSlice.reducer;
