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

export interface Group {
  id: number,
  name: string
}

export interface Member {
  id: number,
  username: string
}

export interface MenuItem {
  key: string,
  title: string,
  link: string
}

export interface MySubMenu {
  key: string,
  title: string,
  children: Array<MenuItem>
}

export interface PermissionNode {
  key: string,
  title: string,
  children: Array<PermissionNode>
}

//网站更新记录
export interface Record {
  datetime: string,
  event: string
}