export const api = {

  // 文章
  getArticle: ['/blog/article', 'get'],
  addArticle: ['/blog/article', 'post'],
  updateArticle: ['/blog/article', 'put'],
  deleteArticle: ['/blog/article', 'delete'],

  //文章列表
  getArticleList: ['/blog/articleList', 'get'],
  getCategoryList: ['/blog/categoryList', 'get'],

  //分类
  getCategory: ['/blog/category', 'get'],
  addCategory: ['/blog/category', 'post'],
  updateCategory: ['/blog/category', 'put'],
  deleteCategory: ['/blog/category', 'delete'],

  //归档
  getArchive: ['/blog/archive', 'get']
}