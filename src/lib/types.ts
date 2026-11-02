export const categories = ["Fiction", "Science", "History", "Kids", "Others"] as const;
export type BookCategory = (typeof categories)[number];

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: BookCategory;
  image: string;
  description: string;
  addedByName: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: string;
  updatedAt: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userId: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface UserView {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}
