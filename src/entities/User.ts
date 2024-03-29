import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Answer } from "./Answer";
import { Club } from "./Club";
import { Question } from "./Question";

@Entity("users")
class User {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    admin: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Question, Question => Question.created_by)
    questions: Question[]

    @ManyToMany(()=> Question, Question => Question.likes)
    @JoinTable({name: "users_likes_questions"})
    liked_questions: Question[]

    @ManyToMany(()=> Answer, Answer => Answer.likes)
    @JoinTable({name: "users_likes_answers"})
    liked_answers: Answer[]

    @OneToMany(()=>Answer, Answer=> Answer.created_by)
    answers: Answer[]

    @ManyToMany(() => Club, Club => Club.reports)
    reports: Club[];

    @OneToMany(() => Club, Club => Club.created_by)
    created_clubs: Club[]

    @ManyToMany(() => Club, Club => Club.users)
    @JoinTable({ name: "users_clubs" })
    clubs: Club[]

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };
