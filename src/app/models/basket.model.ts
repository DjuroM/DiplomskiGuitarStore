import { Guitar } from "./guitar.model";
import { User } from "./user.model";

export class Basket {
    public id?: number;
    public user !: User;
    public guitar !: Guitar;
}