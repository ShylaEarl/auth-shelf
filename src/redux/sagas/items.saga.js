import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* itemsSaga() {
    yield takeEvery( 'FETCH_ITEMS', fetchAllItems );
}

function* fetchAllItems() {
    // get all items from the Database
    try {
        const items = yield axios.get('/api/shelf');
        console.log('In fetchAllItems saga', items.data);
        
        yield put({ type: 'SET_ITEMS', payload: items.data });

    } catch {
        console.log('FETCH ALL Error');
    }
}


export default itemsSaga;