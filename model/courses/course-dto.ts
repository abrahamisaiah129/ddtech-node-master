import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export type TTopic = {
  content: string;
  external_links: string[];
  title: string;
  videos: string[];
  _id?: string;
  is_completed?: boolean;
}

export class CourseResourceType {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  external_links: string[];

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  videos: string[];
}

export class CreateCourseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  resources: CourseResourceType[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  teachers: string[]
}