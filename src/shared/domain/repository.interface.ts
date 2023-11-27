interface IQuery<T> {
    recoverByUuid(uuid: string): Promise<T | null>;
    recoverAll(): Promise<Array<T>>;
    exists(uuid: string): Promise<boolean>;
};

interface ICommand<T> {
    insert(entity: T): Promise<T>;
    update(uuid: string, entity: Partial<T>): Promise<boolean>;
    delete(uuid: string): Promise<boolean>;
};

export interface IRepository<T> extends IQuery<T>, ICommand<T> {};