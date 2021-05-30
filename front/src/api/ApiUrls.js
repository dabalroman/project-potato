export default {
  categories: 'http://localhost/project-potato/api/public/api/categories',
  items: 'http://localhost/project-potato/api/public/api/items',
  sources: 'http://localhost/project-potato/api/public/api/sources',
  users: 'http://localhost/project-potato/api/public/api/users',
  auth: {
    base: 'http://localhost/project-potato/api/public/api/auth',
    register: '/register',
    login: '/login',
    logout: '/logout',
    refresh: '/refresh'
  }
};
