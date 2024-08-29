var map,clickedcountry,countryName,countcode,fromcur,tocur, valu;
valu=$('#amount').val();
var citys = L.layerGroup(); 
var markers = L.markerClusterGroup(); 
var airpo= L.layerGroup();
var cityl= L.layerGroup();
var cityobjec=[];
function addMarkers(data, fcode, markerOptions, popupText) {
  const nFormat = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0,minimumFractionDigits: 0});
  data.forEach(function (item) {
      if (item.fcode === fcode) {
          let popula=nFormat.format(item.population);
          var marker = L.marker([item.lat, item.lng], markerOptions)
                           .bindPopup(`<b>${item.toponymName}</b><br>${popupText}<br>Population: ${popula}`);

          markers.addLayer(marker);

          if (fcode === 'PPLC') {
              cityobjec.push(item);
              citys.addLayer(marker); 
              //console.log(cityobjec);
          }
          if (fcode === 'AIRP') {
            airpo.addLayer(marker); 
        }
        if (fcode === 'PPLA2') {
          cityl.addLayer(marker);
      }
      }
  });
}


function gettime(time){
  const unixTimestamp = time;


const date = new Date(unixTimestamp * 1000);


const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

 // console.log(formattedTime);
  return formattedTime;
}
function getDayOfWeek(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  
  const date = new Date(dateString);


  const dayIndex = date.getDay();

 
  return daysOfWeek[dayIndex];
 }

var countryMarker = L.ExtraMarkers.icon({
  icon: 'fa-globe',
  markerColor: 'purple',
  shape: 'star',
  prefix: 'fa'
});
var locatMarker = L.ExtraMarkers.icon({
  icon: 'fa-location-arrow',
  markerColor: 'orange-dark',
  shape: 'penta',
  prefix: 'fa'
});

var captialMarker = L.ExtraMarkers.icon({
  icon: 'fa-bolt',
  markerColor: 'red',
  shape: 'star',
  prefix: 'fa'
});
var cityMarker = L.ExtraMarkers.icon({
  icon: 'fa-flag-checkered',
  markerColor: 'green',
  shape: 'penta',
  prefix: 'fa'
});

var airportMarker = L.ExtraMarkers.icon({
  icon: 'fa-plane',
  markerColor: 'orange-dark',
  shape: 'square',
  prefix: 'fa'
});

var waterMarker = L.ExtraMarkers.icon({
  icon: 'fa-tint',
  markerColor: 'blue',
  shape: 'circle',
  prefix: 'fa'
});

var seaMarker = L.ExtraMarkers.icon({
  icon: 'fa-ship',
  markerColor: 'blue',
  shape: 'circle',
  prefix: 'fa'
});

var valcMarker = L.ExtraMarkers.icon({
  icon: 'fa-fire',
  markerColor: 'orange',
  shape: 'star',
  prefix: 'fa'
});

var hosMarker = L.ExtraMarkers.icon({
  icon: 'fa-hospital-o',
  markerColor: 'green',
  shape: 'penta',
  prefix: 'fa'
});

var univMarker = L.ExtraMarkers.icon({
  icon: 'fa-graduation-cap',
  markerColor: 'yellow',
  shape: 'square',
  prefix: 'fa'
});

var hillMarker = L.ExtraMarkers.icon({
  icon: 'fa-modx',
  markerColor: 'violet',
  shape: 'circle',
  prefix: 'fa'
});

var streets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
});

var satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
});

var basemaps = {
  "Streets": streets,
  "Satellite": satellite
};

var infoBtn1 = L.easyButton("fa-info", function (btn, map) {
  $("#exampleModal1").modal("show");
});

var holi = L.easyButton('<i class="fa fa-tree fa-xl"></i>', function (btn, map) {
  $("#exampleModal5").modal("show");
});
var wikiin= L.easyButton("fa-university fa-xl", function (btn, map) {
  $("#exampleModal4").modal("show");
});

var weatherBtn = L.easyButton("fa-cloud fa-xl", function (btn, map) {
  $("#exampleModal2").modal("show");
})
var currencyBtn = L.easyButton('<i class="fa fa-dollar-sign fa-xl"></i>', function (btn, map) {
  $("#exampleModal3").modal("show");
})
/*function getLatLng(coordinates) {
  let latLngs = [];

  function traverseCoords(coords) {
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
      latLngs.push([coords[1], coords[0]]);
    } else if (Array.isArray(coords)) {
      coords.forEach(coord => traverseCoords(coord));
    }
  }

  traverseCoords(coordinates);
  return latLngs;
}*/

