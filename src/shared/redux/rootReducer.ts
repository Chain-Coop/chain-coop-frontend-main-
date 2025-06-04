import { combineReducers } from "@reduxjs/toolkit";
import landingReducer from "./slices/landing.slices";
import transactionReducer from "./slices/transaction.slices";
import notificationApplicationReduers from "./slices/notification.slices";
import kycReducer from "./slices/kyc.slices";
import web3Reducers from "./slices/web3.slices";
import adminReducer from "./slices/adminSlices/adminSlices";
import { webGroupSavingsReducer } from "./slices/web_savings_groups.slices";

const rootReducer = combineReducers({
  landing: landingReducer,
  transaction: transactionReducer,
  notificationApplication: notificationApplicationReduers,
  kyc: kycReducer,
  web3: web3Reducers,
  web_group_savings: webGroupSavingsReducer,
  admin: adminReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
