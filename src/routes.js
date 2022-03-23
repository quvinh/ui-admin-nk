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

// //Role
const Role = React.lazy(() => import('./views/role/Role'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/account', name: 'User', component: Account },
  { path: '/account-add', name: 'User', component: AddAccount },
  { path: '/account-edit/:id', name: 'User', component: EditAccount },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/dashboard', name: 'Bản tin', component: Dashboard },
  //   { path: '/charts', name: 'Charts', component: Charts },
  { path: '/export', name: 'Xuất kho', component: Export },
  //   { path: '/status', name: 'Duyệt phiếu', component: Status },
  { path: '/import', name: 'Nhập kho', component: Import },
  { path: '/coupon_import', name: 'Phiếu nhập', component: CouponImport },
  { path: '/coupon_transfer', name: 'Phiếu luân chuyển', component: CouponTransfer },
  { path: '/coupon_export', name: 'Phiếu xuất', component: CouponExport },
  { path: '/detail_import/:code', name: 'Chi tiết phiếu nhập', component: DetailImport },
  { path: '/detail_transfer/:code', name: 'Chi tiết phiếu luân chuyển', component: DetailTransfer },
  { path: '/detail_export/:code', name: 'Chi tiết phiếu xuất', component: DetailExport },
  { path: '/print_import/:code', name: 'In phiếu nhập', component: PrintImport },
  { path: '/print_export/:code', name: 'In phiếu nhập', component: PrintExport },
  { path: '/print_transfer/:code', name: 'In phiếu nhập', component: PrintTransfer },
  //   { path: '/reports', name: 'Báo cáo', component: Reports },
  { path: '/statistic', name: 'Thống kê', component: Statistical },
  { path: '/transfer', name: 'Điều phối kho', component: Transfer },

  { path: '/role', name: 'Chức vụ', component: Role },

  { path: '/warehouse', name: 'Kho', component: Warehouse },
  // { path: '/warehouse-info', name: 'Thông tin chi tiết kho', component: WarehouseInfo },
  { path: '/warehouse-show/:id', name: 'thông tin kho', component: WarehouseShow },
  // { path: '/warehouse-listitem', name: 'thông tin kho', component: WarehouseListItem },
  //   { path: '/warehouses-add', name: 'Tạo kho', component: AddWarehouses },
  //   { path: '/warehouses-edit/:id', name: 'Chỉnh sửa kho', component: EditWarehouses },
  //   { path: '/warehouses-shelf/:id', name: 'kệ trong kho', component: ShelfWarehouse },

  { path: '/category', name: 'Category', component: Category },
  //   { path: '/categories-add', name: 'Tạo category', component: AddCategories },
  //   { path: '/categories-edit/:id', name: 'Chỉnh sửa category', component: EditCategories },

  //   { path: '/shelf', name: 'Giá', component: Shelves },
  //   { path: '/shelf-add/:id', name: 'Tạo giá', component: AddShelves },
  //   { path: '/shelf-edit/:id', name: 'Chỉnh sửa kho', component: EditShelves },
  //   { path: '/detail_item-edit/:id', name: 'Chỉnh sửa vật tư', component: EditDetailItem },

  { path: '/notification', name: 'Thông báo', component: Notification },
  { path: '/notification-add', name: 'Thông báo', component: AddNotification },
  { path: '/notification-read/:id', name: 'Thông báo', component: ReadNotification },
  { path: '/notification-send', name: 'Thông báo', component: SendNotification },

  { path: '/supplier', name: 'Nhà cung cấp', component: Supplier },
  //   { path: '/supplier-add', name: 'Tạo mới nhà cung cấp', component: AddSuppliers },
  //   { path: '/supplier-edit/:id', name: 'Chỉnh sửa nhà cung cấp', component: EditSuppliers },

  { path: '/inventory', name: 'Kiểm kê', component: Inventory }

  //   { path: '/role', name: 'Phân quyền', component: Role },
]

export default routes