$(document).ready(function () {
  $('#selcetfrom').change(function(){
    fromcur = $('#selcetfrom').val();
    $('#selcetfrom option:selected').each(function() {
      if($(this).text().trim() === ''){
          $(this).text('Currency not found');
      }
  });
   
    //console.log(fromcur);
  })
  $('#selcetto').change(function(){
    tocur = $('#selcetto').val();
    //console.log(tocur);
  })

  $('#amount').change(function(){
    valu = $('#amount').val();
    //console.log(valu);
  })



  $('#changea').change(function () {
      
    $.ajax({
      url: "libs/php/currencyconverter.php",
      type: 'POST',
      dataType: 'json',
      data: { value: valu,
              fromcu: fromcur,
              tocu:tocur

      },
      success: function(result) {
       // console.log(JSON.stringify(result));
       if (result.status.name == "ok" && result.data.data) {
        Object.entries(result.data.data).forEach(function([key, value]) {
         
          if (key === tocur) {
              let sum = valu * value; 
              sum=sum.toFixed(2);
              $('#result').text(sum);
              return; 
          }
      });


    }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        //console.error('AJAX call failed:', textStatus, errorThrown);
        //console.log(jqXHR.responseText); 
      }
    });
   

  });



  $.ajax({
    url: "libs/php/getcurrency.php",
    type: 'GET',
    dataType: 'json',
    success: function(result) {
     // console.log(JSON.stringify(result));
     if (result.status.name == "ok" && result.data.data != {}) {
      var from =$('#selcetfrom');
      var to=$('#selcetto');
      from.empty();
      to.empty(); 
        Object.entries(result.data.data).forEach(function([key, value]) {
        var option = $('<option></option>').attr('value',key).text(value.name);
          
          to.append(option.clone());
          from.append(option);
        
         });
     }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      //console.error('AJAX call failed:', textStatus, errorThrown);
      //console.log(jqXHR.responseText); 
    }
  });
  $.ajax({
    url: "libs/php/getCountryInfo.php",
    type: 'GET',
    dataType: 'json',
    success: function(result) {
       // console.log(result);
        if (result.error) {
            console.error("Server Error: " + result.error);
            return;
        }
        populateCountrySelect(result);
    },
    error: function(xhr, status, error) {
        //console.error("AJAX Error: " + error);
        //console.log(xhr.responseText);
    }
  });

  /*$('#countrySelect').click(function(){
    if( $("option:selected").text()){
      var couname=$("option:selected").text();
      var concode=$("option:selected").val();
      var select = $('#countrySelect');
      $("option:selected").text('');
      $("option:selected").val('');
      var option = $('<option></option>').attr('value', concode).text(couname);
      select.append(option);


    }
  })*/





  $('#countrySelect').change(function () {
    var capilat,capilong,topocapna,capnameif;
    var latitu,longitu;
    var isoCode = $(this).val();
    var countryName = $("option:selected").text(); 
    countryName=countryName.replaceAll('EuroEuro','');
    countryName = encodeURIComponent(countryName);
    //console.log(countryName);
  
    
    $.ajax({
      url: "libs/php/changecountry.php",
      type: 'POST',
      dataType: 'json',
      data: { ISO: isoCode },
      success: function (result) {
        //console.log(result);
        if (!result || result.length === 0 || !result[0].coordinates || result[0].coordinates.length === 0) {
          //console.error("Empty or invalid coordinates received.");
          $('#countrySelect').val('GB').change();
          return;
        }
        
        var countcode = result[0].iso_a2;
        var feature = result[0].feature;
       var border = L.geoJSON(feature, {fillColor: 'red', weight: 2, color: 'red'}).addTo(map);
        map.fitBounds(border.getBounds());

       /* var polyline = L.polyline(latlong, { color: 'red' }).addTo(map);
        map.fitBounds(polyline.getBounds());*/
        $.ajax({
          url: "libs/php/contryinfodisplay.php",
          type: 'POST',
          dataType: 'json',
          data: { name: countcode },
          success: function (result) {
           //console.log(JSON.stringify(result));
           if (result.status.name == "ok" && result.data.length > 0) {
            const nFormat = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0,minimumFractionDigits: 0});
              let popula=nFormat.format(result.data[0].population);
              fromcur=result.data[0].currencyCode;
             
              let selectfr = $('#selcetfrom');
              let currencyCodeFound = false;
              
              selectfr.find('option').each(function() {
                  if ($(this).val() === result.data[0].currencyCode) {
                      currencyCodeFound = true;
                      fromcur = result.data[0].currencyCode;
                      $('#selcetfrom').val(fromcur).change();
                      return false; 
                  }
              });
              
              if (!currencyCodeFound) {
                  let option = $('<option></option>')
                      .attr('value', result.data[0].currencyCode)
                      .text(result.data[0].currencyCode);
                  selectfr.append(option);
                  fromcur = result.data[0].currencyCode;
                  $('#selcetfrom').val(fromcur).change();
                  $('#result').text(fromcur+' This Currency Exchange Not Available').change();

              }
           
             
            
            
           
              $('#selcetto').val('EUR').change();
            if (result.status.name == "ok" && result.data.length > 0) {
              $('#continentname').text(result.data[0].continentName);
              $('#countryname').text(result.data[0].countryName);
              $('#popu').text(popula);
              $('#capital').text(result.data[0].capital);
              $('#languages').text(result.data[0].languages);
              capnameif=result.data[0].capital
            }
            countryName = result.data[0].countryName;
            countryName = encodeURIComponent(countryName);
           }

        $.ajax({
          url: "libs/php/searchApi.php",
          type: 'POST',
          dataType: 'json',
          data: { name: countryName },
          success: function (result) {
           // console.log(result.data);
              if (result.status.name == "ok" && result.data.length > 0) {
                  latitu = result.data[0].lat;
                  longitu = result.data[0].lng;
                 // console.log(result.data);
                 
                   markers.clearLayers();
                    addMarkers(result.data, 'PCLI', {icon:countryMarker}, "Country");
                    addMarkers(result.data, 'PPLC', { icon:captialMarker}, "Capital City");
                    addMarkers(result.data, 'PPL', { icon:cityMarker}, "Area");
                    addMarkers(result.data, 'PPLA2', { icon:cityMarker}, "City");
                    addMarkers(result.data, 'AIRP', { icon:airportMarker}, "Airport");
                    addMarkers(result.data, 'LK', {icon:waterMarker}, "Lake");
                    addMarkers(result.data, 'RSD', { icon: L.icon({ iconUrl: 'libs/icon/railway.jpg', iconSize: [38, 38] }) }, "Railroad station");
                    addMarkers(result.data, 'HLL', { icon:hillMarker}, "Hill");
                    addMarkers(result.data, 'SEA', {icon:seaMarker}, "SEA");
                    addMarkers(result.data, 'VLC',{ icon:valcMarker}, "volcano");
                    addMarkers(result.data, 'HSP', { icon:hosMarker}, "Hospital");
                    addMarkers(result.data, 'UNIV', { icon:univMarker}, "University");
                    markers.addTo(map);
                   //cityobjec   capilat,capilong topocapna
                   Object.entries(cityobjec).forEach((ci=>{
                   
                    ci.forEach(c=>{
                      if(c.countryCode===countcode){
                        
                        capilat=c.lat;
                        capilong=c.lng;
                        topocapna=c.toponymName;
                        
                       // console.log(capilat)
                      }else{
                        capilat=latitu;
                        capilong=longitu;
                      }
                    })
                    

                  }))
           

              $.ajax({
                url: "libs/php/wheather.php",
                type: 'POST',
                dataType: 'json',
                data: { latitude:capilat,
                        longitude:capilong
          
                },
                success: function(result) {
                  countryName = decodeURIComponent(countryName);
                  //console.log(JSON.stringify(result));
                    if(topocapna){
                      $('#cname').text(topocapna + ' , '+ countryName);
                    }else{
                      $('#cname').text(capnameif + ' , '+ countryName);
                    }
                     
                     $('#curenti').attr('src','https://openweathermap.org/img/w/'+result.data.weather[0].icon+'.png');
                    $('#weather').text(result.data.weather[0].description);
                    $('#temp').text((result.data.main.temp-273).toFixed(0)+'°C');
                    $('#feelli').text((result.data.main.feels_like-273).toFixed(0)+'°C');
                    $('#tempmin').text(Math.floor((result.data.main.temp_min-273))+'°C');
                    $('#tempmax').text(Math.ceil((result.data.main.temp_max-273)) +'°C');

                    $.ajax({
                      url: "libs/php/forcast.php",
                      type: 'POST',
                      dataType: 'json',
                      data: { latitude:capilat,
                              longitude:capilong
                      },
                      success: function(result) {
                        //console.log(JSON.stringify(result));
                        
                      
                       
                    

                      let currtime=result.data.list[0].dt;
                     
                        
                      //cityobjec
              
                       
                       Object.entries(result.data.list).forEach(obj => {
                        obj.forEach(oj=>{
                          let nextday=currtime+86400;
                        let nextnxtday=currtime+(2*86400);
                        let thirday=currtime+(3*86400);
                        if(oj.dt===nextday){
                        $('#tday').text(getDayOfWeek(oj.dt_txt));
                        $('#daytempfo').text(Math.ceil(oj.main.temp_max-273)+'°C');
                        $('#daytempminfo').text(Math.floor(oj.main.temp_max-273)+'°C');
                     
                        $('#tdayicon').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
                        }
                        if(oj.dt===nextnxtday){
                          $('#tday1').text(getDayOfWeek(oj.dt_txt));
                          $('#daytempfo1').text(Math.ceil(oj.main.temp_max-273)+'°C');
                          $('#daytempminfo1').text(Math.floor(oj.main.temp_max-273)+'°C');
                       
                          $('#tdayicon1').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
                          }
                          if(oj.dt===thirday){
                            $('#tday2').text(getDayOfWeek(oj.dt_txt));
                            $('#daytempfo2').text(Math.ceil(oj.main.temp_max-273)+'°C');
                            $('#daytempminfofo2').text(Math.floor(oj.main.temp_max-273)+'°C');
                     
                            $('#tdayicon2').attr('src','https://openweathermap.org/img/w/'+oj.weather[0].icon+'.png');
                            }
                        })
                       
                        
                        
                     });
             
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        //console.error('AJAX call for search API failed:', textStatus, errorThrown);
                        //console.log(jqXHR.responseText);
                      }
                    });
              
                  
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  //console.error('AJAX call failed:', textStatus, errorThrown);
                  //console.log(jqXHR.responseText); 
                }
              });


            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            //console.error('AJAX call for search API failed:', textStatus, errorThrown);
            //console.log(jqXHR.responseText);
          }
        });
          
        




        let currentYear = new Date().getFullYear();
        function removeDuplicates(data) {
          const seenDates = new Set();
          return data.filter(item => {
              const dateString = new Date(item.date).toDateString();
              if (seenDates.has(dateString)) {
                  return false; 
              } else {
                  seenDates.add(dateString);
                  return true; 
              }
          });
      }
        $.ajax({
          url: "libs/php/holiday.php",
          type: 'POST',
          dataType: 'json',
          data: { code: countcode, 
                  year:currentYear
          },
          success: function(result) {
            //console.log(result.data)
            if(result.data.length >0){
              $('#myTableBody').show()
              $('#error').hide();
            let data = result.data;
    
            data = removeDuplicates(data);
    
         
            var $tableBody = $('#myTableBody').empty();
            function formatDate(dateString) {
              const date = new Date(dateString);
              const options = { weekday: 'short', day: 'numeric', month: 'short' };
              let formattedDate = date.toLocaleDateString('en-US', options);
  
           
              const day = date.getDate();
              const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
                             (day % 10 === 2 && day !== 12) ? 'nd' :
                             (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
  
              
              formattedDate = formattedDate.replace(/\d+/, day + suffix);
              return formattedDate;
          }
    
        
            data.forEach(function (item) {
              var $tr = $('<tr>');
  
              ['date', 'name', 'types'].forEach(function (key) {
                  var value = item[key];
                  if (key === 'date') {
                      value = formatDate(value);
                  } else if (Array.isArray(value)) {
                      value = value.join(', ');
                  }
  
                  var $td = $('<td>').attr('id', key).append($('<p>').text(value));
                  $tr.append($td);
              });
  
              $tableBody.append($tr);
          });
          }else{
            $('#error').show();
            $('#myTableBody').hide()
          }
           
            
          
        },
          error: function (jqXHR, textStatus, errorThrown) {
           // console.error('AJAX call for search API failed:', textStatus, errorThrown);
           // console.log(jqXHR.responseText); 
           $('#showi').show();
           $('#error').text('Hoilday Info Not Available');
          }
        });

        $.ajax({
          url: "libs/php/wiki.php",
          type: 'POST',
          dataType: 'json',
          data: { name: countryName },
          success: function (result) {
           // console.log(JSON.stringify(result));
            //var $row = $('#myRow');
            //  var $td = $('<td>');
            let u1,u2,u3;
            $('#imageofco').attr('src',result.data[0].thumbnailImg);
            $('#despc').text(result.data[0].summary);
            $('#wikiurl').attr('href','https://'+result.data[0].wikipediaUrl);
            $('#imageofco1').attr('src',result.data[1].thumbnailImg);
            $('#despc1').text(result.data[1].summary);
            $('#wikiurl1').attr('href','https://'+result.data[1].wikipediaUrl);
            $('#imageofco2').attr('src',result.data[2].thumbnailImg);
            $('#despc2').text(result.data[2].summary);
            $('#wikiurl2').attr('href','https://'+result.data[2].wikipediaUrl);
            $('#imageofco3').attr('src',result.data[3].thumbnailImg);
            $('#despc3').text(result.data[3].summary);
            $('#wikiurl3').attr('href','https://'+result.data[3].wikipediaUrl);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            //console.error('AJAX call for search API failed:', textStatus, errorThrown);
            //console.log(jqXHR.responseText);
          }
        });
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        //console.error('AJAX call for country info failed:', textStatus, errorThrown);
        //console.log(jqXHR.responseText); 
      }
    });
  
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        //console.error('AJAX call for coordinates failed:', textStatus, errorThrown);
        //console.log(jqXHR.responseText); 
      }
    });
  });
  




  

  function populateCountrySelect(countries) {
    var select = $('#countrySelect');
    
   
    var options = [];

   
    countries.forEach(function(country) {
        var option = $('<option></option>').attr('value', country.iso).text(country.name);
        options.push(option);
    });

    options.sort(function(a, b) {
        return a.text().localeCompare(b.text());
    });

    
    options.forEach(function(option) {
        select.append(option);
    });
}

  map = L.map("map", { layers: [streets] }).setView([54.5, -4], 6);


  function onLocationFound() {
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
   
     }
        
     function showPosition(position) {


     $.ajax({
      url: "libs/php/getclickcountryinfo.php",
      type: 'POST',
      dataType: 'json',
      data: { latitu: position.coords.latitude, 
              longi:  position.coords.longitude },
      success: function(result) {
       // console.log(JSON.stringify(result.data));
        var foundcount = result.data.countryName;
        var foundcountcode = result.data.countryCode;
        $('#countrySelect').val(foundcountcode).change();
      
  
        
},
error: function (jqXHR, textStatus, errorThrown) {
 // console.error('AJAX call for coordinates failed:', textStatus, errorThrown);
 // console.log(jqXHR.responseText); 
}
});
     }
 }

 function reloads(){
  map.locate({setView: true, maxZoom: 16});
  if(!onLocationFound()){
   $('#countrySelect').val('GB').change();
 
  }
 }
map.on('reload',reloads);
  map.on('locationfound', onLocationFound);
  function onLocationError(e) {
   
    $('#countrySelect').val('GB').change();

  }
  map.on('locationerror', onLocationError);

  layerControl = L.control.layers(basemaps).addTo(map);
  layerControl.addOverlay(citys, "Capital City");
  layerControl.addOverlay(airpo, "Airport");
  layerControl.addOverlay(cityl, "City");
  infoBtn1.addTo(map);
  weatherBtn.addTo(map);
  currencyBtn.addTo(map);
  wikiin.addTo(map);
  holi.addTo(map);
  var popup = L.popup();

  function onMapClick(e) {
    var clickedcountcde,topynam,whlat,whlng;
    var laungua;
   // console.log(e.latlng);
    var lati = e.latlng.lat;
    var longo = e.latlng.lng;
   // console.log(lati);
  
    $.ajax({
      url: "libs/php/getclickcountryinfo.php",
      type: 'POST',
      dataType: 'json',
      data: { latitu: lati, longi: longo },
      success: function(result) {
        //console.log(JSON.stringify(result.data));
        if (result.status.name == "ok") {
        clickedcountry = result.data.countryName;
        clickedcountcde = result.data.countryCode;
        laungua = result.data.languages;
  
        popup
          .setLatLng(e.latlng)
          .setContent("Country Name: " + clickedcountry + "<br>Country Code: " + clickedcountcde + "<br>Languages: " + laungua)
          .openOn(map);
          //console.log("countryName:", clickedcountry);

          $('#countrySelect').val(clickedcountcde).change();
        }   
        
      },
      error: function(jqXHR, textStatus, errorThrown) {
       // console.error('AJAX call failed:', textStatus, errorThrown);
      }
    });
  }

  
  

  map.on('click', onMapClick);


  

  $(window).on('load', function() {
    map.locate();
    map.on('locationfound', onLocationFound)
         if ($('#preloader').length) {
            
            $('#preloader').delay(2000).fadeOut('slow', function() {
             
                $(this).remove();
            });
        }
       
    
  })
})

