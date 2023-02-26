export interface AttractionInterface {
    id: string,
    time: string,
    location: string,
    province: string,
    option: string,
    imageUrl?: string,
    file?: File | undefined | string,
    // admissionsIncluded : Boolean,
    // visitDate : Date,
    // name: string,
    // file: Buffer
}