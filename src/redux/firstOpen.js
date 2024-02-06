import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstOpenSite: true,
};

export const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setFirstOpenSite: (state, action) => {
      console.log('Получено действие setFirstOpenSite:', action.payload);
      state.firstOpenSite = action.payload;
    },
  },
});

export const { setFirstOpenSite } = siteSlice.actions;
export default siteSlice.reducer;
