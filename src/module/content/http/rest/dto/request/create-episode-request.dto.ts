import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEpisodeRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly season: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly number: number;

  @IsString()
  readonly description: string;
}
