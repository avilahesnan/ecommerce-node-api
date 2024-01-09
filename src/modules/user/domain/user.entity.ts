import { Entity } from "@shared/domain/entity";
import { CreateUserProps, IUser, RecoverUserProps, TypeUser } from "./user.types";

export class User extends Entity<IUser> implements IUser {

    private _name: string = '';
    private _email: string = '';
    private _password: string = '';
    private _type: TypeUser = TypeUser.CLIENT;
    private _dateCreated?: Date | undefined;
    private _dateUpdated?: Date | undefined;
    private _dateDeletion?: Date | null | undefined; // falar com o prof

    public get name(): string {
        return this._name;
    }

    private set name(name: string) {
        this._name = name;
    }
   
    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get type(): TypeUser {
        return this._type;
    }

    public set type(type: TypeUser) {
        this._type = type;
    }

    public get dateCreated(): Date | undefined {
        return this._dateCreated;
    }

    private set dateCreated(value: Date | undefined) {
        this._dateCreated = value;
    }

    public get dateUpdated(): Date | undefined {
        return this._dateUpdated;
    }

    private set dateUpdated(value: Date | undefined) {
        this._dateUpdated = value;
    }

    public get dateDeletion(): Date | null | undefined {
        return this._dateDeletion;
    }

    private set dateDeletion(value: Date | null | undefined) {
        this._dateDeletion = value;
    }

    private constructor(user:IUser){
        super(user.id);
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.type = user.type;
        this.dateCreated = user.dateCreated;
        this.dateUpdated = user.dateUpdated;
        this.dateDeletion = user.dateDeletion;
    }

    public static create(props: CreateUserProps): User {
        return new User(props);
    }

    public static recover(props: RecoverUserProps): User {
        return new User(props);
    }
}
