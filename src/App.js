
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from './Components/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import User from './Pages/UserManagement/List';
import View from './Pages/UserManagement/View';
import StaffMember from './Pages/StaffMember/List';
import AddStaff from './Pages/StaffMember/Add';
import EditStaff from './Pages/StaffMember/Edit';
import ListPage from './Pages/StaffMember/ListPage';
import GateKeeper from './Pages/GateKeeper/List';
import AddGateKeeper from './Pages/GateKeeper/Add';
import ViewGateKeeper from './Pages/GateKeeper/View';
import EditGateKeeper from './Pages/GateKeeper/Edit';
import AddAttendanceGateKeeper from './Pages/GateKeeper/Attendance';
import Committee from './Pages/Committee/List';
import AddCommittee from './Pages/Committee/Add';
import EditCommittee from './Pages/Committee/Edit';
import Documents from './Pages/Documents/List';
import StaffRecord from './Pages/StaffRecord/List';
import VisitorRecord from './Pages/VisitorRecord/List';
import ViewVisitor from './Pages/VisitorRecord/View';
import AddsList from './Pages/Advertisements/List';
import AddAdvertisements from './Pages/Advertisements/Add';
import EditAdvertisements from './Pages/Advertisements/Edit';
import ViewAdvertisements from './Pages/Advertisements/View';
import SocietyBills from './Pages/SocietyBills/List';
import EditSocietyBills from './Pages/SocietyBills/Edit';
import AddSocietyBills from './Pages/SocietyBills/Add';
import BookingList from './Pages/BookingAmenities/List';
import AddBooking from './Pages/BookingAmenities/Add';
import EditBooking from './Pages/BookingAmenities/Edit';
import Maintainance from './Pages/SocietyMaintainance/List';
import AddMontlyMaintainance from './Pages/SocietyMaintainance/Add';
import PayMaintainance from './Pages/SocietyMaintainance/Edit';
import StatusMaintainance from './Pages/SocietyMaintainance/Conformation';

//lucky
import Profile from './Pages/Profile/Profile';
import Residents from './Pages/Residents/List';
import Notice from './Pages/Notice/List';
import Addnotice from './Pages/Notice/Add';
import EditNotice from './Pages/Notice/Edit';

//yesh
import Event from './Pages/Event/List';
import AddEvent from './Pages/Event/Add';
import EditEvent from './Pages/Event/Edit';
import ViewEvent from './Pages/Event/View';
import AssetsList from './Pages/AssetsandInventory/AssetsList';
import AddAssets from './Pages/AssetsandInventory/AddAssets';
import EditAssets from './Pages/AssetsandInventory/EditAssets';
import InventoryList from './Pages/AssetsandInventory/InventoryList';
import AddInventory from './Pages/AssetsandInventory/AddInventory';
import EditInventory from './Pages/AssetsandInventory/EditInventory';
import Amenities from './Pages/Amenities/List';
import AddAminity from './Pages/Amenities/AddAmenities';
import EditAminity from './Pages/Amenities/Edit';
import ViewAminity from './Pages/Amenities/View';
import Complaint from './Pages/Complaint/List';

//pending
import DiscussionTabs from './Pages/Discussions/DiscussionTabs';
import Settings from './Pages/Settings/Settings';


function App() {
  const [rows, setRows] = useState(Array.from({ length: 13 }, (_, index) => ({
    select: false,
    image: 'https://via.placeholder.com/40',
    visitorInfo: `Visitor ${index + 1} - ID ${1000 + index} - Vehicle ${200 + index}`,
    gateName: `Gate ${index % 5 + 1}`,
    checkInDate: `2024-06-${String(index + 1).padStart(2, '0')}`,
    checkInTime: `10:0${index % 10} AM`,
    checkOutTime: `04:0${index % 10} PM`,
    status: index % 2 === 0 ? 'Approved' : 'Declined',
  })));
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/userManagement' element={<User />} />
          <Route path='/view/:userId' element={<View />} />
          <Route path='/staffMember' element={<StaffMember />} />
          <Route path='/addstaffMember' element={<AddStaff />} />
          <Route path='/editstaffMember/:serviceType/:userid' element={<EditStaff />} />
          <Route path='/staffMember/ListPage/:serviceType' element={<ListPage />} />
          <Route path='/gatekeeper/list' element={<GateKeeper />} />
          <Route path='/gatekeeper/add' element={<AddGateKeeper />} />
          <Route path='/gatekeeper/view/:sequrityId' element={<ViewGateKeeper />} />
          <Route path='/gatekeeper/edit/:sequrityId' element={<EditGateKeeper />} />
          <Route path='/gatekeeper/attandance/:sequrityId' element={<AddAttendanceGateKeeper />} />
          <Route path='/userManagement/committee' element={<Committee />} />
          <Route path='/committee/Add' element={< AddCommittee />} />
          <Route path='/committee/Edit/:id' element={<EditCommittee />} />
          <Route path='/documents' element={<Documents />} />
          <Route path='/staffRecord' element={<StaffRecord />} />
          <Route path='/visitorRecord' element={<VisitorRecord />} />
          <Route path='/view/visitorRecord/:visitorId' element={<ViewVisitor />} />
          <Route path='/addsList' element={<AddsList />} />
          <Route path='/add/Adds' element={<AddAdvertisements />} />
          <Route path='/edit/Adds/:id' element={<EditAdvertisements />} />
          <Route path='/view/Adds/:id' element={<ViewAdvertisements />} />
          <Route path='/societyBills' element={<SocietyBills />} />
          <Route path='/edit/societyBills/:id' element={<EditSocietyBills />} />
          <Route path='/add/societyBills' element={<AddSocietyBills />} />
          <Route path='/amenities' element={<Amenities />} />
          <Route path='/addAminity' element={<AddAminity />} />
          <Route path='/editAminity/:id' element={<EditAminity />} />
          <Route path='/viewAminity/:id' element={<ViewAminity />} />
          <Route path='/bookings' element={<BookingList />} />
          <Route path='/addBookings/:id' element={<AddBooking />} />
          <Route path='/editBookings/:id/:userId' element={<EditBooking />} />
          <Route path='/maintainance' element={<Maintainance />} />
          <Route path='/addMontlyMaintainance' element={<AddMontlyMaintainance />} />
          <Route path='/payMaintainance/:blockno/:flatno/:monthAndYear' element={<PayMaintainance />} />
          <Route path='/status/:blockno/:flatno/:monthAndYear' element={<StatusMaintainance />} />
          
          {/* lucky */}
          <Route path='/residents' element={<Residents />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/addnotice' element={<Addnotice />} />
          <Route path='/editNotice/:_id' element={<EditNotice />} />
          <Route path='/profile' element={<Profile />} />


          {/* Yesh */}
          <Route path='/complaints' element={<Complaint />} />
          <Route path='/event' element={<Event />} />
          <Route path='/AddEvent' element={<AddEvent />} />
          <Route path='/editEvent/:id' element={<EditEvent />} />
          <Route path='/viewEvent/:id' element={<ViewEvent />} />
          <Route path='/assets' element={<AssetsList />} />
          <Route path='/addAssets' element={<AddAssets />} />
          <Route path='/editAssets/:id' element={<EditAssets />} />
          <Route path='/inventory' element={<InventoryList />} />
          <Route path='/addInventory' element={<AddInventory />} />
          <Route path='/inventory/edit/:id' element={<EditInventory />} />

          <Route path='/discussions' element={<DiscussionTabs />} />
          <Route path='/settings' element={<Settings />} />

        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}
export default App;
