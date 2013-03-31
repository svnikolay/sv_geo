function GeoLine(){

  this.myMap;

  var myMapSettings, Point, lineStringGeometry, ilineStringGeometry = 1, save_index, interval;

  this.init = function(settings) { // Инициализация настроек
    myMapSettings = settings;
    ymaps.ready(yandexMapInit);
  };

  this.geoLocationShow = function(){ // Старт показа
    ymaps.ready(yandexMapGeoLocationShow);
  };

  this.geoLocationPause = function(){
    pauseMovePoint();
  }

  this.geoLocationRestart = function(){
    restartMovePoint();
  }

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

    movePoint(1);
  }

  function movePoint(index){
    points_array = myMapSettings.points_array;
    delay = myMapSettings.delay;

    if(arrayEmpty(points_array)) return pendingArray();

    interval = setInterval(
      function(){
        point = points_array[index++];
        save_index = index;
        Point.geometry.setCoordinates(point);

        lineStringGeometry.geometry.set(ilineStringGeometry++, point);
        this.myMap.setCenter(point);

        if(points_array.length == index){
          clearInterval(interval);
          if(!lineIsEnd()) getNewPoints();
          else myMapSettings.finishCallback();
        }
      }, delay);
  }

  function pauseMovePoint(){
    clearInterval(interval);
  }

  function restartMovePoint(){
    movePoint(save_index);
  }


  function getNewPoints(){
    $.ajax({
      type: "GET",
      url: myMapSettings.url_points,
      dataType: "JSON",
      success: function(data){
        myMapSettings.end_of_line = data.end_of_line;
        myMapSettings.points_array = data.points_array;
        movePoint(1);
        console.log(data.point_ids)
      }
    });
  }

  function lineIsEnd(){
    return myMapSettings.end_of_line;
  }

  function pendingArray(){
    setTimeout(getNewPoints, myMapSettings.step_of_post)
  }

  function arrayEmpty(arr){
    return typeof arr[0] == 'undefined'
  }
};