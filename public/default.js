const app = angular.module('shop', [
  'ngRoute'
])

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/store.html',
        controller: 'StoreController',
        controllerAs: 'store'
      })
      .when('/cart', {
        templateUrl: '/templates/cart.html',
        controller: 'CartController',
        controllerAs: 'cart'
      })
      .when('/checkout', {
        templateUrl: '/templates/checkout.html',
        controller: 'CheckoutController',
        controllerAs: 'checkout'
      })
      .when('/confirm', {
        templateUrl: '/templates/confirm.html',
        controller: 'ConfirmController',
        controllerAs: 'confirm',
      })
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false});
  }
])

app.controller('CheckoutController', CheckoutController)
CheckoutController.$inject = ['shoppingCart', '$scope', 'checkoutInfo']
function CheckoutController(shoppingCart, $scope, checkoutInfo) {
   console.log('in checkout controller')
  const vm = this

  vm.totals = shoppingCart.getTotals()
  vm.cart = shoppingCart.items

  $scope.getInfo = function() {
    const userInformation = []
    userInformation.push({address: $scope.address, name: $scope.username})
    checkoutInfo.getUserInfo(userInformation)
  }
}


app.controller('ConfirmController', ConfirmController)
ConfirmController.$inject = ['shoppingCart', '$scope', 'checkoutInfo']
function ConfirmController(shoppingCart, $scope, checkoutInfo) {

  console.log('in confirm controller')
  const vm = this
  vm.totals = shoppingCart.getTotals()
  vm.info = checkoutInfo.getUserInfo().info
  console.log(vm.info)



}

app.controller('CartController', CartController)
CartController.$inject = ['shoppingCart', '$scope']
function CartController(shoppingCart, $scope) {

  const vm = this
  vm.cart = []

  vm.cart = shoppingCart.items
  vm.totals = shoppingCart.getTotals()

  vm.removeFromCart = function(item) {
    vm.cart = vm.cart.filter(function(shoe) {
      return shoe !== item
    })
    shoppingCart.removeFromCart(item)
    vm.totals = shoppingCart.getTotals()
  }
}

app.controller('HomeController', HomeController)
HomeController.$inject = ['shoppingCart', '$scope']
function HomeController(shoppingCart, $scope) {

  const vm = this
  vm.logo = "Shh-used"
  vm.slogan = "Try Walking in Someone Elses"

  vm.quantity = 0

  $scope.$watch(function() {
    return shoppingCart.items.length
  },function(cartQuantity) {
    vm.quantity = cartQuantity
  })

  $scope.$watch(function() {
    return shoppingCart.getTotals().subTotal
  },function(orderTotal) {
    vm.preTotal = orderTotal
  })
}

app.controller('StoreController', StoreController)
StoreController.$inject = ['shoesData', '$scope', 'shoppingCart']
function StoreController(shoesData, $scope, shoppingCart) {

  const vm = this

  vm.shoesList = []

  shoesData.loadAll().then(shoes => {
    if(shoppingCart.items.length === 0) {
      vm.shoesList = shoes
      console.log('regular store load')
    } else {
        vm.shoesList = shoes
      }
    })

  vm.addToCart = function(shoe) {
    vm.shoesList = vm.shoesList.filter(function(item) {
      return item !== shoe
    })
    shoppingCart.addToCart(shoe)
  }
}

app.factory('shoesData', shoesData)
shoesData.$inject = ['$http']
function shoesData($http) {

  return {
    loadAll
  }

  function loadAll() {
    return $http.get('./shoes').then(res => res.data)
  }
}

app.factory('shoppingCart',shoppingCart)
function shoppingCart() {

  const cart = {
    getTotals,
    removeFromCart,
    addToCart,
    items: []
  }

  return cart

  function removeFromCart(item) {
    const indexToBeRemoved = cart.items.indexOf(item)
    cart.items.splice(indexToBeRemoved, 1)
  }

  function addToCart(item) {
    cart.items.push(item)
  }

  function getTotals() {
    const setGrand = 0.00
    const subTotal = cart.items.reduce((total, { price }) => total + price, 0)
    const tax = 0.08
    const shipping = 5.99
    let grandTotal = 0.00
    if( subTotal === 0 ) {
      grandTotal = 0.00
    } else {
      grandTotal = subTotal * tax + subTotal + shipping
    }

    const totals = {
      subTotal: (subTotal).toFixed(2),
      tax: tax,
      shipping: shipping,
      grandTotal: (grandTotal).toFixed(2)
    }

    return totals
  }
}

app.factory('checkoutInfo', checkoutInfo)
function checkoutInfo() {

  const userInfo = {
    getUserInfo
  }

  return userInfo

  function getUserInfo(userInformation) {
    const name = userInformation.map(function(user) {
      return user.name
    })
    const address = userInformation.map(function(user) {
      return user.address
    })
    const info = {
      name: name,
      address: address
    }
    console.log(info.name)
    console.log(info.address)

    return info
  }

}
