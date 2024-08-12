import { configureStore } from '@reduxjs/toolkit';
import { listReducer } from './Pages/UserManagement/ListSlice';
import { staffReducer } from './Pages/StaffMember/StaffSlice';
import { GateKeeperReducer } from './Pages/GateKeeper/GateKeeperSlice';
import { CommityMembersReducer } from './Pages/Committee/committeeSlice';
import { DocumentsReducer } from './Pages/Documents/DocumentsSlice';
import { ComplaintReducer } from './Pages/Complaint/ComplaintSlice';
import { profileReducer } from './Pages/Profile/profileSlice';
import { visitorsReducer } from './Pages/VisitorRecord/ListSlice';
import { staffRecordReducer } from './Pages/StaffRecord/ListSlice';
import { EventReducer } from './Pages/Event/EventSlice';
import { AdvertisementReducer } from './Pages/Advertisements/AdvertisementSlice';
import { noticeReducer } from './Pages/Notice/NoticeSlice';
import { inventoryReducer } from './Pages/AssetsandInventory/InventorySlice';
import { AssetlistReducer } from './Pages/AssetsandInventory/AssetsListSlice';
import { societyBillsReducer } from './Pages/SocietyBills/SocietyBillsSlice';
import { amenitiesReducer } from './Pages/Amenities/AmenitiesSlice';
import { bookingReducer } from './Pages/BookingAmenities/BookingSlice';
// import { PaymentsReducer } from './Pages/Payments/PaymentsSlice';
import { MaintainanceReducer } from './Pages/SocietyMaintainance/SocietyMaintainanceSlice';
import { DashboardReducer } from './Pages/Dashboard/DashboardSlice';


const store = configureStore({
  reducer: {
    user: listReducer,
    staff: staffReducer,
    gateKeepers: GateKeeperReducer,
    commityMembers: CommityMembersReducer,
    documents: DocumentsReducer,
    staffRecord: staffRecordReducer,
    advertisements: AdvertisementReducer,
    societyBills: societyBillsReducer,
    amenities: amenitiesReducer,
    bookings: bookingReducer,
    maintainance: MaintainanceReducer,
    dashboardList: DashboardReducer,


    //lucky
    profile: profileReducer,
    events: EventReducer,
    notice: noticeReducer,

    //Yesh
    complaintList: ComplaintReducer,
    visitorsRecords: visitorsReducer,
    inventory: inventoryReducer,
    Assetlist: AssetlistReducer,
  },
});

export default store;
