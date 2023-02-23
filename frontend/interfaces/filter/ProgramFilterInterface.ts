export type sortByType = "date" | "price";

export interface ProgramFilterInterface {
    sortBy?: sortByType,
    startDate?: Date | null,
    endDate?: Date | null,
    minPrice?: number | null,
    maxPrice?: number | null,
    minPeople?: number | null,
    maxPeople?: number | null,
    language?: string | null,
    province?: string | null,
}