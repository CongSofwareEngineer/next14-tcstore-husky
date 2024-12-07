export enum QUERY_KEY {
  GetAllProduct = 'GetAllProduct',
  GetListProductAdmin = 'GetListProductAdmin',
  GetCategoryAdmin = 'GetCategoryAdmin',
  GetSubCategoryAdmin = 'GetSubCategoryAdmin',
  GetProductShop = 'GetProductShop',
  GetAllNests = 'GetAllNests',
  GetCommentProduction = 'GetCommentProduction',
  GetCommentDetail = 'GetCommentDetail',
  LengthCartUser = 'LengthCartUser',
  GetProductByID = 'GetProductByID',
  MyCartUser = 'MyCartUser',
  MyBillUser = 'MyBillUser',
  AllProvincesVn = 'AllProvincesVn',
  BillAdmin = 'BillAdmin',
  RevenueAdmin = 'RevenueAdmin',
  GetNests = 'GetNests',
  GetShoesShop = 'GetShoesShop',
}

export type TypeHookReactQuery = {
  data: any[]
  page: number
}
