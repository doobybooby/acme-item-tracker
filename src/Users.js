import React from 'react';
import UserForm from './UserForm'
import { connect } from 'react-redux';
import axios from 'axios'

const Users = ({ users, things, deleteUser })=> {
  console.log(users)
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name }
                <button onClick={()=> deleteUser(user.id)}>DELETE</button>
                {
                    things.map(thing => {
                      if(thing.Id !== null && user.thingId !== null && user.thingId === thing.userId){
                        console.log('user', user.thingId, user.name, 'owns', thing.userId, thing.name)
                        return <>
                          <p key={thing.id}>BELONGS TO:{thing.name}</p>
                        </>
                      }
                    })
                  }
              </li>
            );
          })
        }
      </ul>
      <UserForm />
    </div>
  );
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteUser: async(id)=> {
      await axios.delete(`/api/users/${id}`);
      dispatch({ type: 'DELETE_USER', id });
    }
  };
}

export default connect(
  (state)=> {
    return {
      users: state.users,
      things: state.things
    }
  },
  mapDispatchToProps
)(Users);
