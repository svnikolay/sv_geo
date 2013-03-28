function GeoLine() {

  this.myMap;

  var myMapSettings;

  this.init = function(settings) { // Инициализация настроек
    myMapSettings = settings;
    ymaps.ready(yandexMapInit);
  };

  this.geoLocationShow = function(){ // Старт гелокации
    ymaps.ready(yandexMapGeoLocationShow);
  };


  /*-----------------YANDEX FUNCTIONS--------------- */
  function yandexMapInit(){ // Инициализация яндекс карты
    this.myMap = new ymaps.Map ("map", {//сама карта
      center: myMapSettings.center,
      zoom: myMapSettings.zoom
    });

    myGeocoder = ymaps.geocode(myMapSettings.finishPoint); //получение координат точки доставки
    myGeocoder.then(
      function (res) {
        myMapSettings.finishPoint = myMapSettings.points_array[0]//res.geoObjects.get(0).geometry.getCoordinates();
    });

    this.myMap.controls.add('zoomControl') // zoom
    this.myMap.controls.add('mapTools'); // иконки дефолтные
    this.myMap.controls.add('trafficControl'); //пробки

    var myButton = new ymaps.control.Button('<b>Я<b>');//Кнопка "показать меня"
    myButton.events.add('click', showFinishPoint)
    this.myMap.controls.add(myButton);

  };

  function showFinishPoint(){
    this.myMap.setCenter(myMapSettings.finishPoint)
  }


  function yandexMapGeoLocationShow(){ // --------SHOW--------------
    points_array = myMapSettings.points_array
    delay = myMapSettings.delay
    var index = 1;

    var Point = new ymaps.Circle([[points_array[0][0], points_array[0][1]], 80]);

    var lineStringGeometry = new ymaps.Polyline([
      [points_array[0][0], points_array[0][1]],
      [points_array[0][0], points_array[0][1]]
    ], {}, {
      strokeColor: '#000000',
      strokeWidth: 4
    });


    this.myMap.geoObjects.add(Point);
    this.myMap.geoObjects.add(lineStringGeometry);



    var interval = setInterval(
      function(){
        new_array = points_array[index];
        Point.geometry.setCoordinates(new_array);

        lineStringGeometry.geometry.set(index, new_array);
        this.myMap.setCenter(new_array);
        index++;
        if(points_array.length == index){
          alert('stop')
          clearInterval(interval)
        }
      }, delay);

  }

/*-------------_FUNCTION WITH ARRAY--------------------- */

  function newCoordinate(point_array, delta_array){
    var x = point_array[0] + delta_array[0];
    var y = point_array[1] + delta_array[1];
    return [x, y];
  }


  function getNewDelta(arg1, arg2, time) {
    var x = (arg2[0] - arg1[0])/time;
    var y = (arg2[1] - arg1[1])/time;
    return [x, y];
  }
};