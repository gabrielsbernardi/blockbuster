import { LanguageEnum } from '@model/language-enum';
import { ProviderEnum } from '@model/provider-enum';
import { GenderEnum } from '@model/gender-enum';
import { MovieTypeEnum } from '@model/movie-type-enum';
import { ProductTypeEnum } from '@model/product-type-enum';

export class Movie {
  id: number;
  productType: ProductTypeEnum;
  movieType: MovieTypeEnum;
  gender: GenderEnum;
  title: string;
  mainActors: string;
  mainDirectors: string;
  provider: ProviderEnum;
  languageType: LanguageEnum;
  price = 0;
  launch: Date;
  url: string;
  description: string;
}
