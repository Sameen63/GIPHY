var apiKey = "CDNrQzBioVpb5dWzJFD5olf8uwmpax4i";
var limit = 10;
var rating;
var queryURL = "https://api.giphy.com/v1/gifs/search"
var array = ["Stewi", "Angry", "Bored", "Error", "Minion",
                    "Chicken", "Doll", "Magic", "High", "Kevin Heart"];




function addButton(newData) {
    var buttons = $("<button>");
    buttons.addClass("userButton");
    buttons.addClass("button-style");
    buttons.html(newData);
    $("#button-container").append(buttons);
}





$(document.body).ready(function(){
    
    for (var i = 0; i < array.length; i++) {
        addButton(array[i]);
    }

   

    $("#userSubmit").on("click", function(event) {
        event.preventDefault();
        var gff = $("#userInput").val().trim();
        if ((gff !== "") && (array.indexOf(gff) === -1)) {
            array.push(gff);
            addButton(gff);
        }
        $("#userInput").val('');
    });

    



    $(document.body).on("click", ".userButton", function(event) {

        event.preventDefault();

        queryURL += '?' + $.param({
            'api_key': apiKey,
            'q': event.target.textContent,
            'limit': limit,
            'rating': rating
        });

        

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(result) {

            var resultArray = result.data;
            $("#gif-container").empty();

            for (var i = 0; i < resultArray.length; i++) {
                
                


                var gifCard = $("<div>");
                gifCard.addClass("gif-card");

                var gifCardImg = $("<img>");
                gifCardImg.addClass("gif-card-img");
                gifCardImg.attr("src", resultArray[i].images.fixed_width_still.url);
                gifCardImg.attr("data-still", resultArray[i].images.fixed_width_still.url);
                gifCardImg.attr("data-animate", resultArray[i].images.fixed_width.url);
                gifCardImg.attr("data-state", "still");
                

                var gifCardFooter = $("<p>");
                gifCardFooter.addClass("gif-card-footer");
                gifCardFooter.text("Rating: " + resultArray[i].rating);

                gifCard.append(gifCardImg);
                gifCard.append(gifCardFooter);
                
                $("#gif-container").append(gifCard);
            }

        }).fail(function(err) {
            throw err;
        });

    });

    





    $(document.body).on("click", ".gif-card-img", function(event) {

        if ($(this).attr("data-state") === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

    });

});