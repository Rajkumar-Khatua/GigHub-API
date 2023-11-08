 const createError = (status, message) => {
  // create a new error
  const err = new Error();
  err.status = status;
  err.message = message;

  return err;
};
export default createError