import { ArrayMinSize, IsArray, IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";

export type IClassMessage = {
  user: string;
  createdAt: number | Date;
  messsage: string;
  image: string;
}

export class AMeetingDTO {
  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  instructions: string;

  @IsNotEmpty()
  duration: {
    value: number,
    unit: "min" | "hour",
  };

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  platform: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  date: number | Date | string;
}

export class CreateClassDTO {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  teachers: string[];

  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  meetings: AMeetingDTO[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  courses: string[];

  @IsString()
  @IsNotEmpty()
  title: string;
}