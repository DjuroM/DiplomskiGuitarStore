import { Guitar } from "./guitar.model";
import { User } from "./user.model";

export class Review {
    public id?: number;
    public user!: User;
    public guitar !: Guitar;
    public review !: string;
    public rating !: number;


}