import CONSTANTS from './CONSTANTS';

const goBack = 1;

const handleFormValidity = (email, pass, phone, name, date) => {
  const isEmpty =
    email.length === 0 ||
    pass.length === 0 ||
    name.length === 0 ||
    phone.length === 0;

  let message = isEmpty
    ? 'Input fields cannot be empty'
    : !CONSTANTS.emailRegex.test(email)
    ? 'Email not valid'
    : pass.length < 6
    ? 'Password length must atleast 6 characters'
    : phone.length < 10
    ? 'Invalid Phone Number. Must be longer than 10 characters'
    : 'Date not selected';

  const isValid =
    !isEmpty &&
    CONSTANTS.emailRegex.test(email) &&
    pass.length >= 6 &&
    phone.length === 11 &&
    date !== null &&
    date.length !== 0;

  return {message, isValid};
};

const HANDLERS = {goBack, handleFormValidity};
export default HANDLERS;
