export type sortByType = "date" | "price";
export type sortingType = "asc" | "desc"

export interface ProgramFilterInterface {
    sortBy?: sortByType,
    sortType?: sortingType,
    startDate?: Date | null,
    endDate?: Date | null,
    minPrice?: number | null,
    maxPrice?: number | null,
    minPeople?: number | null,
    maxPeople?: number | null,
    language?: string | null,
    province?: string | null,
}