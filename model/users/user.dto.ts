import { IsOptional, IsString, ValidateNested } from "class-validator";

export type TCourseTracker = {
  course: any;
  progress?: number;
  current_topic?: string;
  topics_resolved?: string[];
};

export class EditUserDTO {
  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  about: string;

  @IsOptional()
  @IsString()
  mobile: string;

  @IsOptional()
  @ValidateNested({ each: true })
  address: {
    addressString: string;
    geoLocation: any;
    postCode: string;
  };
}

export class UpdateUserAppSettingsDTO {
  @IsOptional()
  @IsString()
  Profile_Visibility: string;

  @IsOptional()
  @IsString()
  Login_Alerts: string;
}
