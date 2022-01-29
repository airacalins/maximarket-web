import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/configureStore";
import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUserAsync } from "../../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";

import Account from "../../../features/account/Account";
import Announcement from "../../../features/announcement/Announcement";
import AnnouncementDetails from "../../../features/announcement/AnnouncementDetails";
import AnnouncementForm from "../../../features/announcement/AnnouncementForm";
import Dashboard from "../../../features/dashboard/Dashboard";
import LoginForm from "../../../features/account/LoginForm";
import Map from "../../../features/map/Map";
import ModeOfPayment from "../../../features/modeOfPayment/ModeOfPayment";
import ModeOfPaymentDetails from "../../../features/modeOfPayment/ModeOfPaymentDetails";
import ModeOfPaymentForm from "../../../features/modeOfPayment/ModeOfPaymentForm";
import Payment from "../../../features/payment/Payment";
import PaymentDetails from "../../../features/payment/PaymentDetails";
import Report from "../../../features/report/Report";
import Slot from "../../../features/slot/Slot";
import SlotDetails from "../../../features/slot/SlotDetails";
import SlotForm from "../../../features/slot/SlotForm";
import Tenant from "../../../features/tenant/Tenant";
import TenantForm from "../../../features/tenant/TenantForm";
import TenantDetails from "../../../features/tenant/TenantDetails";
import TenantUpdateForm from "../../../features/tenant/TenantUpdateForm";
import User from "../../../features/user/User";
import UserDetails from "../../../features/user/UserDetails";
import UserForm from "../../../features/user/UserForm";

function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const initApp = useCallback(
    async () => {
      try {
        await dispatch(fetchCurrentUserAsync());
      } catch (error) {
        console.log(error);
      }
    }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  if (loading)
    return <></>

  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/account/:id/details' element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/map' element={<PrivateRoute><Map /></PrivateRoute>} />

        <Route path='/announcements' element={<PrivateRoute><Announcement /></PrivateRoute>} />
        <Route path={'/announcements/create'} element={<PrivateRoute><AnnouncementForm /></PrivateRoute>} />
        <Route path={'/announcements/:id/manage'} element={<PrivateRoute><AnnouncementForm /></PrivateRoute>} />
        <Route path='/announcements/:id/details' element={<PrivateRoute><AnnouncementDetails /></PrivateRoute>} />

        <Route path={'/invoices'} element={<PrivateRoute><Payment /></PrivateRoute>} />
        <Route path={'/invoice/:sort'} element={<PrivateRoute><Payment /></PrivateRoute>} />
        <Route path='/invoices/:id/details' element={<PrivateRoute><PaymentDetails /></PrivateRoute>} />

        <Route path='/mode-of-payments' element={<PrivateRoute><ModeOfPayment /></PrivateRoute>} />
        <Route path={'/mode-of-payments/create'} element={<PrivateRoute><ModeOfPaymentForm /></PrivateRoute>} />
        <Route path={"/mode-of-payments/:id/manage"} element={<PrivateRoute><ModeOfPaymentForm /></PrivateRoute>} />
        <Route path='/mode-of-payments/:id/details' element={<PrivateRoute><ModeOfPaymentDetails /></PrivateRoute>} />

        <Route path='/reports' element={<PrivateRoute><Report /></PrivateRoute>} />

        <Route path={'/slots'} element={<PrivateRoute><Slot /></PrivateRoute>} />
        <Route path={'/slots/create'} element={<PrivateRoute><SlotForm /></PrivateRoute>} />
        <Route path={'/slots/:id/manage'} element={<PrivateRoute><SlotForm /></PrivateRoute>} />
        <Route path='/slots/:id/details' element={<PrivateRoute><SlotDetails /></PrivateRoute>} />

        <Route path='/tenants' element={<PrivateRoute><Tenant /></PrivateRoute>} />
        <Route path={'/tenants/create'} element={<PrivateRoute><TenantForm /></PrivateRoute>} />
        <Route path={'/tenants/:slotId/create'} element={<PrivateRoute><TenantForm /></PrivateRoute>} />
        <Route path='/tenants/:id/manage' element={<PrivateRoute><TenantUpdateForm /></PrivateRoute>} />
        <Route path='/tenants/:id/details' element={<PrivateRoute><TenantDetails /></PrivateRoute>} />

        <Route path="/users" element={<PrivateRoute><User /></PrivateRoute>} />
        <Route path="/users/:id/details" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
        <Route path="/users/create" element={<PrivateRoute><UserForm /></PrivateRoute>} />
      </Routes>
      {/* <Route exact path="/" component={Home} />

      <Route
        path={"/(.+)"}
        render={() => (
          <Row className="vh-100">
            <Col className="app__navigation p-0" lg={2} >
              <NavMenu />
            </Col>

            <Col className="app__content p-0">
              //Route
            </Col>
          </Row>
        )} */}
      {/* /> */}
    </>
  );
}

export default App;
