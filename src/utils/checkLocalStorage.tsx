import store from '../redux/store';
import {setUserData} from '../redux/reducerc/userSlice';
import {setCartItemCategories} from '../redux/reducerc/categorySlice';
import {getItem} from './helperFunctions';

const {dispatch} = store;
const checkLocalStorage = async () => {
  const userData = await getItem('userData');
  const WishlistItem = await getItem('categories');

  if (userData) {
    dispatch(setUserData(userData));
  }
  if (WishlistItem && Array.isArray(WishlistItem)) {
    WishlistItem.forEach(item => dispatch(setCartItemCategories(item)));
  }
};

export default checkLocalStorage;
