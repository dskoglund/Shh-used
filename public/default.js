const app = angular.module('shop', [])

app.controller('HomeController', HomeController)

HomeController.$inject = ['shoesData', '$scope']

function HomeController(shoesData, $scope) {

  const vm = this
  const shoesList = []
  const cart = []

  vm.cart = cart
  vm.logo = "SHH-Used"
  vm.slogan = "For Sneakerheads on a Budget"
  vm.shoesList = shoesList

  shoesData.loadAll().then(shoesList => {
    console.log('loaded')
    vm.shoesList = shoesList
  })

  $scope.addToCart = function(shoe) {
    vm.cart.push(angular.copy(shoe));
    vm.ammount += shoe.price
    console.log(shoe)
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
