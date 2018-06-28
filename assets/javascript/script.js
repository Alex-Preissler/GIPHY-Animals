var btnArray = ["Tiger", "Lion", "Zebra", "Dog" , "Cat"];
var toggle = null;
var initialize = true;

function buildQueryURL(animal) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?";

    var queryParams = {"api_key": "cJWlOjpnw548rEk8HX02x0zkDME4Bovy"};

    queryParams.q = animal;
      
    queryParams.limit = "10";

    queryParams.offset = "0"

    queryParams.rating = "pg";

    queryParams.lang = "en";
    

    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    
    return queryURL + $.param(queryParams);

}

function ajaxCall(animal) {

    var queryURL = buildQueryURL(animal);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(displayGifs);

}

function displayGifs(gif) {


    var gifData = gif.data;

    var arrayLength = gif.data.length;

    $("#gif-drop").empty();

    for(var i = 0; i<arrayLength; i++) {

        
        var gifData = gif.data[i];
        var gifDiv = $("<div id='display-div'>");
        var gifImage = $("<img>");
        var gifRating = $("<p>");
        var upperCaseRating = gifData.rating.toUpperCase();

        gifRating.text("Rating: " + upperCaseRating);
        
        gifImage.attr("src", gifData.images.fixed_width_still.url);
        gifImage.attr("animatedURL", gifData.images.fixed_width.url);
        gifImage.attr("stillURL", gifData.images.fixed_width_still.url);
        gifImage.attr("state", "still");
        gifImage.attr("id", "gifs");


        gifDiv.append(gifRating);
        gifDiv.append(gifImage);
       // gifRating.append(gifImage);
        $("#gif-drop").append(gifDiv);
      

    }

}

$(document).on("click", "#gifs", function() {

    var animatedURL = $(this).attr("animatedURL");
    var stillURL = $(this).attr("stillURL");
    var state = $(this).attr("state");
    console.log(animatedURL);
    console.log(stillURL);
    console.log(state);


    if(state === "still") {

        console.log("still to animated");

        $(this).attr("src", animatedURL);
        $(this).attr("state", "animated");

    }else{

        console.log("animated to still");

        $(this).attr("src", stillURL);
        $(this).attr("state", "still");

    }


});

$(document).on("click", ".animal-buttons", function() {

    if(toggle != null){

       $(toggle).removeClass("active");
       $(toggle).css("background-color", "");

    }

    var animal = this.value;
    toggle = "#" + this.id;

    $(toggle).css("background-color", "black");

    console.log(toggle);

    ajaxCall(animal);


});



$("#add-button").on("click", function(event) {

    event.preventDefault();

    var animal = $("#animal").val().trim();

    if(animal != ""){

    $("#animal").val("");


    ajaxCall(animal);
    displayButtons(animal);

    }else{}


});

function displayButtons(animal) {

    if(animal) {

        btnArray[btnArray.length] = animal;

    }

    (btnArray);

    $("#btn-drop").empty();

    for(var i=0; i<btnArray.length; i++) {

        var button = $("<button>");

        button.addClass("btn btn-md btn-outline-dark animal-buttons");

        button.attr("data-toggle", "button");

        button.attr("value", btnArray[i]);

        button.attr("id", "button-" + i);

        toggle = button.id;

        button.text(btnArray[i]);

        if(i == (btnArray.length - 1) && initialize == false) {

            button.addClass("active");
            button.css("background-color", "black");
            toggle = "#" + button.attr("id");

            

        }

        $("#btn-drop").append(button);

    }

    initialize = false;

}

$(document).ready(function() {

    displayButtons();


});

$("#clear-all").on("click", function() {

   $("#gif-drop").empty();


});
