export default function ({ store, route, redirect, error }) {
  if (route.path !== '/login') {
    if (!store.state.auth.authUser) redirect('/login')
    else if (!store.state.auth.authUser.isAdmin) error({ statusCode: 401, message: 'Not authorized' })
  }
}
