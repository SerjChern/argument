export type ProductType = {
  "id": string,
  "category": string,
  "title": string,
  "price": number,
  "image": string,
  "size"?: string,
  "otherSizes"?: string[],
  "color"?: string,
  "otherColors"?: {
    "color": string,
    "icon": string
  }[],
  "description": string,
  "sort"?: string,
  "gradient"?: string,
  "url": string,
}
