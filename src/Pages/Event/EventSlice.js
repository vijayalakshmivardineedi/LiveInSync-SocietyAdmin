import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';
const societyId = "6683b57b073739a31e8350d0";

export const fetchEvent = createAsyncThunk(
    'event/fetchEvent',
    async () => {
        const response = await axiosInstance.get(`/getAllEvents/${societyId}`);
        return response.data.events;
    }
);

export const fetchEventById = createAsyncThunk(
    'event/fetchEventById',
    async (id) => {
        const response = await axiosInstance.get(`/getEventById/${id}/${societyId}`);
        return response.data.event;
    }
);

export const createEvent = createAsyncThunk(
    'Resident/AddFlatOwners',
    async (formData) => {
        const response = await axiosInstance.post('/createEvent', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return response.data;
    }
);


export const updateEvent = createAsyncThunk(
    'event/updateEvent',
    async ({ id, formData }) => {
        const response = await axiosInstance.put(`/updateEvent/${societyId}/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return response.data;
    }
);

export const deleteEvent = createAsyncThunk(
    "event/deleteEvent",
    async (id) => {
        const response = await axiosInstance.delete(`/deleteEvent/${id}/${societyId}`);
        return response.data;
    }
);

const EventSlice = createSlice({
    name: 'event',
    initialState: {
      event: [],
        status: 'idle',
        error: null,
        successMessage: null,
    },

    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.event = action.payload;
            })
            .addCase(fetchEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchEventById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.event = action.payload;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
           

            .addCase(createEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.event.push(action.payload);
                state.successMessage = action.payload.message;
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.event = action.payload;
                state.successMessage = action.payload.message;
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteEvent.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.event = action.payload;
                state.successMessage = action.payload.message;
                state.error = null;
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to fetch inventory';
            });
    },
});


export const EventReducer = EventSlice.reducer;