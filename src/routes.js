import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Account = React.lazy(() => import('./views/account/Account'))
const AddAccount = React.lazy(() => import('./views/account/AddAccount'))
const EditAccount = React.lazy(() => import('./views/account/EditAccount'))
const Profile = React.lazy(() => import('./views/account/Profile'))

// const Status = React.lazy(() => import('./views/status/Status'))

const Import = React.lazy(() => import('./views/import/Import'))
const Export = React.lazy(() => import('./views/export/Export'))
// const Reports = React.lazy(() => import('./views/reports/Reports'))
const Statistical = React.lazy(() => import('./views/statistic/Statistical'))

const CouponImport = React.lazy(() => import('./views/coupon/CouponImport'))
const CouponTransfer = React.lazy(() => import('./views/coupon/CouponTransfer'))
const CouponExport = React.lazy(() => import('./views/coupon/CouponExport'))
const DetailImport = React.lazy(() => import('./views/coupon/DetailImport'))
const DetailTransfer = React.lazy(() => import('./views/coupon/DetailTransfer'))
const DetailExport = React.lazy(() => import('./views/coupon/DetailExport'))
const PrintImport = React.lazy(() => import('./views/coupon/PrintImport'))
const PrintExport = React.lazy(() => import('./views/coupon/PrintExport'))
const PrintTransfer = React.lazy(() => import('./views/coupon/PrintTransfer'))
const CouponInventory = React.lazy(() => import('./views/coupon/CouponInventory'))
const DetailInventory = React.lazy(() => import('./views/coupon/DetailInventory'))
const PrintInventory = React.lazy(() => import('./views/coupon/PrintInventory'))

const Transfer = React.lazy(() => import('./views/transfer/Transfer'))

// //Warehouse
const Warehouse = React.lazy(() => import('./views/warehouse/Warehouse'))
// const WarehouseInfo = React.lazy(() => import('./views/warehouse/WarehouseInfo'))
const WarehouseShow = React.lazy(() => import('./views/warehouse/WarehouseShow'))
// const WarehouseListItem = React.lazy(() => import('./views/warehouse/WarehouseListItem'))
// const EditWarehouses = React.lazy(() => import('./views/warehouses/Edit'))
// const AddWarehouses = React.lazy(() => import('./views/warehouses/Add'))
// const ShelfWarehouse = React.lazy(() => import('./views/warehouses/Shelfwarehouse'))

// //Categories
const Category = React.lazy(() => import('./views/category/Category'))
// const EditCategories = React.lazy(() => import('./views/categories/Edit'))
// const AddCategories = React.lazy(() => import('./views/categories/Add'))

// //Shelves
// const Shelves = React.lazy(() => import('./views/shelf/Shelves'))
// const EditShelves = React.lazy(() => import('./views/shelf/Edit'))
// const AddShelves = React.lazy(() => import('./views/shelf/Add'))

// // Detail_item
// const EditDetailItem = React.lazy(() => import('./views/detail_item/Edit'))

// //Chart
// const Charts = React.lazy(() => import('./views/charts/Charts'))

// //Notification
const Notification = React.lazy(() => import('./views/notification/Notification'))
const AddNotification = React.lazy(() => import('./views/notification/AddNotification'))
const ReadNotification = React.lazy(() => import('./views/notification/ReadNotification'))
const SendNotification = React.lazy(() => import('./views/notification/SendNotification'))

// //Supplier
const Supplier = React.lazy(() => import('./views/supplier/Supplier'))
// const AddSuppliers = React.lazy(() => import('./views/suppliers/Add'))
// const EditSuppliers = React.lazy(() => import('./views/suppliers/Edit'))

//Inventory
const Inventory = React.lazy(() => import('./views/inventory/Inventory'))
// const ListProduct = React.lazy(() => import('./views/listproduct/ListProduct'))

