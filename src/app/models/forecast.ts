export class DailyForecasts {
    [x: string]: any;
    DailyForecasts: DailyForecasts[];
    public constructor(Date?: Date,
        EpochDate?: number,
        Temperature?: Temperature,
        Day?: Day,
        Night?: Night) {
    }
}
export interface Minimum {
    Value: number;
    Unit: string;

    UnitType: number;
}

export interface Maximum {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Temperature {
    Minimum: Minimum;
    Maximum: Maximum;
}

export interface Day {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
}

export interface Night {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
}


