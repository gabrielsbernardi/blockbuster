import { GenderEnum } from '@model/gender-enum';

export interface MovieFilter {
  title: string;
  mainDirectors: string;
  initialDate: Date;
  finalDate: Date;
  initialPrice: number;
  finalPrice: number;
  gender: GenderEnum;
  evaluation: number;
}
