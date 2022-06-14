export type Student = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string 
}

export type StudentLogin = {
    email: string,
    password: string
}

type support = {
    url: string,
    text: string
}

export type StudentGetById = {
    data: Student,
    support: support
}

export type StudentListData = {
    data: Student,
    page: number,
    per_page: number,
    support: support,
    total: number,
    total_pages: number
}

export type StudentLoginToken = {
    token: string
}
