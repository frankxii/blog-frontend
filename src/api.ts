export const api = {

  // 用户
  addUser: ['/blog/user', 'post'],
  updateUser: ['/blog/user', 'put'],
  deleteUser: ['/blog/user', 'delete'],
  getUserList: ['/blog/userList', 'get'],
  getUserSearchList: ['/blog/userSearchList', 'get'],

  // 权限组
  addGroup: ['/blog/group', 'post'],
  updateGroup: ['/blog/group', 'put'],
  deleteGroup: ['/blog/group', 'delete'],
  getGroupList: ['/blog/groupList', 'get'],

  // 权限组成员
  getGroupMembers: ['/blog/group/members', 'get'],
  updateGroupMembers: ['/blog/group/members', 'put'],

  // 文章
  getArticle: ['/blog/article', 'get'],
  addArticle: ['/blog/article', 'post'],
  updateArticle: ['/blog/article', 'put'],
  deleteArticle: ['/blog/article', 'delete'],

  // 文章列表
  getArticleList: ['/blog/articleList', 'get'],
  getCategoryList: ['/blog/categoryList', 'get'],

  // 分类
  getCategory: ['/blog/category', 'get'],
  addCategory: ['/blog/category', 'post'],
  updateCategory: ['/blog/category', 'put'],
  deleteCategory: ['/blog/category', 'delete'],

  // 标签
  getTagMap: ['/blog/tagMap', 'get'],

  // 归档
  getArchive: ['/blog/archive', 'get']
}