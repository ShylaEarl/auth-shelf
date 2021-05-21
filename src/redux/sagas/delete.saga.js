import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteShelfItem() {
  
    try {
        yield put({ type: 'DELETE_ITEM' });
        
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };

          yield axios.delete('/api/user/login', action.payload, config);

      } catch (error) {
        console.log('Error Deleting Item:', error);
      }
    
}

export default deleteShelfItem;
