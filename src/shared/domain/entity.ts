import { randomUUID } from "crypto";

const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
};

export abstract class Entity<T> {
    private _id!: string;

    public get id(): string {
        return this._id;
    }

    private set id(value: string) {
        this._id = value;
    }

    constructor(id?: string) {
        this.id = id ? id : randomUUID();
    }

    public equals(object?: Entity<T>): boolean {
        if (object == null || object == undefined) {
            return false;
        }
        
        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this._id == object._id;
    }

}