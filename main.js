let log = console.log

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
        //alert("prueba de botón guardar")
        let title = $("#input-title").val()
        let text = $("#input-text").val()
        let author = $("#input-author").val()
        let imgUrl = $("#input-img").val()
        let section = $("input[name ='section']:checked").val()
        //log(section)
        let postObject = { title, text, author, imgUrl, section }
        postData(postObject)
        getPostsFromDb()
        printAllPosts()
        location.reload();
    });
}

// Esta función guarda el objeto post en la DB
const postData = (object) => {
    let createdAt = new Date();
    //console.log(createdAt)
    let readableDate = createdAt.toDateString().slice(4)
    console.log(readableDate)
    object = { ...object,readableDate }
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


var postsToRender = [];

const getPostsFromDb = () => {
    $.ajax({
        url: "https://ajaxclass-1ca34.firebaseio.com/medium-team2/.json",
        success: function (response) {
            $.each(response, (key, value) => {
                // log('key: ', key)
                // log('post value: ', value)
                postsToRender.unshift({ ...value, id: key });
                // let { id, imgUrl, title, text, author, section, createdAt } = value
                log(value)
            })
            //renderPosts(postsToRender)
        },
        method: "GET",
        async: false
    });
};

getPostsFromDb()

log(postsToRender)

let arrayPopularSection = []
let arrayRecentSection = []

const filterPosts = (array) => {
    log("prueba de función de dibujar")
    log(array)
    array.forEach(post => {
        log(post.section)
        if (post.section === "popular") {
            arrayPopularSection.push(post)
        }
        else if (post.section === "recent") {
            arrayRecentSection.push(post)
        }
    });
}

filterPosts(postsToRender)

log("array recent:", arrayRecentSection)
log("array popular:", arrayPopularSection)
let arrayTotals = arrayPopularSection.concat(arrayRecentSection)
log("array totals:", arrayTotals)


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let randomNumber = getRandomInt(20)

const printFirstPost = () => {
    let firstPost = arrayRecentSection[0]
    log(firstPost)
    let { title, imgUrl, author, readableDate, id, text } = firstPost
    let postLeft =
        `<div class="card-mb-3">
                <div class="row no-gutters d-flex">                
                    <div class="col-mb-4">
                        <img class="imageess"
                            src="${imgUrl}"
                            alt="atardecer">
                    </div>
                    <div class="col-8 ml-4">
                        <div class="textos">
                        <span type="button" data-id="${id}" class="detele-btn float-right text-muted" aria-hidden="true">&times;</span>
                            <p class="card-title font-weight-bold"data-toggle="modal" data-target="#exampleModal-${id}">${title}</p>
                            <p class="text-card"data-toggle="popover3" data-placement="top" data-description="${text.slice(0, 80)}">${text.slice(0, 80)}
                            </p>
                        </div>
                        <div class="row">
                            <div class="col-9 p-0">
                                <a class="text-dark user ml-3 author-tex" href="#" data-toggle="popover" data-placement="top" data-author="${author}" data-age="">${author}</a>
                                <span class="text-dark user author-tex">in LEVEL</span>
                                <a class="text-dark user" href="#"data-toggle="popover2" data-placement="top" data-category=""></a>
                                <br>
                                <time class=" text-muted user ml-3"><small>${readableDate}</small></time><span class="text-muted small"data-toggle="tooltip" data-placement="top" title= " ${getRandomInt(20)} min read">
                                <svg data-toggle="tooltip"  data-placement="top" title= "Updated ${readableDate}" class="bi bi-dot text-muted user ml-3" width="1rem" height="1rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg> ${getRandomInt(20)} min
                                    read </span><span><svg class="bi bi-star-fill text-muted" width="0.8rem" height="0.8rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><small class="text-muted">★<small></span>
                            </div>
                            <div class="col-3 p-0 d-flex justify-content-end">
                            <svg class="bi bi-bookmark d-md-none text-muted" width="1rem" height="1rem" alt="guardar"data-toggle="tooltip" data-placement="bottom" title="Guardar" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z"/>
                            </svg>
                                <svg class="bi bi-three-dots mr-2 menu text-muted" width="1rem" height="1rem"  alt="dotts"data-toggle="popoverdott" data-placement="bottom" data-menu="" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                              </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="exampleModal-${id}" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <!-- Just an image -->
                            <nav class="navbar navbar-light">
                                <a class="navbar-brand" href="#">
                                    <div>
                                        <img src="https://miro.medium.com/max/195/1*emiGsBgJu2KHWyjluhKXQw.png" width="30"
                                            height="30" alt="" loading="lazy">
                                    </div>
                                </a>
                            </nav>
                        </div>
                        <div class="modal-body">
                            <div class="row d-flex align-items-center">
                                <div class=" col-12 col-md-3">
                                    <div class="card border-0 ">
                                        <div class="card-body">
                                            <h6 class="card-title font-weight-bolder mb-0">Human Parts</h6>
                                            <p class="text-muted mb-0 "><small>A Medium </small></p>
                                            <p class="text-muted mb-0"><small>publication about </small></p>
                                            <p class="text-muted mb-0"><small>humanity: yours,</small></p>
                                            <p class="text-muted mb-2"><small>mine, and ours</small></p>
                                            <p><small class="border border-danger rounded-lg w-2 text-danger p-2 ml-0 "> Follow
                                                </small></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="card border-0">
                                        <div class="card-body pl-0">
                                            <p class="card-subtitle mb-2 text-muted">PAST IS PROLOGUE</p6>
                                            <h5 class="card-title">${title}</h5>
                                            <p class="card-text text-muted">${text.slice(0, 50)}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-md-8">
                                            <div class="card mb-5 border-0" style="max-width: 200px;">
                                                <div class="row no-gutters">
                                                    <div class="col-md-4">
                                                        <img src="${imgUrl}"
                                                            class="card-img rounded-circle" alt="..."
                                                            style="width:50px; height:50px;">
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="card-body p-0">
                                                            <p class="card-text mb-0"><small>${author}</small> 
                                                            <p class="card-text">${readableDate}· ${getRandomInt(20)} min read ★ </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4 mt-3">
                                        <span><i class="fab fa-twitter"></i></span>
                                        <span><i class="fab fa-linkedin-in"></i></span>
                                        <span><i class="fab fa-facebook-square"></i></span>
                                        <span><svg class="bi bi-bookmark" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z" />
                                            </svg></span>
                                            <span> <svg class="bi bi-three-dots" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                          </svg></span>
                                        </div>
                                    </div>
                                    <div class="card border-0">
                                        <img src="${imgUrl}"
                                            class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <p class="card-text">${text}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class=" col-12 col-md-3">
                                    <div class="card border-0">
                                        <div class="card-body">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`
    $('#left-card-container').append(postLeft)
}


const printMiddlePosts = (array) => {
    for (let index = 1; index < 4; index++) {
        let post = array[index];
        log(post)
        let { title, imgUrl, author, readableDate, id, text } = post
        let postCard =
            `<div id="second-card" class="card mb-3 border-0">
                <div class="row no-gutters d-flex align-items-center  flex-row-reverse flex-md-row">
                    <div class="col-4">
                    <div class="img-m-p"><img src="${imgUrl}" class="card-img"  alt="">
                    </div>
                    </div>
                    <div class="col-8">
                        <div class="card-body pr-0 pt-0 pb-0">
                        <span type="button" data-id="${id}" class="detele-btn float-right text-muted" aria-hidden="true">&times;</span>
                            <h4 class="card-title2 font-weight-bold mb-0 " data-toggle="modal" data-target="#exampleModal-${id}">${title.slice(0,18)}</h4>
                            <div class="btn-group2 d-flex align-items-center justify-content-between">
                                <div>
                                    <a class="text-dark user author-tex" href="#" data-toggle="popover" data-placement="top" data-author="${author} "data-age="<small>${getRandomInt(20)}</small>" >${author}</a>
                                    <span class="text-dark user author-tex mb-0">in LEVEL</span>
                                    <a class="text-dark user" href="https://medium.com/" data-toggle="popover2" data-placement="top" data-category=""></a>
                                    <br>
                                    
                                    <time class="text-muted user" data-toggle="tooltip" data-placement="top" title="Updated ${readableDate}"><small>${readableDate}</small></time> <span class="text-muted user"data-toggle="tooltip" data-placement="bottom" title= "${getRandomInt(20)} min read"alt="" > &bull; <small>${getRandomInt(20)} min read</small> </span><span class="text-muted user" > <small>★<small> </span>
                                </div>
                                <div>
                                <svg class="bi bi-bookmark d-md-none text-muted" width="1rem" height="1rem" alt="guardar"data-toggle="tooltip" data-placement="bottom" title="Guardar" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z"/>
                            </svg> 
                            <svg class="bi bi-three-dots mr-2 menu text-muted" width="1rem" height="1rem"  alt="dotts"data-toggle="popoverdott" data-placement="bottom" data-menu="" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                            </svg>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div id="exampleModal-${id}" class="modal" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <!-- Just an image -->
                                <nav class="navbar navbar-light">
                                    <a class="navbar-brand" href="#">
                                        <div>
                                            <img src="https://miro.medium.com/max/195/1*emiGsBgJu2KHWyjluhKXQw.png" width="30"
                                                height="30" alt="" loading="lazy">
                                        </div>
                                    </a>
                                </nav>
                            </div>
                            <div class="modal-body">
                                <div class="row d-flex align-items-center">
                                    <div class=" col-12 col-md-3">
                                        <div class="card border-0 ">
                                            <div class="card-body">
                                                <h6 class="card-title font-weight-bolder mb-0">Human Parts</h6>
                                                <p class="text-muted mb-0 "><small>A Medium </small></p>
                                                <p class="text-muted mb-0"><small>publication about </small></p>
                                                <p class="text-muted mb-0"><small>humanity: yours,</small></p>
                                                <p class="text-muted mb-2"><small>mine, and ours</small></p>
                                                <p><small class="border border-danger rounded-lg w-2 text-danger p-2 ml-0 "> Follow
                                                    </small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <div class="card border-0">
                                            <div class="card-body pl-0">
                                                <p class="card-subtitle mb-2 text-muted">PAST IS PROLOGUE</p6>
                                                <h5 class="card-title">${title}</h5>
                                                <p class="card-text text-muted">${text.slice(0, 50)}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-8">
                                                <div class="card mb-5 border-0" style="max-width: 200px;">
                                                    <div class="row no-gutters">
                                                        <div class="col-md-4">
                                                            <img src="${imgUrl}"
                                                                class="card-img rounded-circle" alt="..."
                                                                style="width:50px; height:50px;">
                                                        </div>
                                                        <div class="col-md-8">
                                                            <div class="card-body p-0">
                                                                <p class="card-text mb-0"><small>${author}</small> 
                                                                <small class="border border-danger rounded-lg w-2 text-danger p-1 ml-3">
                                                                        Follow </small></p>
                                                                <p class="card-text"><small>${readableDate}· ${getRandomInt(20)} min read ★</small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-4 mt-3">
                                            <span><i class="fab fa-twitter"></i></span>
                                            <span><i class="fab fa-linkedin-in"></i></span>
                                            <span><i class="fab fa-facebook-square"></i></span>
                                            <span><svg class="bi bi-bookmark" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z" />
                                                </svg></span>
                                                <span> <svg class="bi bi-three-dots" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                              </svg></span>
                                            </div>
                                        </div>
                                        <div class="card border-0">
                                            <img src="${imgUrl}"
                                                class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <p class="card-text">${text}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" col-12 col-md-3">
                                        <div class="card border-0">
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div> `
        $("#center-cards-container").append(postCard)
    }
}

const printRightPost = (array) => {
    // alert("funciona print Right Post")
    let rightPost = array[4]
    log("right post:", rightPost)
    let { title, imgUrl, author, readableDate, id, text } = rightPost
    let rightPostCard = `<div class="card-mb-3">
    <div class="row no-gutters">
        <div class="col-mb-4">
            <img class="imageess2"
                src="${imgUrl}"
                alt="atardecer 2">
        </div>
        <div class="col-md-8 ml-4">
            <div class="textos">
            <span type="button" data-id="${id}" class="detele-btn float-right text-muted" aria-hidden="true">&times;</span>
                <p class="card-title font-weight-bold"data-toggle="modal" data-target="#exampleModal-${id}">${title}</p>
                <p class="text-card"data-toggle="popover3" data-placement="top" data-description="${text.slice(0, 80)} ">${text.slice(0, 80)}</p>
            </div>
            <a class="text-dark user author-tex" href="#" data-toggle="popover" data-placement="top" data-author="${author}" data-age="${getRandomInt(20)}">${author}</a><span
                class="text-dark small author-tex">
                in LEVEL</span>
            <a class="text-dark user author-tex" href="#"data-toggle="popover2" data-placement="top" data-category="">News</a>
            <br><time class="text-muted user" data-toggle="tooltip" data-placement="top" title= "Updated ${readableDate} "><small>${readableDate}</small></time><span
                class="text-muted small"data-toggle="tooltip" data-placement="bottom" title= "${getRandomInt(20)} min read"> <span>&bull;</span> <small>${getRandomInt(20)}</small> min
                read </span><span class="text-muted"> <small>★<small> </span>
            <div class="btn-group">
            <svg class="bi bi-bookmark d-md-none text-muted" width="1rem" height="1rem" alt="guardar"data-toggle="tooltip" data-placement="bottom" title="Guardar" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z"/>
            </svg> 
            <svg class="bi bi-three-dots mr-2 menu text-muted" width="1rem" height="1rem"  alt="dotts"data-toggle="popoverdott" data-placement="bottom" data-menu="" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg></div>
        </div>
    </div>
</div>
<div id="exampleModal-${id}" class="modal" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <!-- Just an image -->
                                <nav class="navbar navbar-light">
                                    <a class="navbar-brand" href="#">
                                        <div>
                                            <img src="https://miro.medium.com/max/195/1*emiGsBgJu2KHWyjluhKXQw.png" width="30"
                                                height="30" alt="" loading="lazy">
                                        </div>
                                    </a>
                                </nav>
                            </div>
                            <div class="modal-body">
                                <div class="row d-flex align-items-center">
                                    <div class=" col-12 col-md-3">
                                        <div class="card border-0 ">
                                            <div class="card-body">
                                                <h6 class="card-title font-weight-bolder mb-0">Human Parts</h6>
                                                <p class="text-muted mb-0 "><small>A Medium </small></p>
                                                <p class="text-muted mb-0"><small>publication about </small></p>
                                                <p class="text-muted mb-0"><small>humanity: yours,</small></p>
                                                <p class="text-muted mb-2"><small>mine, and ours</small></p>
                                                <p><small class="border border-danger rounded-lg w-2 text-danger p-2 ml-0 "> Follow
                                                    </small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <div class="card border-0">
                                            <div class="card-body pl-0">
                                                <p class="card-subtitle mb-2 text-muted">PAST IS PROLOGUE</p6>
                                                <h5 class="card-title">${title}</h5>
                                                <p class="card-text text-muted">${text.slice(0, 50)}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 col-md-8">
                                                <div class="card mb-5 border-0" style="max-width: 200px;">
                                                    <div class="row no-gutters">
                                                        <div class="col-md-4">
                                                            <img src="${imgUrl}"
                                                                class="card-img rounded-circle" alt="..."
                                                                style="width:50px; height:50px;">
                                                        </div>
                                                        <div class="col-md-8">
                                                            <div class="card-body p-0">
                                                                <p class="card-text mb-0"><small>${author}</small> <small
                                                                        class="border border-danger rounded-lg w-2 text-danger p-1 ml-3">
                                                                        Follow </small></p>
                                                                <p class="card-text"><small>${readableDate}· ${getRandomInt(20)} min read ★</small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-4 mt-3">
                                            <span><i class="fab fa-twitter"></i></span>
                                            <span><i class="fab fa-linkedin-in"></i></span>
                                            <span><i class="fab fa-facebook-square"></i></span>
                                            <span><svg class="bi bi-bookmark" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z" />
                                                </svg></span>
                                                <span> <svg class="bi bi-three-dots" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                              </svg></span>
                                            </div>
                                        </div>
                                        <div class="card border-0">
                                            <img src="${imgUrl}"
                                                class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <p class="card-text">${text}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" col-12 col-md-3">
                                        <div class="card border-0">
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div> `
    $("#right-card-container").append(rightPostCard)
}

const printCardInfinitIzquierda = (array) => {
    array.forEach(post => {
        let { title, text, author, readableDate, imgUrl, id } = post
        let infinitScroll = `
    <div id="second-card" class="card mb-5 border-0 pr-2">
        <div class="row no-gutters d-flex align-items-center  flex-row-reverse ">
            <div class="col-4">
            <div class="img-m-p"><img src="${imgUrl}" class="card-img2 ml-3 float-right"  alt="">
            </div>
            </div>
            <div class="col-8">
                <div class="card-body pr-5 pt-0 pt-0">
                <span type="button" data-id="${id}" class="detele-btn float-right text-muted" aria-hidden="true">&times;</span>
                    <h3 class="card-title3 font-weight-bold" data-toggle="modal" data-target="#exampleModal-${id}">${title.slice(0,50)}</h3>
                    <div class="btn-group2 d-flex align-items-center justify-content-between">
                        <div>
                            <a class="text-dark user author-tex" href="#" data-toggle="popover" data-placement="top" data-author="${author} "data-age="<small>${getRandomInt(20)}</small>" >${author}</a>
                            <span class="text-dark user author-tex mb-0">in LEVEL</span>
                            <a class="text-dark user" href="https://medium.com/" data-toggle="popover2" data-placement="top" data-category=""></a>
                            <br>
                            
                            <time class="text-muted user" data-toggle="tooltip" data-placement="top" title="Updated ${readableDate}"><small>${readableDate}</small></time> <span class="text-muted user"data-toggle="tooltip" data-placement="bottom" title= "${getRandomInt(20)} min read"alt="" > &bull; <small>${getRandomInt(20)} min read</small> </span><span class="text-muted user" > <small>★<small> </span>
                        </div>
                        <div>
                        <svg class="bi bi-bookmark d-md-none text-muted" width="1rem" height="1rem" alt="guardar"data-toggle="tooltip" data-placement="bottom" title="Guardar" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z"/>
                    </svg> 
                    <svg class="bi bi-three-dots mr-2 menu text-muted" width="1rem" height="1rem"  alt="dotts"data-toggle="popoverdott" data-placement="bottom" data-menu="" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                    </div>
                    </div>
                </div>
            </div>
       </div>
    </div>   
    <div id="exampleModal-${id}" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <!-- Just an image -->
                <nav class="navbar navbar-light">
                    <a class="navbar-brand" href="#">
                        <div>
                            <img src="https://miro.medium.com/max/195/1*emiGsBgJu2KHWyjluhKXQw.png" width="30"
                                height="30" alt="" loading="lazy">
                        </div>
                    </a>
                </nav>
            </div>
            <div class="modal-body">
                <div class="row d-flex align-items-center">
                    <div class=" col-12 col-md-3">
                        <div class="card border-0 ">
                            <div class="card-body">
                                <h6 class="card-title font-weight-bolder mb-0">Human Parts</h6>
                                <p class="text-muted mb-0 "><small>A Medium </small></p>
                                <p class="text-muted mb-0"><small>publication about </small></p>
                                <p class="text-muted mb-0"><small>humanity: yours,</small></p>
                                <p class="text-muted mb-2"><small>mine, and ours</small></p>
                                <p><small class="border border-danger rounded-lg w-2 text-danger p-2 ml-0 "> Follow
                                    </small></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card border-0">
                            <div class="card-body pl-0">
                                <p class="card-subtitle mb-2 text-muted">PAST IS PROLOGUE</p6>
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text text-muted">${text.slice(0, 50)}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <div class="card mb-5 border-0" style="max-width: 200px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="${imgUrl}"
                                                class="card-img rounded-circle" alt="..."
                                                style="width:50px; height:50px;">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body p-0">
                                                <p class="card-text mb-0"><small>${author}</small> <small
                                                        class="border border-danger rounded-lg w-2 text-danger p-1 ml-3">
                                                        Follow </small></p>
                                                <p class="card-text"><small>${readableDate}· ${getRandomInt(20)} min read ★</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mt-3">
                            <span><i class="fab fa-twitter"></i></span>
                            <span><i class="fab fa-linkedin-in"></i></span>
                            <span><i class="fab fa-facebook-square"></i></span>
                            <span><svg class="bi bi-bookmark" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z" />
                                </svg></span>
                                <span> <svg class="bi bi-three-dots" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                              </svg></span>
                            </div>
                        </div>
                        <div class="card border-0">
                            <img src="${imgUrl}"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${text}</p>
                            </div>
                        </div>
                    </div>
                    <div class=" col-12 col-md-3">
                        <div class="card border-0">
                            <div class="card-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
    `
        $("#infinitoScroll").append(infinitScroll)
    })
}

const printPopularPosts = (array) => {
    let popularCounter = 0
    for (let i = 0; i < 4; i++) {
        let post = array[i];
        let { title, author, readableDate, text, imgUrl, id } = post
        let postCard2 =
            `<li class="mb-5">
                <div class="col-3 col-md-4 p-0">
                    <h2 class="text-muted text-right">0${popularCounter + 1}</h2>
                </div>
                <div class="col-9 col-md-8">
                <span type="button" data-id="${id}" class="detele-btn float-right text-muted" aria-hidden="true">&times;</span>
                    <h6 class="textA" data-toggle="modal" data-target="#exampleModal-${id}">${title.slice(0,18)}</h6>
                    <div>
                    <span><a class="text-dark user" href="#"data-toggle="popover" data-placement="top" data-author="${author}" data-age="${getRandomInt(20)}">${author}</a>
                    </span> In <span><a class="text-dark user" href="#"data-toggle="popover2" data-placement="top" data-category="">News</a></span>
                    <br><time class=" text-muted user" data-toggle="tooltip" data-placement="top" title="Updated ${readableDate}">${readableDate}</time>
<span class="text-muted user"data-toggle="tooltip" data-placement="bottom" title="${getRandomInt(20)} min read">

<span width="6px" alt=""> &bull; ${getRandomInt(20)} min read ★</span>
<span class="text-muted"> </span>
</div>
    </div>
    </li>
    <div id="exampleModal-${id}" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <!-- Just an image -->
                <nav class="navbar navbar-light">
                    <a class="navbar-brand" href="#">
                        <div>
                            <img src="https://miro.medium.com/max/195/1*emiGsBgJu2KHWyjluhKXQw.png" width="30"
                                height="30" alt="" loading="lazy">
                        </div>
                    </a>
                </nav>
            </div>
            <div class="modal-body">
                <div class="row d-flex align-items-center">
                    <div class=" col-12 col-md-3">
                        <div class="card border-0 ">
                            <div class="card-body">
                                <h6 class="card-title font-weight-bolder mb-0">Human Parts</h6>
                                <p class="text-muted mb-0 "><small>A Medium </small></p>
                                <p class="text-muted mb-0"><small>publication about </small></p>
                                <p class="text-muted mb-0"><small>humanity: yours,</small></p>
                                <p class="text-muted mb-2"><small>mine, and ours</small></p>
                                <p><small class="border border-danger rounded-lg w-2 text-danger p-2 ml-0 "> Follow
                                    </small></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card border-0">
                            <div class="card-body pl-0">
                                <p class="card-subtitle mb-2 text-muted">PAST IS PROLOGUE</p6>
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text text-muted">${text.slice(0, 50)}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <div class="card mb-5 border-0" style="max-width: 200px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="${imgUrl}"
                                                class="card-img rounded-circle" alt="..."
                                                style="width:50px; height:50px;">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body p-0">
                                                <p class="card-text mb-0"><small>${author}</small> <small
                                                        class="border border-danger rounded-lg w-2 text-danger p-1 ml-3">
                                                        Follow </small></p>
                                                <p class="card-text"><small>${readableDate}· ${getRandomInt(20)} min read ★</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mt-3">
                            <span><i class="fab fa-twitter"></i></span>
                            <span><i class="fab fa-linkedin-in"></i></span>
                            <span><i class="fab fa-facebook-square"></i></span>
                            <span><svg class="bi bi-bookmark" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z" />
                                </svg></span>
                                <span> <svg class="bi bi-three-dots" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                              </svg></span>
                            </div>
                        </div>
                        <div class="card border-0">
                            <img src="${imgUrl}"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${text}</p>
                            </div>
                        </div>
                    </div>
                    <div class=" col-12 col-md-3">
                        <div class="card border-0">
                            <div class="card-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`
        $("#container-popular").append(postCard2)
        popularCounter++
    }

}

window.addEventListener("scroll", (event) => {
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 400) {
        printCardInfinitIzquierda(arrayTotals)

    }
})

