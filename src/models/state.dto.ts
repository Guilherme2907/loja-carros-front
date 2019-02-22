import { CityDTO } from './city.dto';

export interface StateDTO {
    id : string,
    nome : string,
    city? : CityDTO
}