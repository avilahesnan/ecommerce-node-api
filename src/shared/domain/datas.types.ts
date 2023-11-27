export interface IDatasController {
    dateCreated?: Date;
    dateUpdated?: Date;
    dateDeletion?: Date | null;
};

export type keyDataController = keyof IDatasController;