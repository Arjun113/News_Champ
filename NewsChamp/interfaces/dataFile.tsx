export interface NewsItem {
    title: string
    imageURL: string | null
    fullLink: string
    description: string
    publishedDate: Date | null
    lastUpdateTime: Date | null
    dbAddTime: Date | null
    category: string
    _id: string
    __v: number
}