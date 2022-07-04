import { User } from "src/app/admin/user";

export class CommentPayload{
    id: number;
    content: string;
    created_at: Date;
    user: User;
    constructor(id:number, content:string,created_at:Date , user:User){
        this.id = id
        this.content = content
        this.created_at = created_at
        this.user = user;
    }
}