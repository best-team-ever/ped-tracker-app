export function mapDispatchToProps(dispatch) {
  return {
    connected : (mail, list) => dispatch({type : "CONNECTED", emailUser : mail, allusers : list}),
    confirmTpe : (value) => dispatch({type : "CONFIRM_TPE", serial : value}),
    setInitialState : (value) => dispatch({type : "SET_INIT_STATE", state : value}),
    updatereduxtpe : (value) => dispatch({type : "UPDT_TPE", tpe : value}),
  }
}
