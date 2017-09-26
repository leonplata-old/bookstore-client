export interface IBook {
  title: string;
  edition_date: Date;
  authors?: IAuthor[];
}

export interface IAuthor {
  id_author: number;
  name: string;
}

export interface IAuthorPagination {
  authors: IAuthor[];
}

export interface IBookPagination {
  books: IBook[];
}

export interface IAuthorSelection {
  author: IAuthor;
  selected: boolean;
}

export interface FormState {
  selections: IAuthorSelection[];
}

export interface IBookAuthorAssociation {
  add?: number[];
  remove?: number[];
}