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
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/confirm', {
        templateUrl: '/templates/confirm.html',
        controller: '',
        controllerAs: '',
      })
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false});
  }
])

app.controller('CartController', CartController)
CartController.$inject = ['shoppingCart']
function CartController(shoppingCart) {


  const vm = this
  vm.cart = shoppingCart.items
  vm.totals = shoppingCart.getTotals()

  vm.removeFromCart = function(item) {
    const indexToBeRemoved = shoppingCart.items.indexOf(item)
    shoppingCart.items.splice(indexToBeRemoved, 1)
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
    vm.shoesList = shoes
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
    const indexToBeRemoved = cart.indexOf(shoe)
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
