import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({users, things, deleteThing, addRank, subtractRank })=> {
  things.sort((a,b)=> b.ranking - a.ranking )
  console.log(users)
  return (
    <div>
      <h1>Things</h1>
      <ol>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name }
                <p>RANKING: { thing.ranking }</p>
                <button onClick={()=> addRank(thing)}>+</button>
                <button onClick={()=> subtractRank(thing)}>-</button>
                <button onClick={()=> deleteThing(thing)}>DELETE</button>
                  {
                    users.map(user => {
                      if(user.thingId !== null && thing.userId !== null && user.thingId === thing.userId){
                        console.log('user', user.thingId, user.name, 'owns', thing.userId, thing.name)
                        return <>
                          <p key={user.id}>BELONGS TO:{user.name}</p>
                        </>
                      }
                    })
                  }
              </li>
            );
          })
        }
      </ol>
      <ThingForm />
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteThing: async(thing)=> {
      await axios.delete(`/api/things/${thing.id}`);
      dispatch({ type: 'DELETE_THING', thing });
    },

    addRank: (thing)=> {
      dispatch({type: 'ADD_RANK', thing})
    },
    
    subtractRank: (thing)=> {
      dispatch({type: 'SUBTRACT_RANK', thing})
    }
  };
}

export default connect(
  (state)=> {
    return {
      things: state.things,
      users: state.users
    }
  },
  mapDispatchToProps
)(Things);
