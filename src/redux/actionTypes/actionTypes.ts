import { single, promise } from './lib';

export default [
  // Single Actions
  single('single_action'),
  single('auth_sign_out'),
  /**
   * Promise Actions -> Second arguments guide
   * c: CREATE
   * l: LOAD
   * a: LOAD_ALL
   * u: UPDATE
   * d: DELETE
   */

  promise('profile', 'lu'),
];
