export default function ({ store, redirect, error }) {
  if (!store.state.auth.authUser) redirect('/login')
  else if (!store.state.auth.authUser.isAdmin) error({ statusCode: 401, message: 'Not authorized' })
}
