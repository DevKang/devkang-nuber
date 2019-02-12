import { 
  BaseEntity, 
  Entity, 
  PrimaryGeneratedColumn,
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import User from "./User";

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

  // 이런 식으로 Relation이름 + Id 로 Column 을 생성하면 ORM 에서 자동으로 해당 relation을 가져와서 presenting 한다.
  @Column({ nullable: true })
  userId:number;

  @ManyToOne(type => User, user => user.places)
  user: User;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Place;