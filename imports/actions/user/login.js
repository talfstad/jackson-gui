import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import ValidateLoginSchema from '/imports/api/meteor/schemas/validation/login';

export const LOGIN_ERRORS = 'LOGIN_ERRORS';

// Intent: thunk, never calls dispatch, just logs user out
export const logUserOut = () => () =>
  Meteor.logout();

export const logUserIn = ({ email, password }) => (dispatch) => {
  const loginFormValidationContext = ValidateLoginSchema.namedContext();
  loginFormValidationContext.validate({ email, password });

  if (loginFormValidationContext.isValid()) {
    Meteor.loginWithPassword(email, password, (loginError) => {
      if (loginError) {
        dispatch({
          type: LOGIN_ERRORS,
          payload: [{
            name: 'password',
            message: loginError.reason,
          }],
        });
      } else {
        dispatch({
          type: LOGIN_ERRORS,
          payload: [],
        });
      }
    });
  } else {
    // Map simplschema validation errors to error messages
    const validationErrors = _.map(loginFormValidationContext.validationErrors(), o =>
      _.extend({ message: loginFormValidationContext.keyErrorMessage(o.name) }, o));

    dispatch({
      type: LOGIN_ERRORS,
      payload: validationErrors,
    });
  }
};
