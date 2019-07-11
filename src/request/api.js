// 自主配置接口转发部门
const consolePrefixName = '/optionAnalysis-web';
const consoleApi = {
  'getUserInfo': `${consolePrefixName}/login/user`,
  'loginOut': `${consolePrefixName}/api/logout`
};
const api = Object.assign({}, consoleApi);
export default api;
