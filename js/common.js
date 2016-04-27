var step = $(".step");
	stepBtn = $(".btn-step-next");
	btnNext = $(".btn-next");
	btnPrev = $(".btn-prev");
	btnFinish = $(".btn-finish");
	btnReset = $(".btn-reset");
	sourceDate = {}; 
//view first step
step.eq(0).addClass("active");
stepBtn.eq(0).addClass("active");
//date for form
sourceDate.Step  = function (name, email, country, city, fb, vk, tw, od){
	this.name = name;
	this.email = email;
	this.country = country;
	this.city = city;
	this.fb = fb;
	this.vk = vk;
	this.tw = tw;
	this.od = od;
}

//load list country and cities
getCountries();
getCities();

//choice cat
var imgStep = $(".img_block img");
	imgFormSrc = '';

imgStep.each( function() {
	$(this).click( function(e) {
		e.preventDefault();

		var i = imgStep.index($(this)); //indox of img
			flag = false;

		if (i == 3) {  // index 3 is dog
			imgStep.removeClass("active");
			imgStep.eq(i).addClass("active");
			$(".choice-dog").addClass("noCat");
		} else {
			$(".choice-dog").removeClass("noCat");
			imgStep.removeClass("active");
			imgStep.eq(i).addClass("active");
			imgFormSrc = imgStep.eq(i).attr("src");
			flag = true;
		}

	});
});

var maxStep = 0; //fihish step
//next btn
btnNext.each( function() {
	$(this).click( function(e) {

		maxStep++; //if field added

		var i = btnNext.index($(this));
			ValidationForm = false;
		//check valid form fisrt step
		if (i == 0) {

			var name =  document.getElementById('name');
				email = document.getElementById('email');
				error = document.querySelector('.error');

			if ( name.checkValidity() && email.checkValidity()) {
				ValidationForm = true;
			}

			if (!name.checkValidity()) {
				name.classList.add("invalid");
			} 

			if (!email.checkValidity()) {
				error.innerHTML = "- в адресе должен быть символ @";
				email.classList.add("invalid");
			}
		} 
		//check valid form second step
		if (i == 1) {

			var inputCountry =  document.getElementById('inputCountry');
				inputCity = document.getElementById('inputCity');

			if ( inputCountry.checkValidity() && inputCity.checkValidity()) {
				ValidationForm = true;
			}

			if (!inputCountry.checkValidity()) {
				inputCountry.classList.add("invalid");
			} 

			if (!inputCity.checkValidity()) {
				inputCity.classList.add("invalid");
			}
		}

		if (i == 2) {
			ValidationForm = true;
		}

		if (ValidationForm) {
			sendAjaxForm();
			//delete invalid style
			//first step
			if (i ==0 ) {
				name.classList.remove("invalid");
				error.innerHTML = "";
				email.classList.remove("invalid");
			}
			//second step
			if (i == 1) {
				inputCountry.classList.remove("invalid");
				inputCity.classList.remove("invalid");
			}

			step.eq(i).removeClass("active");
			stepBtn.eq(i).addClass("finished");

			i++; //add class style f onext btn

			step.removeClass("active");
			step.eq(i).addClass("active");
			stepBtn.removeClass("active");
			stepBtn.eq(i).addClass("finished");
			stepBtn.eq(i).addClass("active");

			if (i == 3) {
				stepBtn.eq(i).addClass("finished");
			}

		}
		
	});
});
//back btn
btnPrev.each( function() {
	$(this).click( function(e) {
		e.preventDefault();

		var i = btnPrev.index($(this));

		if (i != 0) {
			step.removeClass("active");
		}
		
		i = i-1;

		if (i >= 0) {
			step.removeClass("active");
			step.eq(i).addClass("active");
			stepBtn.removeClass("active");
			stepBtn.eq(i).addClass("active");
		}
		
	});
});
//high navigation
stepBtn.each( function() {
	$(this).click( function(e) {
		e.preventDefault();

		var i = stepBtn.index($(this));

		if (i <= maxStep) {
			step.removeClass("active");
			step.eq(i).addClass("active");
			stepBtn.removeClass("active");
			stepBtn.eq(i).addClass("active");
		}

	});
});

btnFinish.click(function(e){
	e.preventDefault();

	if (flag) {
		sourceDate.img = imgFormSrc;
		showResult(sourceDate);
		$(".form-steps").addClass("hide-block");
		$(".show-result").addClass("show-active");
	}
});

btnReset.click(function(e){
	e.preventDefault();

	step.removeClass("active");
	stepBtn.removeClass("active");
	stepBtn.removeClass("finished");
	step.eq(0).addClass("active");
	stepBtn.eq(0).addClass("active");

	maxStep = 0; //fihish step
	//delete field for form
	$("input","#form")
		.val("")
		.removeAttr("checked")
		.removeAttr("selected");

	imgStep.removeClass("active");
	//delete date form
	sourceDate.Step("", "", "", "", "", "", "", "");
	sourceDate.img= "";
	//delete sicial date
	$(".fb").text("");
	$(".fb").parent().removeClass("show-social");
	$(".vk").text("");
	$(".vk").parent().removeClass("show-social");
	$(".tw").text("");
	$(".tw").parent().removeClass("show-social");
	$(".od").text("");
	$(".od").parent().removeClass("show-social");
	$(".form-steps").removeClass("hide-block");
	$(".show-result").removeClass("show-active");

});

function sendAjaxForm(url) {
    jQuery.ajax({
        url: "form.php", //url (form.php)
        type: "POST", 
        dataType: "html", 
        data: jQuery("#form").serialize(), 
        success: function(response) { 
        	result = jQuery.parseJSON(response);
        	sourceDate.Step(result.name, result.email, result.country, result.city, result.fb, result.vk, result.tw, result.od);
    	},
    	error: function(response) { 
    	}
 	});
}

function getCountries() {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'date/countries.json'); //Load from date/countries.json by XMLHttpRequest

	xhr.onload = function(evt) {

		var countries = JSON.parse(evt.srcElement.response);

		showCountries(countries);

	}

	xhr.send();
	
}

function showCountries(countries) {

	var listCountries = document.getElementById("country");

	for (var k in countries) {

		var option = document.createElement('option');

		listCountries.appendChild(option);
		option.value = countries[k];
		var temp = "country-";
		option.classList.add(temp + k);
	}		

}

function getCities() {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'date/cities.json'); ////Load from date/cities.json by XMLHttpRequest

	xhr.onload = function(evt) {

		var cities = JSON.parse(evt.srcElement.response);

		showCities(cities);

	}

	xhr.send();
	
}

function showCities(cities) {

	var listCities = document.getElementById("city");

	for (var k in cities) {

		var option = document.createElement('option');

		listCities.appendChild(option);
		option.value = cities[k].name;
	}
		

}
//write date to show-result
function showResult(date) {
	$(".name").text(date.name);
	$(".email").text(date.email);
	$(".city").text(date.city);
	$(".country").text(date.country);

	if (date.fb != '') {
		$(".fb").parent().addClass("show-social");
		$(".fb").text(date.fb);
	}

	if (date.vk != '') {
		$(".vk").parent().addClass("show-social");
		$(".vk").text(date.vk);
	}

	if (date.tw != '') {
		$(".tw").parent().addClass("show-social");
		$(".tw").text(date.tw);
	}

	if (date.od != '') {
		$(".od").parent().addClass("show-social");
		$(".od").text(date.od);
	}

	$(".form-result img").attr("src", date.img);
}
