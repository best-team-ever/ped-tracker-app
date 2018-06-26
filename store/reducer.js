import { datatill } from "./../modules/data/data.js"

const initialState = {
  loggedIn:true,
  emailUser:"nope",
  datatill:datatill,
    };

function updateTpe(list, serial) {
  const newlist = list.map((tpe) =>
    (tpe.title.serial === serial) ? {serial:serial, lastinventory:"2018-06-25"} : tpe
  );
  console.log(newlist);
  return newlist;
}

    const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CONNECTED':
    console.log("action : ", action);
      return {
        ...state,
        loggedIn: true,
        emailUser: action.emailUser,
        }

    case 'CONFIRM_TPE':
      return {
        ...state,
        datatill: updateTpe(state.datatill ,action.serial)
        }

    default:
      return state
  }
}

export default reducer;
