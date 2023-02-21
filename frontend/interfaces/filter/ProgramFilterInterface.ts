export interface ProgramFilterInterface {
    sortBy?: "date" | "price",
    startDate?: Date,
    endDate?: Date,
    minPrice?: number,
    maxPrice?: number,
    minPeople?: number,
    maxPeople?: number,
    language?: string[],
    province?: string,
}