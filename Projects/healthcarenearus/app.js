const validateZipCode= () =>{
    let zipCodeStr = $('#zipCodeInput').val();
    let zipCodeNum = parseInt(zipCodeStr);
    if (!zipCodeNum || zipCodeNum <= 9999 || zipCodeNum > 99999) {
        alert('Invalid Zip Code. Try Again');
    } else {
        if(validateZipCode != true){
            return ;
        }
    }
};

const getAddress = (e) => {
    e.preventDefault();
    validateZipCode();
    if(validateZipCode != true){
        return;
    }
    const zipCodeInput = $("#zipCodeInput").val();
    const $address = $('.address');
    $address.empty();
    const $div = $("<div>").addClass("getAddress").text(zipCodeInput);
    $address.append($div);
};

$(() => {
    // Attach a handler to toggle the description under about
    $(".about").click(function() {
        $("#p1").animate({
            height: "toggle"
        });
    });
    
    // Attach a handler to fetch the entries based on zip
    $(".info button").on("click", getAddress);


});

// TODO: Move this to the right place
$.ajax({
    url:'https://data.medicare.gov/resource/xubh-q36u.json?zip_code=98101',
    success: (data)=> {
        console.log(data);
    },
    error:()=> {
        console.log('Dude Your Stuff doesnt');
    }
})
