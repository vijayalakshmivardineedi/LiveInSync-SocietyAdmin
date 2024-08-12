import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';

const societyId = "6683b57b073739a31e8350d0";



export const getByMonthAndYear = createAsyncThunk(
    'maintainances/getByMonthAndYear',
    async (monthAndYear) => {
        const response = await axiosInstance.get(`/getByMonthAndYear/${societyId}/${monthAndYear}`);
        return response.data.maintenance.society;
    }
);

// /getOne/:societyId/:blockno/:flatno
export const getOne = createAsyncThunk(
    'maintainancess/getOne',
    async ({blockno, flatno, monthAndYear}) => {
        const response = await axiosInstance.get(`/getOne/${societyId}/${blockno}/${flatno}/${monthAndYear}`);
        return response.data.maintanance;

    }
);


export const createMaintenanceRecords = createAsyncThunk(
    'maintainances/createMaintenanceRecords',
    async (formData, { rejectWithValue }) => {  
      try {
        const response = await axiosInstance.post('/createMaintenanceRecords', formData)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

export const updatePaymentDetails = createAsyncThunk(
    'maintainances/updatePaymentDetails',
    async ({ formData }) => {
        const response = await axiosInstance.put('/updatePaymentDetails', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure proper content type for FormData
            }
        });
        return response.data;
    }
);

export const updatePaymentStatus = createAsyncThunk(
    "maintainances/updatePaymentStatus",
    async ({formData}) => {
        const response = await axiosInstance.put(`/updatePaymentStatus`, formData);
        return response.data;
    }
);

const MaintainanceSlice = createSlice({
    name: 'maintainances',
    initialState: {
        maintainances: [],
        status: 'idle',
        error: null,
        successMessage: null,
    },

    reducers: {
    },

    extraReducers: (builder) => {
        builder
        
            .addCase(getByMonthAndYear.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getByMonthAndYear.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.maintainances = action.payload;
            })
            .addCase(getByMonthAndYear.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(getOne.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOne.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.maintainances = action.payload;
            })
            .addCase(getOne.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(createMaintenanceRecords.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createMaintenanceRecords.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.maintainances.push(action.payload);
                state.successMessage = action.payload.message;
            })
            .addCase(createMaintenanceRecords.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            })

            .addCase(updatePaymentDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePaymentDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.maintainances = action.payload;
                state.successMessage = action.payload.message;
            })
            .addCase(updatePaymentDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(updatePaymentStatus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updatePaymentStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.maintainances = action.payload;
                state.successMessage = action.payload.message;
                state.error = null;
            })
            .addCase(updatePaymentStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to fetch inventory';
            });
    },
});


export const MaintainanceReducer = MaintainanceSlice.reducer;