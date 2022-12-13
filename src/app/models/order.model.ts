import { Country } from "./country.model";
import { Guitar } from "./guitar.model";
import { User } from "./user.model";

export class Order {
    public id?: number;
    public user!: User;
    public address !: string;
    public guitars !: Guitar[];
    public order_date !: Date;
    public country!: Country;
    public price !: string;

}