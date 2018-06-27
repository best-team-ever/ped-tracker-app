import { datatill } from "./../modules/data/data.js"

const initialState = {
  loggedIn:true,
  emailUser:"nope",
  storeUser:"16213c8f-ba02-4120-a1cc-0e735a12d81a",
  listDevices:[],
    };

// function setInitialState(state) {
//   return state
// }

function updateTpe(tpe,newtpe) {
    if (tpe.serial_nr === newtpe.serial_nr) {
      return newtpe
    } else {
      return tpe
    }
  }

    const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CONNECTED':

      return {
        ...state,
        loggedIn: true,
        emailUser: action.emailUser,
        }

    case 'SET_INIT_STATE':
    console.log("**** action : ", action.state);
      return {
        ...state,
        listDevices: action.state
        }

    case 'UPDT_TPE':
    console.log("**** tpe : ", action.tpe);
    newlistDevices = state.listDevices.map(
      (tpe) => updateTpe(tpe,action.tpe)
    )
      return {
        ...state,
        listDevices: newlistDevices
        }

    default:
      return state
  }
}

export default reducer;
