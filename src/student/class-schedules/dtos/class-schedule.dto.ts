import { ApiProperty } from "@nestjs/swagger";

export class ClassScheduleDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    schedule: string;

    @ApiProperty()
    isAlmostFull: boolean;
    
    @ApiProperty()
    isFull: boolean;
}