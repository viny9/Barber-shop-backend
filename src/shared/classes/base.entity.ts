export class BaseEntity {
    id?: number | undefined
    createdAt?: Date
    updatedAt?: Date

    constructor(id?: number) {
        this.id = id;
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}