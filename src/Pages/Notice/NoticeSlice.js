import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';


const societyId = "6683b57b073739a31e8350d0";

export const fetchnotice = createAsyncThunk(
    'notice/fetchnotice',
    async () => {
        const response = await axiosInstance.get(`/getNotice/${societyId}`);
        return response.data.notice;
    }
);

export const fetchnoticeById = createAsyncThunk(
    'notice/fetchnoticeById',
    async () => {
        const response = await axiosInstance.get(`/getAllNotice/${societyId}`);
        return response.data.notices;

    }
);
 export const getNoticeById = createAsyncThunk(
    'notice/getNoticeById',
    async (id) => {
        const response = await axiosInstance.get(`/getNoticeById/${id}`);
        return response.data.notices;

    }
);

export const createNotice = createAsyncThunk(
    'notice/createNotice',
    async (formData) => {
        const response = await axiosInstance.post('/createNotice', formData);
        return response.data;
    }
);

export const editNotice = createAsyncThunk(
    'notice/editNotice',
    async ({ _id, formData }) => {
        const response = await axiosInstance.put(`/editNotice/${_id}`, formData);
        return response.data;

    }
);

export const deleteNotice = createAsyncThunk(
    "notice/deleteNotice",
    async ({id}) => {
        const response = await axiosInstance.delete(`/deleteNotice/${id}`);
        return response.data;
    }
);

const NoticeSlice = createSlice({
    name: 'notice',
    initialState: {
        notice: [],
        status: 'idle',
        error: null,
        successMessage: null,
    },

    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchnotice.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchnotice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notice = action.payload;
            })
            .addCase(fetchnotice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchnoticeById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchnoticeById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notice = action.payload;
            })
            .addCase(fetchnoticeById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getNoticeById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getNoticeById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notice = action.payload;
            })
            .addCase(getNoticeById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })



            .addCase(createNotice.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createNotice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notice.push(action.payload);
                state.successMessage = action.payload.message;
            })
            .addCase(createNotice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editNotice.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editNotice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notice = action.payload;
                state.successMessage = action.payload.message;
            })
            .addCase(editNotice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteNotice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteNotice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notice = action.payload;
                state.successMessage = action.payload.message;
                state.error = null;
            })
            .addCase(deleteNotice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to fetch inventory';
            });
    },
});


export const noticeReducer = NoticeSlice.reducer;