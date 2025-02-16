import { createSlice } from '@reduxjs/toolkit';
import folderStructureData from '../../data/data';

const initialState = {
	selectedId: '1',
	folderStructure: folderStructureData,
  };
  
  const folderSlice = createSlice({
	name: 'folder',
	initialState,
	reducers: {
	  setSelectedId: (state, action) => {
		state.selectedId = action.payload;
	  },
	//   toggleFolderNode: (state, action) => {
	// 	// const { selectedId, toggled } = action.payload;
	// 	state.folderTree = action.payload;
	//   },
	},
  });
  
  export const { setSelectedId, toggleFolderNode } = folderSlice.actions;
  export default folderSlice.reducer;