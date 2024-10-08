export interface Repository<T, F> {
    checkIfExist(id: number): Promise<boolean>
    save(data: Partial<T>): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T>;
    filter(filterDto: F): Promise<T[]>;
    update(id: number, data: Partial<T>): Promise<T>;
    delete(id: number): Promise<T>;
}