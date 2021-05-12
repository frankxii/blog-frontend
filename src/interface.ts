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