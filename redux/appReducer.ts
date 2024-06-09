import { combineReducers } from '@reduxjs/toolkit'
import settingSliceReducer from './settingSlice'
import userDataSliceReducer from './userDataSlice'
import connectedChainReducer from './connectedChainSlice'
import languageReducer from './languageSlice'
import { SLICE } from '@/constant/redux'

export default combineReducers({
  [SLICE.Language]: languageReducer,
  [SLICE.Setting]: settingSliceReducer,
  [SLICE.UserData]: userDataSliceReducer,
  [SLICE.ConnectedChain]: connectedChainReducer
})
