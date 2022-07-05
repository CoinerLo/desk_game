import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';

const auth = getAuth();

export const addNewUser = createAsyncThunk(
  'user/addNewUser',
  async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { displayName, uid } = userCredential.user;
    const { creationTime } = userCredential.user.metadata;
    return { email, displayName, uid, creationTime };
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { displayName, uid } = userCredential.user;
    const { creationTime } = userCredential.user.metadata;
    return { email, displayName, uid, creationTime };
  }
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async () => await signOut(auth)
);

export const renameUser = createAsyncThunk(
  'user/renameUser',
  async ({ newName }) => {
    await updateProfile(auth.currentUser, {
      displayName: newName,
    });
    const { displayName } = auth.currentUser;
    return { displayName };
  }
)

const initialState = {
  isLoaded: false,
  uid: '',
  name: '',
  email: '',
  emailVerified: false,
  phoneNumber: null,
  photoURL: null,
  createdAt: null,
  token: null,
  errorAuth: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrorAuth: (state) => {
      state.errorAuth = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addNewUser.fulfilled, (state, { payload }) => {
      state.name = payload.displayName || payload.email.split('@')[0];
      state.email = payload.email;
      state.createdAt = payload.creationTime;
      state.uid = payload.uid;
      state.isLoaded = false;
    })
    .addCase(addNewUser.pending, (state) => {
      state.isLoaded = true;
      state.errorAuth = null;
    })
    .addCase(addNewUser.rejected, (state, { error }) => {
      state.isLoaded = false;
      state.errorAuth = error?.code;
    })
    .addCase(loginUser.fulfilled, (state, { payload }) => {
      state.name = payload.displayName || payload.email.split('@')[0];
      state.email = payload.email;
      state.createdAt = payload.creationTime;
      state.uid = payload.uid;
      state.isLoaded = false;
      state.errorAuth = null;
    })
    .addCase(loginUser.pending, (state) => {
      state.isLoaded = true;
      state.errorAuth = null;
    })
    .addCase(loginUser.rejected, (state, { error }) => {
      console.log(error);
      state.isLoaded = false;
      state.errorAuth = error?.code;
    })
    .addCase(logOut.fulfilled, (state) => {
      state.name = '';
      state.email = '';
      state.createdAt = null;
      state.uid = '';
      state.isLoaded = false;
    })
    .addCase(logOut.pending, (state) => {
      state.isLoaded = true;
    })
    .addCase(logOut.rejected, (state, { error }) => {
      state.isLoaded = false;
      state.errorAuth = error?.code;
      console.log(error);
    })
    .addCase(renameUser.fulfilled, (state, action) => {
      state.isLoaded = false;
      state.name = action.payload.displayName || state.email.split('@')[0];
    })
    .addCase(renameUser.pending, (state) => {
      state.isLoaded = true;
    })
    .addCase(renameUser.rejected, (state, { error }) => {
      state.isLoaded = false;
      state.errorAuth = error?.code;
      console.log(error);
    })
  },
});

export const { clearErrorAuth } = userSlice.actions;

export default userSlice.reducer;
