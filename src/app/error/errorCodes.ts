export const errorCodes: { [key: string]: string } = {
  default: 'An unexpected error happened.',
  signin_with_google:
    'An unexpected error happened when trying to sign in with Google.',
  missing_username: 'Users must have a username to perform this operation.',
  reset_password:
    'An unexpected error happened when sending the email for resetting your password.',
  delete_account:
    'An unexpected error happened when trying to delete your account.',
  update_password:
    'An unexpected error happened when trying to update your password.',
  sign_up: 'An unexpected error happened when trying to sign up.',
  sign_out: 'An unexpected error happened when trying to sign out.',
  logout: 'An unexpected error happened when trying to logout.',
  session: 'An unexpected error happened when trying to get your user session.',
  no_profile_found: 'No profile was found.',
  unique_username:
    'An issue was observed with your username. Please contact the support team.',
  conversation_participants:
    'An issue was observed when fetching your conversations. Please contact the support team.',
}
