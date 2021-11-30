import { Observable } from "rxjs";
import { User } from "../admin/user";
import { CommentPayload } from "./sing-post/commentPayload";

export class PostPayload{
    id: number ;
    content: string ;
    title: string ;
    username: string  ;
    lang: string;
    created_at: Date ;
    comments?: Array< CommentPayload>;
    user: User

    constructor(id:number , content:string,username:string,lang:string, title:string,created_at:Date,user:User ){
        this.id = id;
        this.content = content;
        this.title = title;
        this.username = username;
        this.lang = lang;
        this.created_at = created_at;
        this.user= new User();
        
    }

}