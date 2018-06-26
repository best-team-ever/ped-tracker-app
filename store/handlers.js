export function mapDispatchToProps(dispatch) {
  return {
    connected : (value) => dispatch({type : "CONNECTED", emailUser : value}),
    confirmTpe : (value) => dispatch({type : "CONFIRM_TPE", serial : value}),
  }
}
