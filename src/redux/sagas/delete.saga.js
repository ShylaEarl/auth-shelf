import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteShelfItem() {
  try {
    const item = yield axios.delete(`/api/shelf/${action.payload}`);
    console.log('here is item', item);
     yield put({ type: 'REMOVE_ITEM' });

 } catch (error) {
     alert(' sorry cannot delete is not working now. Try again later');
     console.log('error adding details', error);
 }
}

export default deleteShelfItem;
