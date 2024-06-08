export interface RegisterParams {
    first_name: string
    last_name: string
    gender: string
    email: string
    password: string
    date_of_birth: Date
    phone_number: number
}
export interface LoginParams {
    email: string
    password: string
}

export interface BooksListParam {
    rating: number
    price: number
    query: string
}
export interface BookAddParam {
    name: string
    author: string
    genre: string
    star_rating: number
    published: Date
    price: number
    language: string
    image: string
}
export interface BookEditParam {
    book_id: string
    name: string
    author: string
    genre: string   
    star_rating: number
    published: Date
    price: number
    language: string
    image: string
}
export interface BookRemoveParam {
    book_id: string
}
export interface UserData {
    userId: string;
}

export interface ReviewAddParam {
    user: string
    book: string
    rating: number
    message: string
}