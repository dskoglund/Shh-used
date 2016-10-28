const app = angular.module('shop', [])

app.controller('HomeController', HomeController)

HomeController.$inject = ['shoesData', '$scope']

function HomeController(shoesData, $scope) {

  const vm = this
  const shoesList = []
  const cart = []
  const ammount = ""


  vm.cart = cart
  vm.logo = "SHH-Used"
  vm.slogan = "For Sneakerheads on a Budget"
  vm.shoesList = shoesList

  shoesData.loadAll().then(shoesList => {
    vm.shoesList = shoesList
  })

  $scope.addToCart = function() {
    const shoe = this.shoe
    vm.cart.push(angular.copy(shoe));
    const shoeToBeRemoved = vm.shoesList.indexOf(shoe)
    vm.shoesList.splice(shoeToBeRemoved, 1)
  }

  $scope.removeFromCart = function() {
    console.log('working')
    const item = this.item
    const itemToBeRemoved = vm.cart.indexOf(item)
    vm.cart.splice(itemToBeRemoved, 1)
    vm.shoesList.push(angular.copy(item))
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
