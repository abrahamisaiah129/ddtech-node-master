import { IsNotEmpty, IsOptional, IsEmail, IsIn, IsString, ValidateNested } from "class-validator";

export class SignupBodyDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsIn(["student", "teacher"])
  role: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  about: string;

  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  address: {
    addressString: string;
    geoLocation: any;
    postCode: string;
  };
}

export class LoginBodyDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  loginPass: string;
}

export class FinishPasswordResetDTO {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
