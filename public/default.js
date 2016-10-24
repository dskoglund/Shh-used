const app = angular.module('shop', [])

app.controller('HomeController', HomeController)

HomeController.$inject = ['shoesData']

function HomeController(shoesData) {

  const vm = this
  const shoesList = [{}]
  const cart = []

  vm.message = "SHH-USED: For Sneakerheads on a Budget"
  vm.cart = cart
  vm.shoesList = shoesList

  shoesData.loadAll().then(shoesList => {
    vm.shoesList = shoesList
  })
}

app.factory('shoesData', shoesData)

shoesData.$inject = ['$http']

function shoesData($http) {
  return {
    loadAll
  }

  function loadAll() {
    return $http.get('./').then(res => res.data)
  }
}
