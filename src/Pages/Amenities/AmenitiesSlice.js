import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

const societyId = "6683b57b073739a31e8350d0"

//router.post('/createAmenity', createAmenity);
export const createAmenity = createAsyncThunk(
    "amenities/createAmenity",
    async (formData) => {
      const response = await axiosInstance.post(
        `/createAmenity`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response.data;
    }
  );



// router.get('/getAllAmenityBySocietyId/:societyId', getAllAmenityBySocietyId);
export const getAllAmenityBySocietyId = createAsyncThunk(
  "amenities/getAllAmenityBySocietyId",
  async () => {
    const response = await axiosInstance.get(`/getAllAmenityBySocietyId/${societyId}`);
    return response.data.society
    ;
  }
);

//router.get('/getAmenityById/:id', getAmenityById);
export const getAmenityById = createAsyncThunk(
  "amenities/getAmenityById",
  async (id) => {
    const response = await axiosInstance.get(`/getAmenityById/${id}`);
    return response.data.amenity
    ;
  }
);

// router.put('/updateAmenity/:id', updateAmenity);
export const updateAmenity = createAsyncThunk(
  "amenities/updateAmenity",
  async ({id, formData}) => {
    const response = await axiosInstance.put(
      `/updateAmenity/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  }
);



// router.delete('/deleteAmenity/:id', deleteAmenity);
export const deleteAmenity = createAsyncThunk(
  "amenities/deleteAmenity",
  async ({id}) => {
      const response = await axiosInstance.delete(
        `/deleteAmenity/${id}`
      );
      return response.data
  }
);


const amenitiesSlice = createSlice({
    name: 'amenities',
    initialState: {
      amenities: [],
          status: null,
          error: null,
          successMessage: null,
        },


  extraReducers: builder => {
    builder
      .addCase(createAmenity.pending, state => {
        state.status = "loading";
      })
      .addCase(createAmenity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.amenities = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(createAmenity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })


      .addCase(getAllAmenityBySocietyId.pending, state => {
        state.status = "loading";
      })
      .addCase(getAllAmenityBySocietyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.amenities = action.payload;
      })
      .addCase(getAllAmenityBySocietyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })


      .addCase(getAmenityById.pending, state => {
        state.status = "loading";
      })
      .addCase(getAmenityById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.amenities = action.payload;
      })
      .addCase(getAmenityById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      


      .addCase(updateAmenity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAmenity.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(updateAmenity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })



      .addCase(deleteAmenity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAmenity.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteAmenity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  }
});

export const amenitiesReducer= amenitiesSlice.reducer;