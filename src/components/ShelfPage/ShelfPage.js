import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function ShelfPage() {

  const dispatch = useDispatch();

  //dispatch to item saga returns all items from DB 
    //and adds them to the item reducer
  useEffect(() => {
      dispatch({ type: 'FETCH_ITEMS' });
  }, []);

  const items = useSelector(store => store.items);

  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');

  //post route should be moved to it's own saga...
  //dispatch({type: 'ADD_ITEM', payload: action.payload});
  const addItem = () => {
    axios.post('/api/shelf',
      {
        description: description,
        image_url: image_url,
      } 
    ).then(response => {
      console.log('back from POST', response)
    }).catch(error => {
      console.log('in addItem POST', error)  
    });
  } 

  const deleteItem = () => {
    console.log('in delete item', ); //item.id
    
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
        <p>All available items can be seen here.</p>
        {/* {JSON.stringify(items)} */}
        {items.map((item, i) => {
            return (
              <>  
                <ul>
                  <li key={i}>{item.description} <img src={item.image_url} alt="old school key" /></li>
                  <button value={item.id} onClick={(event) => deleteItem(event.target.value)}>Delete Item</button>
                </ul>
              </>
            );
        })}
      </div>
      {/* We may need to move this delete button. Somehow we need to connect it to the id of the item being deleted */}
      
    </div>
  );
}

export default ShelfPage;


