import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';

const societyId = "6683b57b073739a31e8350d0";

export const fetchBillsBySocietyId = createAsyncThunk(
    'bills/fetchBillsBySocietyId',
    async () => {
        const response = await axiosInstance.get(`/getBillsBySocietyId/${societyId}`);
        return response.data.society.bills;
    }
);

export const getBillById = createAsyncThunk(
    'bills/getBillById',
    async ({id}) => {
        const response = await axiosInstance.get(`/getBillById/${societyId}/${id}`);
        return response.data.bill;

    }
);

export const createBill = createAsyncThunk(
    'bills/createBill',
    async (formData) => {
        const response = await axiosInstance.post('/createBill', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
);


export const editBill = createAsyncThunk(
    'bills/editBill',
    async ({ id, formData }) => {
        const response = await axiosInstance.put(`/editBill/${societyId}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;

    }
);

export const deleteBill = createAsyncThunk(
    "bills/deleteBill",
    async ({id}) => {
        const response = await axiosInstance.delete(`/deleteBill/${societyId}/${id}`);
        return response.data;
    }
);

const SocietyBillsSlice = createSlice({
    name: 'bills',
    initialState: {
        bills: [],
        status: 'idle',
        error: null,
        successMessage: null,
    },

    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchBillsBySocietyId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBillsBySocietyId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bills = action.payload;
            })
            .addCase(fetchBillsBySocietyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(getBillById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBillById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bills = action.payload;
            })
            .addCase(getBillById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(createBill.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createBill.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bills.push(action.payload);
                state.successMessage = action.payload.message;
            })
            .addCase(createBill.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(editBill.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editBill.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bills = action.payload;
                state.successMessage = action.payload.message;
            })
            .addCase(editBill.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteBill.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteBill.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bills = action.payload;
                state.successMessage = action.payload.message;
                state.error = null;
            })
            .addCase(deleteBill.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to fetch inventory';
            });
    },
});


export const societyBillsReducer = SocietyBillsSlice.reducer;