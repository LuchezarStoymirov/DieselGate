export class User {
    id?: number = 0;
    username: string = '';
    password: string = '';
    email: string = '';
    claims: any[] = [];
}

export class LoginUser {
    username: string = '';
    password: string = '';
}
