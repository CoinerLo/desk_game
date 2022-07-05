import { createSlice } from '@reduxjs/toolkit';
import { appApi } from '../../api';

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, email: null, uid: null, creationTime: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.createNewUser.matchFulfilled,
      (state, { payload }) => {
        state.uid = payload.uid;
        state.email = payload.email;
        state.creationTime = payload.metadata.creationTime;
      }
    )
  }
});

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
