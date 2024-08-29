$(document).ready(function() {

    $('#infocounbtn').click(function() {
        $.ajax({
            url: "/libs/php/getCountryInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                latitude: $('#latitude').val(),
                long: $('#long').val()
            },
            success: function(result) {
                console.log(JSON.stringify(result));
                
                if (result.status.name == "ok" && result.data.length > 0) {
                    $('#distance').text(result.data[0].distance);
                    $('#countryname').text(result.data[0].countryName);
                    $('#countrypop').text(result.data[0].population);
                    $('#hidediv').show(); 
                    $('#error').hide(); 
                } else {
                    $('#error').show().text('No data found for the given coordinates.'); 
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX call failed:', textStatus, errorThrown); 
            }
        });
    });

  
    $('#infocounbtn1').click(function() {
        $.ajax({
            url: "/libs/php/getWheatherInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                east: $('#east').val(),
                west: $('#west').val(),
                south: $('#south').val(),
                north: $('#north').val()
            },
            success: function(result) {
                console.log(JSON.stringify(result));
               
                if (result.status.name == "ok" && result.data.length > 0) {
                    $('#countcode').text(result.data[0].stationName);
                    $('#tempre').text(result.data[0].temperature);
                    $('#dandt').text(result.data[0].datetime);
                    $('#weatherCondition').text(result.data[0].clouds);
                    $('#hidediv1').show(); 
                    $('#error').hide(); 
                } else {
                    $('#error').show().text('No data found for the given coordinates.');
                   
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX call failed:', textStatus, errorThrown); 
                $('#error').show().text('Internal Server Error. Please try again.'); 
            }
        });
    });


    $('#infocounbtn2').click(function() {
        $.ajax({
            url: "/libs/php/getneighbourhood.php",
            type: 'POST',
            dataType: 'json',
            data: {
                latitude: $('#lati').val(),
                long: $('#longitude').val()
            },
            success: function(result) {
                
               
                if (result.status.name == "ok" && result.data) {
                    $('#countrycode').text(result.data.countryCode);
                    $('#countname').text(result.data.name);
                    $('#city').text(result.data.city);
                    $('#hidediv2').show(); 
                    $('#error').hide();
                } else {
                    $('#error').show().text('No data found for the given coordinates.'); 
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX call failed:', textStatus, errorThrown); 
            }
        });
    });



    $(window).on('load', function() {
        if ($('#preloader').length) {
            $('#preloader').delay(1000).fadeOut('slow', function() {
                $(this).remove(); 
            });
        }
    });
});
