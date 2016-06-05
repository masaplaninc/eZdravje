
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";


/**
 * Prijava v sistem z privzetim uporabnikom za predmet OIS in pridobitev
 * enolične ID številke za dostop do funkcionalnosti
 * @return enolični identifikator seje za dostop do funkcionalnosti
 */
function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
function generirajPodatke(stPacienta) {
	sessionId = getSessionId();
  	
if (stPacienta==1) {
$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});

$.ajax({
    url: baseUrl + "/ehr",
    type: 'POST',
    success: function (data) {
        var ehrId = data.ehrId;
    

        // build party data
        var partyData = {
            firstNames: "Maja",
            lastNames: "Novak",
            dateOfBirth: "1966-4-18T12:30",
            partyAdditionalInfo: [
                {
                    key: "ehrId",
                    value: ehrId
                }
            ]
        };
        $.ajax({
            url: baseUrl + "/demographics/party",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(partyData),
            success: function (party) {
                if (party.action == 'CREATE') {
                    $('#preberiObstojeciEHR').append($('<option>', {
					    value: ehrId,
					    text: partyData.firstNames + ' ' + partyData.lastNames
					}));
					$("#sporocilo").html("<span class='obvestilo label label-success'>Uspešno kreirani bolniki.</span>");
                }
            }
        });dodajMeritveVitalnihZnakov(1,ehrId); 
    }
});

	
}
if (stPacienta==2) {
$.ajaxSetup({
            headers: {"Ehr-Session": sessionId}
        });

$.ajax({
    url: baseUrl + "/ehr",
    type: 'POST',
    success: function (data) {
        var ehrId = data.ehrId;
    

        // build party data
        var partyData = {
            firstNames: "Rok",
            lastNames: "Zdravc",
            dateOfBirth: "1982-9-18T15:30",
            partyAdditionalInfo: [
                {
                    key: "ehrId",
                    value: ehrId
                }
            ]
        };
        $.ajax({
            url: baseUrl + "/demographics/party",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(partyData),
            success: function (party) {
                if (party.action == 'CREATE') {
                    $('#preberiObstojeciEHR').append($('<option>', {
                        value: ehrId,
                        text: partyData.firstNames + ' ' + partyData.lastNames
                    }));
                    $("#sporocilo").html("<span class='obvestilo label label-success'>Uspešno kreirani bolniki.</span>");
                }
            }
        });dodajMeritveVitalnihZnakov(2,ehrId); 
    }
});

    
}

if (stPacienta==3) {
$.ajaxSetup({
            headers: {"Ehr-Session": sessionId}
        });

$.ajax({
    url: baseUrl + "/ehr",
    type: 'POST',
    success: function (data) {
        var ehrId = data.ehrId;
    

        // build party data
        var partyData = {
            firstNames: "Nejc",
            lastNames: "Kralj",
            dateOfBirth: "1954-5-18T15:30",
            partyAdditionalInfo: [
                {
                    key: "ehrId",
                    value: ehrId
                }
            ]
        };
        $.ajax({
            url: baseUrl + "/demographics/party",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(partyData),
            success: function (party) {
                if (party.action == 'CREATE') {
                    $('#preberiObstojeciEHR').append($('<option>', {
                        value: ehrId,
                        text: partyData.firstNames + ' ' + partyData.lastNames
                    }));
                    $("#sporocilo").html("<span class='obvestilo label label-success'>Uspešno kreirani bolniki.</span>");
                }
            }
        });dodajMeritveVitalnihZnakov(3,ehrId); 
    }
});

    
}
}

