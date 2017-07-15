export const handleError = (msg, throwError = true) => {
  const error = new Meteor.Error(
    403,
    Accounts._options.ambiguousErrorMessages
      ? 'Login failure. Please check your login credentials.'
      : msg,
  );
  if (throwError) {
    throw error;
  }
  return error;
};

export const reportError = (error, callback) => {
  if (callback) {
    callback(error);
  } else {
    throw error;
  }
};
