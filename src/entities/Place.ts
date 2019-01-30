import { 
  BaseEntity, 
  Entity, 
  PrimaryGeneratedColumn,
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
} from "typeorm";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  
  @Column({type:'double precision', default: 0})
  lat: number;
  
  @Column({type:'double precision', default: 0})
  lng: number;
  
  @Column({type:'text'})
  address: string;

  @Column({type:'text'})
  name: string;

  @Column({type: 'boolean'})
  isFav: boolean;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Place;