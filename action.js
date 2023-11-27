var app = angular.module("myApp", ["ngRoute"]);
app.controller("myCtrl", function ($scope, $rootScope, $routeParams, $http, $anchorScroll, $log) {
  $anchorScroll();
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
  $scope.selectedSize = "M"; // Biến để lưu kích thước đã chọn

  $scope.setSize = function (size) {
    $scope.selectedSize = size; // Cập nhật kích thước đã chọn
  };


  $scope.listGH = [];
  $http.get("dataGiohang.json")
    .then(function (response) {
      $scope.listGH = response.data.listGioHang;
    });



  // $scope.them = function (id) {
  //   $scope.dataAnh.forEach(el => {
  //     if (el.id == id) {
  //       var newItem = {
  //         id: id,
  //         title: el.title,
  //         anh: el.anh,
  //         giaCu: el.giaCu,
  //         giaMoi: el.giaMoi,
  //         size: $scope.selectedSize,
  //         soLuong: $scope.soluong
  //       };

  //       $http.get("dataGiohang.json")
  //         .then(function (response) {
  //           $scope.listGH = response.data.listGioHang;
  //           $scope.listGH.push(newItem);
            
  //           return $http.post("dataGiohang.json", { listGioHang: $scope.listGH });
  //         })
  //         .then(function () {
  //           console.log("Đã thêm đối tượng vào dataGiohang.json thành công");
  //         })
  //         .catch(function (error) {
  //           console.error("Lỗi khi thêm đối tượng vào dataGiohang.json:", error);
  //         });



  //     }
  //   });
  // };


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
  
        $http.post("addGiohang.php", newItem)
          .then(function () {
            console.log("Đã thêm đối tượng vào dataGiohang.json thành công");
  
            return $http.get("dataGiohang.json");
          })
          .then(function (response) {
            $scope.listGH = response.data.listGioHang;
            console.log("Dữ liệu từ dataGiohang.json:", $scope.listGH);
          })
          .catch(function (error) {
            console.error("Lỗi khi thêm đối tượng vào dataGiohang.json:", error);
          });
      }
    });
  };
  
  

  $scope.tongtien = function () {
    var tong = 0;
    $scope.listGiohang.forEach(e => {
      tong += e.giaMoi * e.soLuong;
    });
    return tong;
  }

  // $scope.logId = function(event) {
  //   var elementId = event.target.id;
  //   $log.log("ID của phần tử là:", elementId);
  //   alert("ID của phần tử là:" + elementId);
  // };
});


app.config(function ($routeProvider,) {
  // anchorScroll();

  $routeProvider
    .when("/", {
      templateUrl: "listSanPham.html?" + Math.random(),
      controller: "myCtrl"
    })
    .when("/giohang", {
      templateUrl: "giohang.html?" + Math.random(),
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