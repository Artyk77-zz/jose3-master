import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000/warehouses'
})

class App extends Component {
  state = {
    warehouses: [],
  }
  constructor() {
    super();
    this.getWarehouses();
  }

getWarehouses = async () => {
  try {
    let data = await api.get('/').then(({ data }) => data );
    this.setState({ warehouses: data})
    console.log(data) 
  } catch (err) {
    console.log(err)
  }
}

createNew = async () => {
  try {
    let res = await api.post('/', { id:2, name:"New Warehouse", description: "Newly added Warehouse", inventory: []})
    console.log(res)
    this.getWarehouses();
  } catch (err) {
    console.log(err)
  }
}
updateItem = async (id) => {
  try {
    let res = await api.patch(`${id}`, { inventory: [{
      id:1,
      itemId: 1,
      name: "Item Update",
      description: "Item Updated"
    }]})
    console.log(res)
    this.getWarehouses();
  } catch (err) {
    console.log(err)
  }
}
updateWarehouse = async (id, val) => {
  try  {
    let data = await api.patch(`/${id}`, { name: val })
    this.getWarehouses();
  } catch (err) {
    console.log(err)
  }

}
  render() {
      return (
        <div className="App container">
         
              <Table>
              
                {this.state.warehouses.map(warehouse =>
                <>
                   <thead>
                   <h2 onClick={() => this.updateWarehouse(warehouse.id, `${warehouse.name} UPDATED`)}key={warehouse.id}>{warehouse.name}/{warehouse.description}</h2>
                   <tr>
                     <th>#</th>
                     <th>Item Id</th>
                     <th>Name</th>
                     <th>Description</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     {warehouse.inventory.map(i => 
                     <>
                     <th scope="row">1</th>
                     <td key={i.itemId}>{i.itemId}</td>
                     <td>{i.name}</td>
                     <td>{i.description}</td>
                     </>
                    
                     )}
                  
                   </tr>
                 </tbody>
                 
                 </>)}
                 <button onClick={() => this.updateItem(1)}>Update new Inventory Item</button>
                 <button onClick={() => this.createNew()}>Create New Warehouse</button>
               
  </Table>
        </div>
      );
   }
}

export default App;
