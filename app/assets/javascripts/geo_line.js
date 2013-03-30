function GeoLine(){

  this.myMap;

  var myMapSettings, Point, lineStringGeometry, ilineStringGeometry = 1;

  this.init = function(settings) { // Инициализация настроек
    myMapSettings = settings;
    ymaps.ready(yandexMapInit);
  };

  this.geoLocationShow = function(){ // Старт показа
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
        myMapSettings.finishPoint = res.geoObjects.get(0).geometry.getCoordinates();
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

    Point = new ymaps.Circle([[points_array[0][0], points_array[0][1]], 80]);


    lineStringGeometry = new ymaps.Polyline([
      [points_array[0][0], points_array[0][1]],
      [points_array[0][0], points_array[0][1]]
    ], {}, {
      strokeColor: '#000000',
      strokeWidth: 4
    });

    this.myMap.geoObjects.add(Point);
    this.myMap.geoObjects.add(lineStringGeometry);

    movePoint(points_array);
  }

  function movePoint(points_array){
    delay = myMapSettings.delay
    var index = 1;

    var interval = setInterval(
      function(){
        point = points_array[index];
        Point.geometry.setCoordinates(point);

        lineStringGeometry.geometry.set(ilineStringGeometry++, point);
        this.myMap.setCenter(point);
        index++;
        if(points_array.length == index){
          clearInterval(interval)
          getNewPoints()
        }
      }, 1000);
  }

  function getNewPoints(){
    $.ajax({
      type: "GET",
      url: myMapSettings.url_points,
      dataType: "JSON",
      success: function(data){
        movePoint(data);
      }
    });
  }
};