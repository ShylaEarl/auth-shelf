import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function ShelfPage() {

  const dispatch = useDispatch();

  //dispatch to item saga returns all items from DB 
    //and adds them to the item reducer
  // useEffect(() => {
  //     dispatch({ type: 'FETCH_ITEMS' }); //add action **DOUBLE CHECK NAMING CONVENTIONS**
  // }, []);

  //creates a redux store instance for items reducer **DOUBLE CHECK NAMING CONVENTION!**
  //const items =useSelector(store => store.items);
  const user_id = useSelector(store => store.userReducer)

  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');
  //we also need to add the user's id to the new item object. How do we capture this?

  //post route should be moved to it's own saga...
  //dispatch({type: 'ADD_ITEM', payload: action.payload});
  const addItem = () => {
    //DOUBLE CHECK URL HERE. Also we need to send user_id to DB, but how do we capture it?
    axios.post('/api/shelf',
      {
        description: description,
        image_url: image_url,
        user_id: user_id,
      } 
    ).then(response => {
      console.log('back from POST', response)
    }).catch(error => {
      console.log('in addItem POST', error)  
    });
  } 

  return (
    <div className="container">
      <div className="shelf-item-inputs">
        <h2>Add an Item to the Shelf!</h2>
        <input type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)} 
        />
        <br />
        <input type="text"
          placeholder="Image URL" 
          value={image_url}
          onChange={(event) => setImageUrl(event.target.value)}
        />
        <br />
        <button onClick={addItem}>Add Item to Shelf</button>
      </div>
      <div>
        <h2>Shelf</h2>
        <p>All of the available items can be seen here.</p>
        {/* may want to add div here to list item objects rather than li */}
        {/* {items.map((item, i) => {
            return (  
              <ul>
                <li key={i}>{item.description}{item.image_url}</li>
              </ul>
            );
        })} */}
      </div>
      {/* We may need to move this delete button. Somehow we need to connect it to the id of the item being deleted */}
      <button>Delete Item</button>
    </div>
  );
}

export default ShelfPage;


