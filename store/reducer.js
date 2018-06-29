import { datatill } from "./../modules/data/data.js"

const initialState = {
  loggedIn:false,
  emailUser:"nope",
  // storeUser:"16213c8f-ba02-4120-a1cc-0e735a12d81a",
  storeUser:"",
  // userId:"1d72faa0-318a-44c1-a15a-87f583094d7f",
  userId:"",
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

  // function confirmTpe(tpe,serial) {
  //     if (tpe.serial_nr === serial) {
  //       return {...tpe,updatedAt:"2000-06-28T09:46:42.255Z"}
  //     } else {
  //       return tpe
  //     }
  //   }

function findStoreUse(mail,list) {
  let userloc = "";
  let finduser=list.map(
    (user) => {
      if (user.email === mail) {
         userloc=user.location_id
      }
    }
  )
  //userloc="16213c8f-ba02-4120-a1cc-0e735a12d81a";
  return userloc;
}

function findUserId(mail,list) {
  let userid = "";
  let finduser=list.map(
    (user) => {
      if (user.email === mail) {
         userid=user.id
      }
    }
  )
  //userid="1d72faa0-318a-44c1-a15a-87f583094d7f";
  return userid;
}

    const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CONNECTED':

      return {
        ...state,
        loggedIn: true,
        emailUser: action.emailUser,
        storeUser: findStoreUse(action.emailUser, action.allusers),
        userId: findUserId(action.emailUser, action.allusers),
        }

    case 'SET_INIT_STATE':
      return {
        ...state,
        listDevices: action.state
        }

    case 'UPDT_TPE':
      newlistDevices = state.listDevices.map(
        (tpe) => updateTpe(tpe,action.tpe)
        )
      return {
        ...state,
        listDevices: newlistDevices
        }

    case 'CONFIRM_TPE':
      newlistDevices = state.listDevices.map(
        (tpe) => confirmTpe(tpe,action.serial)
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
