const app = angular.module('shop', [])

app.controller('HomeController', HomeController)

HomeController.$inject = ['shoesData', '$scope']

function HomeController(shoesData, $scope) {

  const vm = this

  const shoesList = []
  const cart = []

  vm.cart = cart
  vm.logo = "Shh-used"
  vm.slogan = "Try Walking in Someone Elses"
  vm.shoesList = shoesList

  shoesData.loadAll().then(shoesList => {
    vm.shoesList = shoesList
  })

  $scope.addToCart = function() {
    const shoe = this.shoe
    vm.cart.push(angular.copy(shoe));
    const shoeToBeRemoved = vm.shoesList.indexOf(shoe)
    vm.shoesList.splice(shoeToBeRemoved, 1)
    vm.total = (getTotal()).toFixed(2)
    console.log(vm.total)
    vm.overallTotal = (addTaxShip()).toFixed(2)
  }

  $scope.removeFromCart = function() {
    const item = this.item
    const itemToBeRemoved = vm.cart.indexOf(item)
    vm.cart.splice(itemToBeRemoved, 1)
    vm.shoesList.push(angular.copy(item))
    vm.total = (getTotal()).toFixed(2)
    console.log(vm.total)
    vm.overallTotal = (addTaxShip()).toFixed(2)
  }

  function tripleZero(){
    if(getTotal() === 0.00) {
      return vm.total = 0
    } else {
      return vm.total = getTotal()
    }
  }

  function getTotal() {
    return vm.cart.reduce((total, { price }) =>
    total + price
    ,0)
  }

  function addTaxShip() {
    const tax = .08
    const ship = 5.99
    const setTotal = 0.00
    vm.tax = tax
    vm.ship = ship
    const taxShip = ((((vm.total*1)*(tax*1))+(vm.total*1))+(ship*1))
    if(taxShip === ship){
      return setTotal
    } else {
      return taxShip
    }

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
