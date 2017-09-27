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

export interface IAuthorAssociation {
  author: IAuthor;
  selected: boolean;
}

export interface IBookFormState {
  title: string;
  edition_date: Date;
  authorAssociations: IAuthorAssociation[];
}

export interface IBookAuthorAssociation {
  add?: number[];
  remove?: number[];
}