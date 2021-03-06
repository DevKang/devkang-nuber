import { 
  BaseEntity, 
  Entity, 
  PrimaryGeneratedColumn,
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { verificationTarget } from "src/types/types";

const PHONE = "PHONE"
const EMAIL = "EMAIL"

@Entity()
class Verification extends BaseEntity {

  @PrimaryGeneratedColumn() id: number;

  @Column({type:"boolean", default: false}) 
  verifiedEmail: boolean;
  
  @Column({type: 'text', enum: [PHONE, EMAIL]})
  target: verificationTarget;

  @Column({type: 'text'})
  payload: string;

  @Column({type: 'text'})
  key: string;

  @Column({type: 'text', default:false})
  verified: boolean;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString();
    } else if(this.target === EMAIL) {
      this.key = Math.random().toString(36).substr(2);
    }
  }
}

export default Verification;