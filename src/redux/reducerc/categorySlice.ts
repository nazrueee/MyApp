import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {setItem, showError, showSuccess} from '../../utils/helperFunctions';

interface Category {
  id: string;
  name: string;
}
interface CategoryState {
  categories: Category[];
}
const initialState: CategoryState = {
  categories: [],
};
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCartItemCategories: (state, action: PayloadAction<Category>) => {
      const exists = state.categories.some(cat => cat.id === action.payload.id);
      if (exists) {
        showError('Already added');
      } else {
        state.categories = [...state.categories, action.payload]; // Spread existing and add new item
        setItem('categories', state.categories); // Store directly to local
        showSuccess('Item added to Cart');
      }
    },

    clearCategories: (state, action) => {
      const categoryId = action.payload;
      if (categoryId) {
        // Remove specific category by ID
        state.categories = state.categories.filter(
          category => category.id !== categoryId,
        );
        console.log(`Category with ID ${categoryId} removed successfully!`);
      } else {
        // Clear all categories
        state.categories = [];
        console.log('All categories cleared successfully!');
      }
      // Update AsyncStorage
      setItem('categories', state.categories).catch(error =>
        console.error('Failed to update categories:', error),
      );
    },
  },
});

export const {setCartItemCategories, clearCategories} = categorySlice.actions;
export default categorySlice.reducer;
