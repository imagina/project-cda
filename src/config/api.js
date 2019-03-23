/*
* In javascript the variables are declared in camelcase but I like use snake case,
* if you want you can rename them as you want and remove the rule in .eslintrc line 35
*/
const base_url 	= env('BASE_URL', 'http://localhost:8000');
const api_url 	= base_url + '/api';
const api_icda 	= api_url  + '/icda';

export default {
  base_url,
  api_url,
  api_icda,
  token_url: base_url + '/api/login',
  login_url: base_url + '/api/auth/login',
  logout_url: base_url + '/api/auth/logout',
}
