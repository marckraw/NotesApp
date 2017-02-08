(function() {

  angular.module('appServices', [])
      .factory('images', function() {
        return {
          resolveImages: function(s) {
            // funkcja uwzglednia jedynie bezposrednie adresy url do konkretnych plikow o konkretnym rozszerzeniu
            // link musi byc poprzedzony spacja lub przejsciem do nastepnego wiersza
            var temp = s.split(/[\n\s]+/);
            var result = temp.filter(function(zmienna) {
              if (
                  (zmienna.indexOf('http') != -1 && zmienna.indexOf('http') === 0) &&
                  (zmienna.indexOf('.jpg') != -1) ||
                  (zmienna.indexOf('.gif') != -1) ||
                  (zmienna.indexOf('.png') != -1)
              ) {
                return zmienna;
              }
            });
            return result;
          }
        }
      })

      .factory('inOutLclStorage', function () {
        return {
          saveToLS: function (arrFrom, strTo) {
            localStorage.setItem(strTo, JSON.stringify(arrFrom));
          },
          openFromLS: function (strFrom) {
            var tempArr = [];
            if(localStorage.getItem(strFrom) !== null) {
              tempArr = JSON.parse(localStorage.getItem(strFrom));
            } else {
              tempArr = [];
            }

            return tempArr;
          }
        }
      });

})();
