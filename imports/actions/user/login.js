import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import ValidateLoginSchema from '/imports/api/meteor/schemas/validation/login';

export const LOGIN_ERRORS = 'LOGIN_ERRORS';
export const CREATE_USER_ERRORS = 'CREATE_USER_ERRORS';

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

export const createAccount = ({ email, password, confirmPassword }) => (dispatch) => {
  const loginFormValidationContext = ValidateLoginSchema.namedContext();
  loginFormValidationContext.validate({ email, password });

  if (loginFormValidationContext.isValid()) {
    // Intent: verify passwords match
    if (password !== confirmPassword) {
      dispatch({
        type: CREATE_USER_ERRORS,
        payload: [{
          name: 'confirm-password',
          message: 'Passwords do not match',
        }],
      });
    } else {
      Accounts.createUser({
        email,
        password,
      }, (createError) => {
        if (createError) {
          dispatch({
            type: CREATE_USER_ERRORS,
            payload: [{
              name: 'confirm-password',
              message: createError.reason,
            }],
          });
        } else {
          dispatch({
            type: CREATE_USER_ERRORS,
            payload: [],
          });
        }
      });
    }
  } else {
    // Map simplschema validation errors to error messages
    const validationErrors = _.map(loginFormValidationContext.validationErrors(), o =>
      _.extend({ message: loginFormValidationContext.keyErrorMessage(o.name) }, o));

    dispatch({
      type: CREATE_USER_ERRORS,
      payload: validationErrors,
    });
  }
};
