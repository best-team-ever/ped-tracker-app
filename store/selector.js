export function mapStateToProps(state) {
  return {
    loggedIn:state.loggedIn,
    emailUser:state.emailUser,
    datatill:state.datatill,
    listDevices:state.listDevices,
    storeUser:state.storeUser,
   }
}
