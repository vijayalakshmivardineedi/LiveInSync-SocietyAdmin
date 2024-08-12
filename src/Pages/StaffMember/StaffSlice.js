import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axios';

const societyId = "6683b57b073739a31e8350d0";

// router.post('/createService', createService);
export const createService = createAsyncThunk(
    'staff/createService',
    async (formData) => {
        try {
            const response = await axiosInstance.post('/createService', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Ensure proper content type for FormData
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating service:', error);
            throw error; // Propagate the error to handle it elsewhere
        }
    }
);

// router.get('/getAllServicePersons/:societyId', getAllServicePersons);
export const getAllServicePersons = createAsyncThunk(
    'staff/getAllServicePersons',
    async () => {
        const response = await axiosInstance.get(`/getAllServicePersons/${societyId}`);
        return response.data.service.society;
    });

// router.get('/getAllServiceTypes/:societyId/:serviceType', getAllServiceTypes);
export const fetchAllServiceTypes = createAsyncThunk(
    'staff/fetchAllServiceTypes',
    async (serviceType) => {
        const response = await axiosInstance.get(`/getAllServiceTypes/${societyId}/${serviceType}`);
        return response.data.providers;
    });


// router.get('/getServicePersonById/:societyId/:userId', getServicePersonById); 
export const fetchServicePersonById = createAsyncThunk(
    'staff/fetchServicePersonById',
    async ({ serviceType, userid }) => {
        const response = await axiosInstance.get(`/getServicePersonById/${societyId}/${serviceType}/${userid}`);
        return response.data.ServicePerson;
    }
);

// router.put('/updateServicePerson', updateServicePerson);
export const updateServicePerson = createAsyncThunk(
    'staff/updateServicePerson',
    async (formData) => {
        const response = await axiosInstance.put(`/updateServicePerson`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure proper content type for FormData
            }
        });
        return response.data;
    });

// router.delete('/deleteServicePerson', deleteServicePerson);
export const deleteServicePerson = createAsyncThunk(
    'user/deleteServicePerson',
    async ( {userid, serviceType, societyId}) => {
        const response = await axiosInstance.delete('/deleteServicePerson', {
            data: { societyId, serviceType, userid }
        });
        return response.data;
    }
);


// router.put('/addList', addList);
// export const addList = createAsyncThunk(
//     'staff/addList',
//     async (formData) => {
//         const response = await axiosInstance.delete('/addList', formData);
//         return response.data.service.society;
//     });


// router.delete('/deleteUserService', deleteUserService);
export const deleteUserService = createAsyncThunk(
    'staff/deleteUserService',
    async ({ societyId, serviceType, userid, userIdToDelete }) => {
        try {
            const response = await axiosInstance.delete('/deleteUserService', {
                data: { societyId, serviceType, userid, userIdToDelete }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);



const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        successMessage: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            //createService
            .addCase(createService.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.successMessage = action.payload.message;
            })
            .addCase(createService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //getAllServicePersons
            .addCase(getAllServicePersons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllServicePersons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getAllServicePersons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //fetchAllServiceTypes
            .addCase(fetchAllServiceTypes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllServiceTypes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAllServiceTypes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //fetchServicePersonById
            .addCase(fetchServicePersonById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServicePersonById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchServicePersonById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //updateServicePerson
            .addCase(updateServicePerson.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateServicePerson.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.successMessage = action.payload.message;
            })
            .addCase(updateServicePerson.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //deleteServicePerson
            .addCase(deleteServicePerson.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteServicePerson.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteServicePerson.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            //addList
            // .addCase(addList.pending, (state) => {
            //     state.status = 'loading';
            // })
            // .addCase(addList.fulfilled, (state, action) => {
            //     state.status = 'succeeded';
            //     state.data = action.payload;
            // })
            // .addCase(addList.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.error.message;
            // })

            //deleteUserService
            .addCase(deleteUserService.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUserService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.successMessage = action.payload.message;
            })
            .addCase(deleteUserService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const staffReducer = staffSlice.reducer;