function dodajMeritveVitalnihZnakov(st, ehr) {
	sessionId = getSessionId();
	if (st==1) {

	

	var ehrId = ehr;
	var podatki = {
			// Struktura predloge je na voljo na naslednjem spletnem naslovu:
      // https://rest.ehrscape.com/rest/v1/template/Vital%20Signs/example
		    "ctx/language": "en",
		    "ctx/territory": "SI",
		    "vital_signs/height_length/any_event/body_height_length": 185,
		    "vital_signs/body_weight/any_event/body_weight": 82.00,
		   	"vital_signs/body_temperature/any_event/temperature|magnitude": 36.5,
		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
		    "vital_signs/blood_pressure/any_event/systolic": 118,
		    "vital_signs/blood_pressure/any_event/diastolic": 92,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 98
		};
		var parametriZahteve = {
		    ehrId: ehrId,
		    templateId: 'Vital Signs',
		    format: 'FLAT',
		    committer: 'merilec'
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(podatki),
		    success: function (res) {
		       
		    },
		    error: function(err) {
		    	
		    }
		}); 


		
	}
	if (st==2) {
        setTimeout(function() {
    

    var ehrId = ehr;
    var podatki = {
            // Struktura predloge je na voljo na naslednjem spletnem naslovu:
      // https://rest.ehrscape.com/rest/v1/template/Vital%20Signs/example
            "ctx/language": "en",
            "ctx/territory": "SI",
            "vital_signs/height_length/any_event/body_height_length": 170,
            "vital_signs/body_weight/any_event/body_weight": 79.00,
            "vital_signs/body_temperature/any_event/temperature|magnitude": 36.5,
            "vital_signs/body_temperature/any_event/temperature|unit": "°C",
            "vital_signs/blood_pressure/any_event/systolic": 118,
            "vital_signs/blood_pressure/any_event/diastolic": 92,
            "vital_signs/indirect_oximetry:0/spo2|numerator": 90
        };
        var parametriZahteve = {
            ehrId: ehrId,
            templateId: 'Vital Signs',
            format: 'FLAT',
            committer: 'merilec'
        };
        $.ajax({
            url: baseUrl + "/composition?" + $.param(parametriZahteve),
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(podatki),
            success: function (res) {
               
            },
            error: function(err) {
                
            }
        }); 

            }, 100);
        
    }
	if (st==3) {
        setTimeout(function() {
		var ehrId = ehr;
	var podatki = {
			// Struktura predloge je na voljo na naslednjem spletnem naslovu:
      // https://rest.ehrscape.com/rest/v1/template/Vital%20Signs/example
		    "ctx/language": "en",
		    "ctx/territory": "SI",
		    "vital_signs/height_length/any_event/body_height_length": 172,
		    "vital_signs/body_weight/any_event/body_weight": 62.00,
		   	"vital_signs/body_temperature/any_event/temperature|magnitude": 36.5,
		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
		    "vital_signs/blood_pressure/any_event/systolic": 115,
		    "vital_signs/blood_pressure/any_event/diastolic": 95,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": 94
		};
		var parametriZahteve = {
		    ehrId: ehrId,
		    templateId: 'Vital Signs',
		    format: 'FLAT',
		    committer: 'merilec'
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(podatki),
		    success: function (res) {
		       
		    },
		    error: function(err) {
		    	
		    }
		}); 

    },300);

	}

}