const deletePost = (e) => {
    e.stopPropagation();
    console.log(e.target)
    let id = e.target.getAttribute("data-id")
    console.log(id)
    deletePostDB(id)
    getPostsFromDb()
    location.reload()
    //alert("prueba de borrar")
}


const deletePostDB = (PostId) => {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText)
            console.log(response)
        }
    }
    xhttp.open("DELETE", `https://ajaxclass-1ca34.firebaseio.com/medium-team2/${PostId}.json`, true)
    xhttp.send()
    console.log("post borrado")
}

const printAllPosts = () => {
    printRightPost(arrayRecentSection)
    printFirstPost()
    printMiddlePosts(arrayRecentSection)
    printPopularPosts(arrayPopularSection)
    printCardInfinitIzquierda(arrayTotals)
    $(".detele-btn").click(deletePost)
}

printAllPosts()

window.addEventListener("scroll", (event) => {
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 400) {
        getPostsFromDb()
        printCardInfinitIzquierda(arrayTotals)
    }
})
$('[data-toggle="popover"]').popover({
    container: "body",
    trigger: "hover",
    html: true,
    content: function () {
        const author = $(this).data("author")
        const age = $(this).data("age")
        const imgUrl = $(this).data("imgUrl")
        console.log(author)
        return `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${author}</h5>
          <hr>
          <h6 class="card-subtitle mb-2 text-muted">Medium member since 1983 </h6>
          <hr>
            <div><img id="logo-m-P" src="data:image/png;base64,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">
            </div>
            <div><img id="logo-m-P2" src="https://vignette.wikia.nocookie.net/unchartedpedia/images/1/1c/Nathan_Uncharted_4.png/revision/latest?cb=20200410030558&path-prefix=es">
            </div>
          <p class="card-text">Developer, accidental wordsmith. OneZero columnist trying to debug the why behind tech.</p>
        </div>
      </div>`
    }
});
