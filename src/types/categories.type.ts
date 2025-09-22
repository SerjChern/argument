export type CategoriesType = {
  id: number,
  categoryType: string,
  subCategories:[
    {
      name: string,
      idSubCat: number
    }
  ]
}
