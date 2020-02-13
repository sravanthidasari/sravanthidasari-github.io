const facilities = [
    {
        type:  'hospitals',
        api: 'xubh-q36u',
        zipFilter: 'zip_code'
    },
    {
        type: 'nursingHome',
        api: '4pq5-n9py',
        zipFilter: 'provider_zip_code'
    },
    {
        type: 'homeHealth',
        api: '6jpm-sxkc',
        zipFilter: 'zip'
    },
    {
        type: 'dialysis',
        api: '23ew-n7w9',
        zipFilter: 'zip'
    }
];

const validateZipCode = () => {
    let zipCodeStr = $('#zipCodeInput').val();
    let zipCodeNum = parseInt(zipCodeStr);
    if (!zipCodeNum || zipCodeNum <= 9999 || zipCodeNum > 99999) {
        alert('Invalid Zip Code. Try Again');
        return false;
    }

    return true;
};

const normalizeItem = (item) => {
    item.name = item.hospital_name || item.provider_name || item.facility_name;
    item.address = item.address || item.provider_address || item.address_line_1;
    item.city = item.city || item.provider_city;
    item.state = item.state || item.provider_state;
    item.zip = item.zip_code || item.provider_zip_code || item.zip;
    item.csz = item.city + ", " + item.state + " - " + item.zip;
    item.phone = item.phone_number || item.provider_phone_number || item.phone;
    item.rating = item.hospital_overall_rating || item.overall_rating || item.quality_of_patient_care_star_rating || 'Not Available';

    return item;
}

const renderItem = (item, colored) => {
    // Normalize item between all types of providers
    item = normalizeItem(item);

    // Build the HTML elements
    const $itemInfo = $("<div>").addClass("itemInfo");
    if(colored === true) {
        $itemInfo.addClass('lightBlue');
    }
    const $name =  $("<div>").addClass("name").text(item.name);
    const $itemAddress = $("<div>").addClass("itemAddress").text(item.address);
    const $csz = $("<div>").addClass("csz").text(item.csz);
    const $phone = $("<div>").addClass("phone").text('Ph:' + item.phone);
    const $rating = $("<div>").addClass("rating").text('Rating: ' + item.rating);

    // Add the HTML elements to an overall div for the item
    $itemInfo.append($name);
    $itemInfo.append($itemAddress);
    $itemInfo.append($csz);
    $itemInfo.append($phone);
    $itemInfo.append($rating);

    // Add the item div to the mid section in the container
    $(".address").append($itemInfo);
}

const renderItems = (items) => {
    $(".address").empty();
    if (items.length === 0) {
        alert('No health care locations found for the given zip code');
        return;
    }

    for (let i=0; i<items.length; i++) {
        let showBackgroundColor = (i % 2 === 0);
        renderItem(items[i], showBackgroundColor);
    }
}

const getAddress = (e) => {
    const $address = $('.address');
    $address.empty();
    const $div = $("<div>").addClass("getAddress").text(zipCodeInpu);
    $address.append($div);
};

const getUrlWithFilter = (id) => {
    const facility = facilities.find(function(f) {
        return f.type === id;
    });

    const zipCodeInput = $("#zipCodeInput").val();
    return `https://data.medicare.gov/resource/${facility.api}.json?${facility.zipFilter}=${zipCodeInput}`;
}

const fetchHospitals = (e) => {
    e.preventDefault();
    if (validateZipCode() !== true){
        return;
    }

    const url = getUrlWithFilter($(e.currentTarget).attr('id'));
    $.ajax({
        url: url,
        success: (data)=> {
            renderItems(data);
        },
        error:()=> {
            console.log('Dude Your Stuff doesnt');
        }
    });
};

const showAboutBox = () => {
    $("div.aboutBox").css('display', 'block');
}

const hideAboutBox = () => {
    $("div.aboutBox").css('display', 'none');
}

$(() => {
    // Attach a handler to toggle the description under about
    $(".about").click(function() {
        showAboutBox();
        // $("#p1").animate({
        //     height: "toggle"
        // });
    });

    $("#closeAboutBox").click(function() {
        hideAboutBox();
    });

    // Attach a handler to fetch the entries based on zip
    $(".info button").on("click", fetchHospitals);
});
