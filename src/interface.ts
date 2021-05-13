export interface SelectorOption {
  value: number,
  text: string
}

export interface Article {
  id: number,
  category_name: string,
  tags: number[],
  title: string,
  excerpt: string,
  visit: number,
  create_time: string,
  update_time: string
}

export interface User {
  id: number,
  is_active: boolean,
  username: string,
  create_time: string,
  last_login: string
}