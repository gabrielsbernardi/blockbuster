import { LanguageEnum } from '@model/language-enum';
import { ProviderEnum } from '@model/provider-enum';
import { GenderEnum } from '@model/gender-enum';
import { MovieTypeEnum } from '@model/movie-type-enum';
import { ProductTypeEnum } from '@model/product-type-enum';

export class Movie {
  id: number;
  productType = ProductTypeEnum.BLU_RAY;
  movieType = MovieTypeEnum.HOURS_6;
  gender = GenderEnum.ACAO;
  title: string;
  mainActors: string;
  mainDirectors: string;
  provider = ProviderEnum.GLOBOSAT;
  languageType = LanguageEnum.EN_US;
  price = 0;
  launch = new Date();
  url: string;
  description: string;
  evaluation = 0;
}
