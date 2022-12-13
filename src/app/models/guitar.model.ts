import { Brand } from "./brand.model";
import { GuitarType } from "./guitarType.model";
import { Pickups } from "./pickups.model";

export class Guitar {
    public id !: number;
    public model !: string;
    public guitar_type !: GuitarType;
    public pickups !: Pickups;
    public price !: string;
    public release_year?: string;
    public image?: string;
    public description !: string;
    public brand !: Brand;
}