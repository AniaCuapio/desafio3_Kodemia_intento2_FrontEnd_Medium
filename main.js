//Función para el scroll horizontal de la nav bar
$('#toRight').click(function () {
    var position = $('.wrapper_items').scrollLeft();
    $(".wrapper_items").animate({
        scrollLeft: position + 110
    }, 400);
})
$('#toLeft').click(function () {
    var position = $('.wrapper_items').scrollLeft();
    $(".wrapper_items").animate({
        scrollLeft: position - 110
    }, 400);
})


//  Esta funcion dibuja el html alternativo
const loadPage = (selector, url, callback) => {
    //  alert("prueba de botón")
    $(selector).load(url, callback)
}

//  Hacer el objeto post
const handleSaveListener = () => {
    // $("#wrapper-main-navbar").addClass(".d-none")
    // $("#wrapper-format-navbar").removeClass(".d-none")
    $("#save-btn").click(function (e) {
        e.preventDefault();
        alert("prueba de botón guardar")
        let title = $("#input-title").val()
        let text = $("#input-text").val()
        let author = $("#input-author").val()
        let imgUrl = $("#input-img").val()
        let section = $("input[name ='section']:checked").val()
        //log(section)
        let postObject = { title, text, author, imgUrl, section }
        postData(postObject)
        location.reload();
    });
}

// Esta función guarda el objeto post en la DB
const postData = (object) => {
    let milisegundos = date.getTime();
    object = { ...object, milisegundos }
    log(object)
    $.ajax({
        url: "https://ajaxclass-1ca34.firebaseio.com/medium-team2/.json",
        method: "POST",
        data: JSON.stringify(object),
        success: (response) => {
            log(response);
        }
    })
}
