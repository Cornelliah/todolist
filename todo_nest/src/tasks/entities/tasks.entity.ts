import { Entity, PrimaryColumn, Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Task {
    @PrimaryColumn()
    id: string = uuidv4();

    @Column()
    titre: string;

    @Column({ default: false })
    done: boolean;

    @Column({ default: false })
    edited: boolean;
}