// Napolni podatke v pripravljeni obrazec
function nekaj(podatek) {


    $(".patient-records").sortable({
        handle: ".panel-heading",
        items: "div.panel",
        tolerance: "pointer"
    });

    $('.patient-records .panel-heading span.remove').on('click', function () {

        var target = $(this).closest('.panel');

        target.fadeOut(300, function () {
            $(this).remove();
        });

    });

    $(window).scroll(function () {
        if ($(this).scrollTop() < 200) {
            $('#smoothscroll').fadeOut();
        } else {
            $('#smoothscroll').fadeIn();
        }
    });

    $('#smoothscroll').on('click', function () {
        $('html, body').animate({scrollTop: 0}, 'fast');
        return false;
    });

    $('#timeline-example').ehrscapeTimeline();

    // ehrscape API

    var baseUrl = "https://rest.ehrscape.com/rest/v1";
   
        var ehrId = podatek;
  
    var username = "ois.seminar";
    var password = "ois4fri";

    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var sessionId;

    function login() {
        return $.ajax({
            type: "POST",
            url: baseUrl + "/session?" + $.param({username: username, password: password}),
            success: function (res) {
                sessionId = res.sessionId;
            }
        });
    }

    function logout() {
        return $.ajax({
            type: "DELETE",
            url: baseUrl + "/session",
            headers: {
                "Ehr-Session": sessionId
            }
        });
    }

    function patientData() {
        return $.ajax({
            url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (data) {
                var party = data.party;

                // Name
                $("#patient-name").html(party.firstNames + ' ' + party.lastNames);
                
                //id
                $(".ehrIdIzpis").html(ehrId);

                // Complete age
                var age = getAge(formatDateUS(party.dateOfBirth));
                $(".patient-age").html(age);

                // Date of birth
                var date = new Date(party.dateOfBirth);
                var stringDate = monthNames[date.getMonth()] + '. ' + date.getDate() + ', ' + date.getFullYear();
                $(".patient-dob").html(stringDate);

                // Age in years
                $(".patient-age-years").html(getAgeInYears(party.dateOfBirth));


                // Patient's picture
              

                    $('.patient-pic').css('background', 'url(img/Smile.jpg)');
                
            }
        });
    }

    function bloodPressures() {
        var colors = ['#ED5565', '#DA4453'];
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/blood_pressure",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (res) {
                //console.log('2');
                res.forEach(function (el, i, arr) {
                    var date = new Date(el.time);
                    el.date = date.getTime();
                });

                new Morris.Area({
                    element: 'blood-pressures',
                    data: res.reverse(),
                    xkey: 'date',
                    ykeys: ['systolic', 'diastolic'],
                    lineColors: colors,
                    labels: ['Systolic', 'Diastolic'],
                    lineWidth: 2,
                    pointSize: 3,
                    hideHover: true,
                    behaveLikeLine: true,
                    smooth: false,
                    resize: true,
                    xLabels: "day",
                    xLabelFormat: function (x) {

                        var date = new Date(x);

                        return (date.getDate() + '-' + monthNames[date.getMonth()]);
                    },
                    dateFormat: function (x) {

                        return (formatDate(x, false));
                    }
                });

                //last measurement
                var bp = res[res.length - 1].systolic + "/" + res[res.length - 1].diastolic + " " + res[res.length - 1].unit;
                $('.last-bp').text(bp);
                $('.last-bp-date').text(formatDate(res[res.length - 1].time, true));
            }
        });
    }

    function getWeight() {
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/weight",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (res) {
                // display newest
                $('.weight-placeholder-value').text(res[0].weight);
                $('.weight-placeholder-unit').text(res[0].unit);

                

               

                
            }
        });
    }

    function getHeight() {
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/height",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (res) {
                // display newest
                $('.height-placeholder-value').text(res[0].height);
                $('.height-placeholder-unit').text(res[0].unit);

                var gender = $('#patient-gender').text().toLowerCase();

                if (gender) {
                    var picture = $('.patient-height-image');
                    var src = "img/body-blank-" + gender + ".png";
                    picture.attr("src", src);
                }

                var ch = res[0].height + " " + res[0].unit;
                $('.last-ch').text(ch);
                $('.last-ch-date').text(formatDate(res[0].time, true));

                res.forEach(function (el, i, arr) {
                    var date = new Date(el.time);
                    el.date = date.getDate() + '-' + monthNames[date.getMonth()];
                });

                new Morris.Bar({
                    element: 'chart-height',
                    data: res.reverse(),
                    xkey: 'date',
                    ykeys: ['height'],
                    labels: ['Height'],
                    hideHover: true,
                    barColors: ['#48CFAD', '#37BC9B'],
                    xLabelMargin: 5,
                    resize: true
                });
            }
        });
    }

    function getSpo2() {
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/spO2",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (res) {
                var value = res[0].spO2.toFixed(2);
                $('.last-spo2').text(value + "%");
                $('.bar-spo2').css('width', value + "%");
            }
        });
    }

    function getTemperature() {
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/body_temperature",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (res) {
                //display newest
                var bt = res[0].temperature + " " + res[0].unit;
                $('.last-bt').text(bt);
                $('.last-bt-date').text(formatDate(res[0].time, true));

                res.forEach(function (el, i, arr) {
                    var date = new Date(el.time);
                    el.date = date.getDate() + '-' + monthNames[date.getMonth()];
                });

                new Morris.Bar({
                    element: 'body-temperature',
                    data: res.reverse(),
                    xkey: 'date',
                    ykeys: ['temperature'],
                    labels: ['Body Temperature'],
                    hideHover: true,
                    barColors: ['#FFCE54', '#F6BB42'],
                    xLabelMargin: 5,
                    resize: true
                });
            }
        });
    }

    function getPulse() {
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/pulse",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (res) {
                res.forEach(function (el, i, arr) {
                    var date = new Date(el.time);
                    el.date = date.getTime();
                });

                new Morris.Area({
                    element: 'pulse',
                    data: res.reverse(),
                    xkey: 'date',
                    ykeys: ['pulse'],
                    lineColors: ['#A0D468', '#8CC152'],
                    labels: ['Pulse'],
                    lineWidth: 2,
                    pointSize: 3,
                    hideHover: true,
                    behaveLikeLine: true,
                    smooth: false,
                    resize: true,
                    xLabels: "day",
                    xLabelFormat: function (x) {
                        var date = new Date(x);
                        return (date.getDate() + '-' + monthNames[date.getMonth()]);
                    },
                    dateFormat: function (x) {
                        return (formatDate(x, false));
                    }
                });

                //last measurement
                var p = res[res.length - 1].pulse + " " + res[res.length - 1].unit;
                $('.last-pulse').text(p);
                $('.last-pulse-date').text(formatDate(res[res.length - 1].time, true));
            }
        });
    }

    function getAllergies() {
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/allergy",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (res) {
                for (var i = 0; i < res.length; i++) {
                    $('ul.allergies').append('<li>' + res[i].agent + '</li>');
                }
            }
        });
    }

    function getMedications() {
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/medication",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (res) {
                for (var i = 0; i < res.length; i++) {
                    $('ul.medications').append('<li>' + res[i].medicine + ' - ' + res[i].quantity_amount + res[i].quantity_unit + '</li>');
                }
            }
        });
    }

    function getProblems() {
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/problem",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (res) {
                for (var i = 0; i < res.length; i++) {
                    $('ul.problems').append('<li>' + res[i].diagnosis + '</li>');
                }
            }
        });
    }

    function getBMI(){

        return $.ajax({
            url: "https://rest.ehrscape.com/ThinkCDS/services/CDSResources/guide/execute/BMI.Calculation.v.1/" + ehrId,
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (data) {
                var bmiVal = '', bmiDet = '';
                if (data instanceof Array) {
                    if (data[0].hasOwnProperty('results')) {
                        data[0].results.forEach(function (v, k) {
                            if (v.archetypeId === 'openEHR-EHR-OBSERVATION.body_mass_index.v1') {
                                var rounded = Math.round(v.value.magnitude * 100.0) / 100.0;
                                bmiVal = rounded + ' ' + v.value.units;
                            }
                            else{
                                if(v.archetypeId === 'openEHR-EHR-EVALUATION.gdl_result_details.v1'){
                                    bmiDet = '<span class="bmi-details">' + v.value.value + '</span>';
                                }
                            }
                        })
                    }
                }
                $('.patient-bmi').html(bmiVal);
            }
        });
    }

    function getLabs() {
        return $.ajax({
            url: baseUrl + "/view/" + ehrId + "/labs",
            type: 'GET',
            headers: {
                "Ehr-Session": sessionId
            },
            success: function (data) {

                var html = "";

                for (var i=0; i<data.length; i++){
                    html += '<tr>';

                    html += '<td>' + data[i].name + '</td>'+
                        '<td>' + data[i].loinc + '</td>'+
                        '<td>' + normalRange(data[i]) + '</td>'+
                        '<td>' + checkValue(data[i]) + '</td>'+
                        '<td>' + data[i].unit + '</td>'+
                        '<td>' + formatDate(data[i].time, true) + '</td>';

                    html += '</tr>';
                }

                $("#labResults").find("tbody").append(html);

            }
        });
    }

    function normalRange(item){

        var range = "";
        if(item.normal_max && item.normal_min){
            range = item.normal_min + " - " + item.normal_max;
        }
        else{
            if(item.normal_max){
                range = "< " + item.normal_max;
            }
            else{
                if(item.normal_min){
                    range = "> " + item.normal_min;
                }
            }
        }

        return range;

    }

    function checkValue(item){

        var value = item.value, range = false, cellValue, icon;

        if(item.normal_max && item.normal_min){
            if(value >= item.normal_min && value <= item.normal_max) range = true;
            else{
                if(value < item.normal_min) icon = "down";
                else icon = "up";
            }
        }
        else{
            if(item.normal_max){
                if(value <= item.normal_max) range = true;
                else icon = "up";
            }
            else{
                if(item.normal_min){
                    if(value >= item.normal_min) range = true;
                    else icon = "down";
                }
            }
        }

        if (range) cellValue = '<span class="normal">' + value + '</span>';
        else  cellValue = '<span class="abnormal">' + value + '<i class="fa fa-chevron-circle-' + icon + '"></i></span>';

        return cellValue;

    }

    // Helper functions (dates)

    function getAge(dateString) {
        var now = new Date();
        var today = new Date(now.getYear(), now.getMonth(), now.getDate());

        var yearNow = now.getYear();
        var monthNow = now.getMonth();
        var dateNow = now.getDate();

        var dob = new Date(dateString.substring(6, 10),
                dateString.substring(0, 2) - 1,
            dateString.substring(3, 5)
        );

        var yearDob = dob.getYear();
        var monthDob = dob.getMonth();
        var dateDob = dob.getDate();
        var age = {};
        var ageString = "";
        var yearString = "";
        var monthString = "";
        var dayString = "";


        var yearAge = yearNow - yearDob;

        if (monthNow >= monthDob)
            var monthAge = monthNow - monthDob;
        else {
            yearAge--;
            var monthAge = 12 + monthNow - monthDob;
        }

        if (dateNow >= dateDob)
            var dateAge = dateNow - dateDob;
        else {
            monthAge--;
            var dateAge = 31 + dateNow - dateDob;

            if (monthAge < 0) {
                monthAge = 11;
                yearAge--;
            }
        }

        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
        };

        if (age.years > 1) yearString = "l";
        else yearString = "l";
        if (age.months > 1) monthString = "m";
        else monthString = "m";
        if (age.days > 1) dayString = " d";
        else dayString = " d";


        if ((age.years > 0) && (age.months > 0) && (age.days > 0))
            ageString = age.years + yearString + " " + age.months + monthString;// + ", and " + age.days + dayString + " old";
        else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
            ageString = age.days + dayString + " old";
        else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
            ageString = age.years + yearString;// + " old. Happy Birthday!";
        else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
            ageString = age.years + yearString + " and " + age.months + monthString;// + " old";
        else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
            ageString = age.months + monthString; // + " and " + age.days + dayString + " old";
        else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
            ageString = age.years + yearString;// + " and " + age.days + dayString + " old";
        else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
            ageString = age.months + monthString;// + " old";
        else ageString = "Oops! Could not calculate age!";

        return ageString;
    }

    function formatDate(date, completeDate) {

        var d = new Date(date);

        var curr_date = d.getDate();
        curr_date = normalizeDate(curr_date);

        var curr_month = d.getMonth();
        curr_month++;
        curr_month = normalizeDate(curr_month);

        var curr_year = d.getFullYear();

        var curr_hour = d.getHours();
        curr_hour = normalizeDate(curr_hour);

        var curr_min = d.getMinutes();
        curr_min = normalizeDate(curr_min);

        var curr_sec = d.getSeconds();
        curr_sec = normalizeDate(curr_sec);

        var dateString, monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        if (completeDate){
            dateString = curr_date + "-" + monthNames[curr_month-1] + "-" + curr_year + " at " + curr_hour + ":" + curr_min; // + ":" + curr_sec;
        }
        else dateString = curr_date + "-" + monthNames[curr_month-1] + "-" + curr_year;

        return dateString;

    }

    function formatDateUS(date) {
        var d = new Date(date);

        var curr_date = d.getDate();
        curr_date = normalizeDate(curr_date);

        var curr_month = d.getMonth();
        curr_month++;
        curr_month = normalizeDate(curr_month);

        var curr_year = d.getFullYear();

        return curr_date + "-" + curr_month + "-" + curr_year;

    }

    function getAgeInYears(dateOfBirth) {
        var dob = new Date(dateOfBirth);
        var timeDiff = Math.abs(Date.now() - dob.getTime());
        return Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
    }

    function normalizeDate(el) {
        el = el + "";
        if (el.length == 1) {
            el = "0" + el;
        }
        return el;
    }

    // display page
    login().done(function () {
        patientData(),
        getWeight(),
        getBMI(),
        getSpo2()
    });


}


