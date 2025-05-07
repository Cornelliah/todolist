import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    titre: string;
    done: boolean;
    edited: boolean;
}

