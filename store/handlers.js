export function mapDispatchToProps(dispatch) {
  return {
    connected : (value) => dispatch({type : "CONNECTED", emailUser : value}),
    confirmTpe : (value) => dispatch({type : "CONFIRM_TPE", serial : value}),
    setInitialState : (value) => dispatch({type : "SET_INIT_STATE", state : value}),
    updatereduxtpe : (value) => dispatch({type : "UPDT_TPE", tpe : value}),
  }
}
