export const frontBlogApi = {
  // 文章
  getArticle: ['/front/article', 'get'],
  getArticles: ['/front/articles', 'get'],
  // 标签
  getTagMap: ['/front/tagMap', 'get'],
  // 归档
  getArchive: ['/front/archive', 'get'],
  // 网站更新记录
  getRecords: ['/front/records', 'get'],
  // 说说
  getMoods: ['/front/moods', 'get']
}

export const backBlogApi = {

  // 文章
  getArticle: ['/back/blog/article', 'get'],
  addArticle: ['/back/blog/article', 'post'],
  updateArticle: ['/back/blog/article', 'put'],
  deleteArticle: ['/back/blog/article', 'delete'],
  getArticles: ['back/blog/articles', 'get'],
  // 分类
  getCategory: ['/back/blog/category', 'get'],
  addCategory: ['/back/blog/category', 'post'],
  updateCategory: ['/back/blog/category', 'put'],
  deleteCategory: ['/back/blog/category', 'delete'],
  getCategories: ['/back/blog/categories', 'get'],
  // 说说
  addMood: ['/back/blog/mood', 'post'],
  deleteMood: ['/back/blog/mood', 'delete'],
  updateMood: ['/back/blog/mood', 'put'],
  getMoods: ['/back/blog/moods', 'get'],
  getMoodDetail: ['/back/blog/mood', 'get']
}

export const backSystemApi = {
  // 用户
  addUser: ['/back/system/user', 'post'],
  updateUser: ['/back/system/user', 'put'],
  deleteUser: ['/back/system/user', 'delete'],
  getUsers: ['/back/system/users', 'get'],
  getUserSearchList: ['/back/system/user/searchList', 'get'],
  // 登录
  addToken: ['back/system/user/token', 'post'],
  // 激活或冻结
  updateUserValidity: ['back/system/user/validity', 'put'],

  // 权限组
  addGroup: ['/back/system/group', 'post'],
  updateGroup: ['/back/system/group', 'put'],
  deleteGroup: ['/back/system/group', 'delete'],
  getGroups: ['/back/system/groups', 'get'],

  // 权限组成员
  getGroupMembers: ['/back/system/group/members', 'get'],
  updateGroupMembers: ['/back/system/group/members', 'put'],

  // 权限组权限
  getGroupPermission: ['/back/system/group/permission', 'get'],
  updateGroupPermission: ['/back/system/group/permission', 'put'],
  // 菜单和权限
  getMenu: ['/back/system/menu', 'get'],
  getPermissionTree: ['/back/system/permission/tree', 'get'],
}