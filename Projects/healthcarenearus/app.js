// console.log("hello");

const getAddress= (e) => {
    e.preventDefault();
    const $address = $('.address');
    $address.empty();
    const $div = $("<div>").addClass("getAddress").text("18264 NE 111th ST, Redmond, WA-98052");
    $address.append($div);
};

$(() => {
    $(".info button").on("click", getAddress);
});
