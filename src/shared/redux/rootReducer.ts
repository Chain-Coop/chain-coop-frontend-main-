import { combineReducers } from "@reduxjs/toolkit";
import landingReducer from "./slices/landing.slices";
import transactionReducer from "./slices/transaction.slices";
import notificationApplicationReduers from "./slices/notification.slices";
import kycReducer from "./slices/kyc.slices";

const rootReducer = combineReducers({
  landing: landingReducer,
  transaction: transactionReducer,
  notificationApplication: notificationApplicationReduers,
  kyc: kycReducer,
});

export default rootReducer;
