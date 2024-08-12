import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios'

const societyId = '6683b57b073739a31e8350d0'

export const fetchAsset = createAsyncThunk(
  'Assetlist/fetchAsset',
  async () => {
    const response = await axiosInstance.get(`/getAllAssetsBySocietyId/${societyId}`)
    return response.data
  }
);

export const getAssetByIdAndSocietyId = createAsyncThunk(
  'Assetlist/getAssetByIdAndSocietyId',
  async (id) => {
    const response = await axiosInstance.get(`/getAssetByIdAndSocietyId/${societyId}/${id}`)
    return response.data.asset
  }
);

export const fetchaddAssets = createAsyncThunk(
  'Assets/fetchaddAssets',
  async (formData) => {
    const response = await axiosInstance.post(`/createAssets`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })
    return response.data
  }
);

export const fetchEditAssetsAsync = createAsyncThunk(
  'Assets/EditAssetData',
  async ({ id, formData }) => {
    const response = await axiosInstance.put(`/updateAsset/${societyId}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
);

export const fetchDeleteAssetsAsync = createAsyncThunk(
  'Asset/DeleteAssetData',
  async ({ assetId }) => {
    const response = await axiosInstance.delete(`/deleteAsset/${societyId}/${assetId}`)
    return response.data
  }
);

const listSlice = createSlice({
  name: 'Assets',
  initialState: {
    Assets: [],
    status: 'idle',
    error: null,
    successMessage: null,
},

  reducers: {},


  extraReducers: (builder) => {
    builder
      .addCase(fetchAsset.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAsset.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Assets = action.payload; 
      })
      .addCase(fetchAsset.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAssetByIdAndSocietyId.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAssetByIdAndSocietyId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Assets = action.payload; 
      })
      .addCase(getAssetByIdAndSocietyId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchaddAssets.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchaddAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.successMessage = action.payload.message;
      })
      .addCase(fetchaddAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEditAssetsAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchEditAssetsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(fetchEditAssetsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteAssetsAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchDeleteAssetsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.successMessage = action.payload.message;
      })
      .addCase(fetchDeleteAssetsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const AssetlistReducer = listSlice.reducer;