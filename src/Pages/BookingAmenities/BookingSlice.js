import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';


const societyId = "6683b57b073739a31e8350d0";


// router.get('/getAmenityOfCommunityHal/:societyId', getAmenityOfCommunityHal);
export const getAmenityOfCommunityHal = createAsyncThunk(
    'booking/getAmenityOfCommunityHal',
    async () => {
        const response = await axiosInstance.get(`/getAmenityOfCommunityHal/${societyId}`);
        return response.data.amenity;
    }
);

// router.get('/getAmenityByIdAndUserId/:id/:userId', getAmenityByIdAndUserId);
export const getAmenityByIdAndUserId = createAsyncThunk(
    'booking/getAmenityByIdAndUserId',
    async ({id, userId}) => {
        const response = await axiosInstance.get(`/getAmenityByIdAndUserId/${id}/${userId}`);
        return response.data.booking;
    }
);

// router.put('/bookAmenity/:id', bookAmenity);
export const bookAmenity = createAsyncThunk(
    'booking/bookAmenity',
    async ({id, formData}) => {
        const response = await axiosInstance.put(`/bookAmenity/${id}`, formData);
        return response.data;
    }
);

// router.put('/updateAmenityBooking/:id/:userId', updateAmenityBooking);
export const updateAmenityBooking = createAsyncThunk(
    'booking/updateAmenityBooking',
    async ({ id, userId, formData }) => {
        const response = await axiosInstance.put(`/updateAmenityBooking/${id}/${userId}`, formData);
        return response.data;
    }
);

// router.delete('/deleteAmenityBooking/:id/:userId', deleteAmenityBooking);
export const deleteAmenityBooking = createAsyncThunk(
    "booking/deleteAmenityBooking",
    async ({id, userId}) => {
        const response = await axiosInstance.delete(`/deleteAmenityBooking/${id}/${userId}`);
        return response.data;
    }
);

const BookingSlice = createSlice({
    name: 'booking',
    initialState: {
        booking: [],
        status: 'idle',
        error: null,
        successMessage: null,
    },

    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAmenityOfCommunityHal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAmenityOfCommunityHal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.booking = action.payload;
            })
            .addCase(getAmenityOfCommunityHal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(getAmenityByIdAndUserId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAmenityByIdAndUserId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.booking = action.payload;
            })
            .addCase(getAmenityByIdAndUserId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(bookAmenity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(bookAmenity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.booking = action.payload;
                state.successMessage = action.payload.message;
            })
            .addCase(bookAmenity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(updateAmenityBooking.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAmenityBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.booking = action.payload;
                state.successMessage = action.payload.message;
            })
            .addCase(updateAmenityBooking.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteAmenityBooking.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteAmenityBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.booking = action.payload;
                state.successMessage = action.payload.message;
                state.error = null;
            })
            .addCase(deleteAmenityBooking.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to fetch inventory';
            });
    },
});


export const bookingReducer = BookingSlice.reducer;