// Simptomi 

var stanje = 0;

function dodajSimptom() {
	vrednost = $('#simptomi').val();

	if (vrednost==5) {
		vrednost1 = "Vročina<37";
        if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
    }
    else if (vrednost==10) {
		vrednost1 = "Rahla slabost";
    	if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==12) {
		vrednost1 = "Kašelj";
        if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==13) {
		vrednost1 = "Zamašen nos";
	    if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==14) {
		vrednost1 = "Boleče grlo";
	    if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==15) {
		vrednost1 = "Vrtoglavica";
    	if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==20) {
		vrednost1 = "Glavobol";
    	if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==30) {
		vrednost1 = "Bruhanje";
	    if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==25) {
		vrednost1 = "Diareja";
	    if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==40) {
		vrednost1 = "Vročina>38";
	    if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==35) {
		vrednost1 = "Povišan pritisk";
	    if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==50) {
		vrednost1 = "Omedlevica";
    	if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
    }
	else if (vrednost==60) {
		vrednost1 = "Tiščanje v prsih";
	    if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	else if (vrednost==65) {
		vrednost1 = "Težko dihanje";
	    if ($('#sporociloNevarnosti:contains("'+vrednost1+'")').length == 0) {
		    stanje = +stanje + +vrednost;		
	    $('#sporociloNevarnosti').append(vrednost1 +'<br>');
        stevecNevarnosti.update(stanje);}
	}
	
    else if (vrednost==999) {
        $('#sporociloNevarnosti').html('');
        stanje = 0;
         stevecNevarnosti.update(0);
    }

if (stanje>=100)     {

	$('#sporociloSmrti').html('KLIČI 112!');
	    pokaziMapo();
	}
	else if (stanje>=80) {
		$('#sporociloSmrti').html('Takoj pojdite v bolišnico!');
        pokaziMapo();	
	}
	else if (stanje>=60) {
		$('#sporociloSmrti').html('Čimprej obiščite zdravnika!');
	}
	else if (stanje>=40) {
		$('#sporociloSmrti').html('Če se stanje poslabša, prosim pokličite zdravnika!');
	}
	else if (stanje>=20) {
		$('#sporociloSmrti').html('Nekaj počitka vam bo dobro delo!');
	}
	else if (stanje>=10){
        $('#sporociloSmrti').html('Z vami je vse vredu, nehajte biti hipohoner!');
	}
	else {
        $('#sporociloSmrti').html('Vse je super!');
	}

}



function pokaziMapo() {
    $('#mapa').removeClass('skrito');
}

var stevecNevarnosti = new RadialProgressChart('#radial', {
  diameter: 150,
  max: 100,
  round: false,
  series: [{
    value: 0,
    color: ['#7CFC00','red']
  }],
  center: function(d) {
    return d.toFixed(0) + ''
  }
});