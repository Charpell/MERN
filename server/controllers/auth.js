// Authentication related stuff can be handled here
// Export your controller as done below. don't use 'export default' since
// you are gonna export it with 'export *' in the index file of this folder

import _ from 'lodash';
import User from '../models/User';

const signUp = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then(() => user.generateAuthToken()).then((token) => {
    res.header('x-auth', token).send({ user });
  }).catch((error) => {
    res.status(400).send(error);
  });
};

const signIn = (req, res) =>
  res.status(200).json('Handle Sign in logic');

export { signUp, signIn };