// //Role
const Role = React.lazy(() => import('./views/role/Role'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/account', name: 'User', component: Account },
  { path: '/account-add', name: 'User', component: AddAccount },
  { path: '/account-edit/:id', name: 'User', component: EditAccount },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/dashboard', name: 'B???n tin', component: Dashboard },
  //   { path: '/charts', name: 'Charts', component: Charts },
  { path: '/export', name: 'Xu???t kho', component: Export },
  //   { path: '/status', name: 'Duy???t phi???u', component: Status },
  { path: '/import', name: 'Nh???p kho', component: Import },
  { path: '/coupon_import', name: 'Phi???u nh???p', component: CouponImport },
  { path: '/coupon_transfer', name: 'Phi???u lu??n chuy???n', component: CouponTransfer },
  { path: '/coupon_export', name: 'Phi???u xu???t', component: CouponExport },
  { path: '/detail_import/:code', name: 'Chi ti???t phi???u nh???p', component: DetailImport },
  { path: '/detail_transfer/:code', name: 'Chi ti???t phi???u lu??n chuy???n', component: DetailTransfer },
  { path: '/detail_export/:code', name: 'Chi ti???t phi???u xu???t', component: DetailExport },
  { path: '/print_import/:code', name: 'In phi???u nh???p', component: PrintImport },
  { path: '/print_export/:code', name: 'In phi???u nh???p', component: PrintExport },
  { path: '/print_transfer/:code', name: 'In phi???u nh???p', component: PrintTransfer },
  //   { path: '/reports', name: 'B??o c??o', component: Reports },
  { path: '/statistic', name: 'Th???ng k??', component: Statistical },
  { path: '/transfer', name: '??i???u ph???i kho', component: Transfer },

  { path: '/role', name: 'Ch???c v???', component: Role },

  { path: '/warehouse', name: 'Kho', component: Warehouse },
  // { path: '/warehouse-info', name: 'Th??ng tin chi ti???t kho', component: WarehouseInfo },
  { path: '/warehouse-show/:id', name: 'th??ng tin kho', component: WarehouseShow },
  // { path: '/warehouse-listitem', name: 'th??ng tin kho', component: WarehouseListItem },
  //   { path: '/warehouses-add', name: 'T???o kho', component: AddWarehouses },
  //   { path: '/warehouses-edit/:id', name: 'Ch???nh s???a kho', component: EditWarehouses },
  //   { path: '/warehouses-shelf/:id', name: 'k??? trong kho', component: ShelfWarehouse },

  { path: '/category', name: 'Category', component: Category },
  //   { path: '/categories-add', name: 'T???o category', component: AddCategories },
  //   { path: '/categories-edit/:id', name: 'Ch???nh s???a category', component: EditCategories },

  //   { path: '/shelf', name: 'Gi??', component: Shelves },
  //   { path: '/shelf-add/:id', name: 'T???o gi??', component: AddShelves },
  //   { path: '/shelf-edit/:id', name: 'Ch???nh s???a kho', component: EditShelves },
  //   { path: '/detail_item-edit/:id', name: 'Ch???nh s???a v???t t??', component: EditDetailItem },

  { path: '/notification', name: 'Th??ng b??o', component: Notification },
  { path: '/notification-add', name: 'Th??ng b??o', component: AddNotification },
  { path: '/notification-read/:id', name: 'Th??ng b??o', component: ReadNotification },
  { path: '/notification-send', name: 'Th??ng b??o', component: SendNotification },

  { path: '/supplier', name: 'Nh?? cung c???p', component: Supplier },
  //   { path: '/supplier-add', name: 'T???o m???i nh?? cung c???p', component: AddSuppliers },
  //   { path: '/supplier-edit/:id', name: 'Ch???nh s???a nh?? cung c???p', component: EditSuppliers },

  { path: '/inventory', name: 'Ki???m k??', component: Inventory },
  { path: '/detail_inventory/:code', name: 'Chi ti???t phi???u xu???t', component: DetailInventory },
  { path: '/coupon_inventory', name: 'Phi???u xu???t', component: CouponInventory },
  { path: '/print_inventory/:code', name: 'In phi???u nh???p', component: PrintInventory },

  //   { path: '/role', name: 'Ph??n quy???n', component: Role },

  // { path: '/listproduct', name: 'In phi???u nh???p', component: ListProduct },
]

export default routes
