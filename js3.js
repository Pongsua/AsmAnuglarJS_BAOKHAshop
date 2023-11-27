var app = angular.module("myApp", ["ngRoute"]);

app.factory("GioHangService", function () {
  var gioHang = [{
    "id": "0",
    "title": "AIRCRAFT FOCUS TEE",
    "anh": "./img/anh1.webp",
    "giaCu": 180000,
    "giaMoi": 99000,
    "size": "M",
    "soLuong": 2
  },
  {
    "id": "18",
    "title": "ROSE SHIRT",
    "anh": "./img/shirt7.webp",
    "giaCu": 290000,
    "giaMoi": 116000,
    "size": "L",
    "soLuong": 3
  },
  {
    "id": "12",
    "title": "BAT SHIRT",
    "anh": "./img/shirt1.webp",
    "giaCu": 290000,
    "giaMoi": 116000,
    "kieuAo": "Shirt-AoSoMi",
    "size": "XL",
    "soLuong": 4
  }];

  function themSanPham(sanPham) {
    gioHang.push(sanPham);
  }

  function suaSanPham(moi, cu) {
    angular.copy(moi, cu);
  }



  function xoaSanPham(index) {
    gioHang.splice(index, 1);
  }

  function getGioHang() {
    return gioHang;
  }

  return {
    themSanPham: themSanPham,
    xoaSanPham: xoaSanPham,
    getGioHang: getGioHang,
    suaSanPham: suaSanPham
  };
});

app.controller("myCtrl", function ($scope, $rootScope, $routeParams, $http, $anchorScroll, $log, GioHangService) {
  $anchorScroll();
  $scope.search = "";
  $scope.showSuggestions = false;
  $scope.listGH = GioHangService.getGioHang();


  $scope.dataAnh = [];
  $http.get("quanao.json")
    .then(function (response) {
      $scope.dataAnh = response.data.dataAnh;
      for (let i = 0; i < $scope.dataAnh.length; i++) {
        if ($scope.dataAnh[i].id == $routeParams.id) {
          $scope.index = i;
        }
      }
    });

  $scope.selectedSize = "M";
  $scope.listGH = GioHangService.getGioHang();

  $scope.setSize = function (size) {
    $scope.selectedSize = size;
  };

  $scope.updateSuggestions = function (txtSearch) {
    if (txtSearch.length > 0) {
      $scope.showSuggestions = true;
    } else {
      $scope.showSuggestions = false;
    }
  };

  $scope.saveData = function () {
    $scope.dataAnh.forEach(el => {
      if (el.id == id) {
        var newItem = {
          id: id,
          title: el.title,
          anh: el.anh,
          giaCu: el.giaCu,
          giaMoi: el.giaMoi,
          size: $scope.selectedSize,
          soLuong: $scope.soluong
        };

        $http.post('dataGiohang.json', newItem)
          .then(function (response) {
            console.log('Dữ liệu đã được ghi vào tệp JSON.');
          })
          .catch(function (error) {
            console.error('Lỗi khi ghi dữ liệu vào tệp JSON:', error);
          });

      };
    });
  };



  $scope.them = function (id) {
    $scope.dataAnh.forEach(el => {
      if (el.id == id) {
        var newItem = {
          id: id,
          title: el.title,
          anh: el.anh,
          giaCu: el.giaCu,
          giaMoi: el.giaMoi,
          size: $scope.selectedSize,
          soLuong: $scope.soluong
        };

        GioHangService.themSanPham(newItem);
        localStorage.setItem("dataGiohang", JSON.stringify($scope.listGH));
        $scope.listGH = GioHangService.getGioHang();

        console.log("Đã thêm đối tượng vào giỏ hàng thành công");
        alert("Đã thêm đối tượng vào giỏ hàng thành công");
        console.log("Dữ liệu trong giỏ hàng:", $scope.listGH);
      }
    });
  };

  $scope.xoa = function (index) {
    GioHangService.xoaSanPham(index);
    $scope.listGH = GioHangService.getGioHang();
  };


  //   $scope.sua = function (id) {
  //     var a = {
  //         id: id,
  //         title: el.title,
  //         anh: el.anh,
  //         giaCu: el.giaCu,
  //         giaMoi: el.giaMoi,
  //         size: $scope.selecSize,
  //         soLuong: $scope.soluongGH
  //       };
  //       listGH.forEach(el => {
  //         if (el.id = id) {
  //     GioHangService.suaSanPham(a,el);

  //         }
  //       });


  //     $scope.listGH = GioHangService.getGioHang();
  //   };



  $scope.test = function (id, solg) {

    $scope.listGH.forEach(el => {
      if (el.id == id) {

        var a = {
          id: el.id,
          title: el.title,
          anh: el.anh,
          giaCu: el.giaCu,
          giaMoi: el.giaMoi,
          size: $scope.selectedSizeGH,
          soLuong: solg
        };
        // alert(a.id);

        angular.copy(a, el);
      }

    });
    tongtien();
  };


  // const numbers = [1, 2, 3, 4, 5, 6];
  // const evenNumbers = numbers.filter(function(number) {
  //   return number % 2 === 0;
  // });

  $scope.viet = ""
  $rootScope.timKiem = function (txt) {
    //  $rootScope.search = "sdsd";
    alert($rootScope.search);
    alert(txt);
    var a = $scope.dataAnh.filter(function (item) {
      return item.title == txt;
    });
    $scope.viet = txt;
    // alert($scope.sear);
    // console.log(a);
  }


  $scope.tongtien = function () {
    var total = 0;
    $scope.listGH.forEach(item => {
      total += item.giaMoi * item.soLuong;
    });
    return total;
  };
  $scope.sapxep = true;
  $scope.sapxepGH = function () {
    $scope.sapxep = !$scope.sapxep;
  }

  $scope.page = 0;

  $scope.trang = function (a) {
    alert(a)
    if (a ==1 ) {
 
      $scope.page = 0;
    }else{
   
      $scope.page = 12;
    }
  }
});


app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "listSanPham.html?" + Math.random(),
      controller: "myCtrl"
    })
    .when("/giohang", {
      templateUrl: "giohang.html?" + Math.random(),
      controller: "myCtrl"
    })
    .when("/vip", {
      templateUrl: "litmit.html?" + Math.random(),
      controller: "myCtrl"
    })
    .when("/motsanpham", {
      templateUrl: "motSanPham.html?" + Math.random(),
      controller: "myCtrl"
    })
    .when("/sanpham/:id", {
      templateUrl: "chitiet.html",
      controller: "myCtrl"
    })
    .otherwise({
      redirectTo: "/"
    });
});

