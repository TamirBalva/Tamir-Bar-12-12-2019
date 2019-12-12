export class City {
  [x: string]: any;
    public constructor(
    public Version?: number,
    public Key?: string,
    public Type?: string,
    public Rank?: number,
    public LocalizedName?: string,
    public Country?: Country,
    public AdministrativeArea?: AdministrativeArea){}
}

export interface Country {
    ID: string;
    LocalizedName: string;
}

export interface AdministrativeArea {
    ID: string;
    LocalizedName: string;
}

