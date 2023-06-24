const configRoutes = {
    home : '/',
    product : '/product/:productType/:product/:nsx',
    productShort : '/product/:productType',
    detailProduct : '/detail-product/:productID',
    cart : '/cart',
    search : '/search/:keySearch',
    searchType : '/search-category/:typeProduct',
    admin : '/admin',
    managerProduct : '/admin/product',
    managerProductDetail : '/admin/product/:productID',
    order : '/admin/order',
    orderDetail : '/admin/order/:orderID',
    customer : '/admin/customer',
    orderUser : '/order'
}
export default configRoutes