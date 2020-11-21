import { connect } from "react-redux";
import dispatchHelper from "./dispatch.helper";

export default (mapStateToProps = undefined) =>
  connect(mapStateToProps, (dispatch: any) => ({
    dispatch,
    promise: (args) => dispatchHelper(dispatch, args),
  }));
