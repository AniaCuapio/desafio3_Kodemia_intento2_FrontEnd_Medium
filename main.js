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

window.addEventListener("scroll", (event) => {
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 400) {
        printCardInfinitIzquierda(arrayTotals)        

    }
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
    var date = new Date();
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


var postsToRender = [];

const getPostsFromDb = () => {
    $.ajax({
        url: "https://ajaxclass-1ca34.firebaseio.com/medium-team2/.json",
        success: function (response) {
            $.each(response, (key, value) => {
                // log('key: ', key)
                // log('post value: ', value)
                postsToRender.push({ ...value, id: key });
                // let { id, imgUrl, title, text, author, section, createdAt } = value
                // log(value)
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

let randomNumber = getRandomInt(1 - 20)

const printFirstPost = () => {
    let firstPost = arrayRecentSection[0]
    //log(firstPost)
    let { title, imgUrl, author, milisegundos, id, text } = firstPost
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
                                <a class="text-dark user ml-3" href="#" data-toggle="popover" data-placement="top" data-author="${author}" data-age="">${author}</a>
                                <span class="text-dark user">in </span>
                                <a class="text-dark user" href="#"data-toggle="popover2" data-placement="top" data-category=""></a>
                                <br>
                                <time class=" text-muted user ml-3">${milisegundos}</time><span class="text-muted small"data-toggle="tooltip" data-placement="bottom" title= " ${randomNumber} min read">
                                <svg data-toggle="tooltip" data-placement="top" title= "Updated ${milisegundos}" class="bi bi-dot text-muted user ml-3" width="1rem" height="1rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg> ${randomNumber} min
                                    read </span><span><svg class="bi bi-star-fill text-muted" width="0.8rem" height="0.8rem" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                  </svg> </span>
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
                                                            <p class="card-text mb-0"><small>${author}</small> <small
                                                                    class="border border-danger rounded-lg w-2 text-danger p-1 ml-3">
                                                                    Follow </small></p>
                                                            <p class="card-text"><small>${milisegundos}· ${randomNumber} min read ★</small></p>
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
        let { title, imgUrl, author, milisegundos, id, text } = post
        let postCard =
            `<div id="second-card" class="card mb-3 border-0">
                <div class="row no-gutters d-flex align-items-center  flex-row-reverse flex-md-row">
                    <div class="col-4">
                        <img width="100%"
                            src="${imgUrl}"
                            class="card-img mb-3" alt="">
                    </div>
                    <div class="col-8">
                        <div class="card-body pr-0 pt-0">
                        <span type="button" data-id="${id}" class="detele-btn float-right text-muted" aria-hidden="true">&times;</span>
                            <h5 class="card-title2 font-weight-bold" data-toggle="modal" data-target="#exampleModal-${id}">${title}</h5>
                            <div class="btn-group2 d-flex align-items-center justify-content-between">
                                <div>
                                    <a class="text-dark user" href="#" data-toggle="popover" data-placement="top" data-author="${author}" data-age="${randomNumber}" >${author}</a>
                                    <span class="text-dark user">in</span>
                                    <a class="text-dark user" href="https://medium.com/" data-toggle="popover2" data-placement="top" data-category=""></a>
                                    <br>
                                    
                                    <time class="text-muted user" data-toggle="tooltip" data-placement="top" title="Updated ${milisegundos}">${milisegundos}</time> <span class="text-muted user"data-toggle="tooltip" data-placement="bottom" title= " >${randomNumber} min read"                                           alt="" > &bull; ${randomNumber} min
                                        read </span><span class="text-muted user" > ★ </span>
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
                                                                <p class="card-text mb-0"><small>${author}</small> <small
                                                                        class="border border-danger rounded-lg w-2 text-danger p-1 ml-3">
                                                                        Follow </small></p>
                                                                <p class="card-text"><small>${milisegundos}· ${randomNumber} min read ★</small></p>
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
    let { title, imgUrl, author, milisegundos, id, text } = rightPost
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
            <a class="text-dark user" href="#" data-toggle="popover" data-placement="top" data-author="${author}" data-age="${randomNumber}">${author}</a><span
                class="text-dark small">
                in </span>
            <a class="text-dark user" href="#"data-toggle="popover2" data-placement="top" data-category="">News</a>
            <br><time class="text-muted user" data-toggle="tooltip" data-placement="top" title= "Updated ${milisegundos}">${milisegundos}</time><span
                class="text-muted small"data-toggle="tooltip" data-placement="bottom" title= " ${randomNumber} min read"> <span>&bull;</span> ${randomNumber} min
                read </span><span class="text-muted"> ★ </span>
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
                                                                <p class="card-text"><small>${milisegundos}· ${randomNumber} min read ★</small></p>
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


// window.addEventListener("scroll", (event) => {
//     if ($(window).scrollTop() > $(document).height() - $(window).height() - 400) {
//         loadMorePost()
//     }

const printCardInf = (array) => {
    array.forEach(post => {
        let { title, text, author, milisegundos, imgUrl, id } = post
        let postCard3 = `

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
                                                        <p class="card-text"><small>${milisegundos}· ${randomNumber} min read ★</small></p>
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
        $("#infinitoScroll").append(postCard3)
    })
}

const printCardInfinitIzquierda = (array) => {

    array.forEach(post => {
        let { title, text, author, milisegundos, imgUrl, id } = post
        let infinitScroll = `
        <div id="second-card" class="card mb-3 border-0">                
        <div class="row no-gutters d-flex align-items-center  flex-row-reverse">                
            <div class="col-4">
                <img src="${imgUrl}"
                    class="card-img mb-3 w-75" alt="">
            </div>
            <div class="col-8 ">
                <div class="card-body pr-0 pt-0 ">
                <span type="button" data-id="${id}" class="detele-btn float-right text-muted" aria-hidden="true">&times;</span>
                    <h5 class="card-title font-weight-bold " data-toggle="modal" data-target="#exampleModal-${id}">${title}</h5>
                    <div class="btn-group2 d-flex align-items-center justify-content-between">
                        <div>
                            <p class="text muted"data-toggle="popover3" data-placement="top" data-description="${text.slice(0, 50)} ">${text.slice(0, 50)} </p>
                            <a class="text-dark user"data-toggle="popover" data-placement="top" data-author="${author}" data-age="" href="#">${author}</a>
                            <span class="text-dark user">in</span>
                            <a class="text-dark user" href="#"data-toggle="popover2" data-placement="top" data-category=""></a>
                            <br><time class=" text-muted user"data-toggle="tooltip" data-placement="top" title="${milisegundos} min read" >${milisegundos}</time><span class="text-muted user"data-toggle="tooltip" data-placement="bottom" title="&bull; ${randomNumber} min read">
                            &bull; ${randomNumber} min
                                read★</span><span> <img width="8px" src="images/star (3).svg" alt="">
                            </span>
                        </div>
                        <div class="d-flex mr-2">
                        <span><svg class="bi bi-bookmark text-muted" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z" />
                    </svg></span>
                    <span> <svg class="bi bi-three-dots text-muted" alt="dotts"data-toggle="popoverdott" data-placement="bottom" data-menu="" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                  </svg></span>
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
                                                <p class="card-text"><small>${milisegundos}· ${randomNumber} min read ★</small></p>
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
        let { title, author, milisegundos, text, imgUrl, id } = post
        let postCard2 =
            `<li class="mb-5">
                <div class="col-3 col-md-4 p-0">
                    <h2 class="text-muted text-right">0${popularCounter + 1}</h2>
                </div>
                <div class="col-9 col-md-8">
                <span type="button" data-id="${id}" class="detele-btn float-right text-muted" aria-hidden="true">&times;</span>
                    <h6 class="textA" data-toggle="modal" data-target="#exampleModal-${id}">${title}</h6>
                    <div>
                    <span><a class="text-dark user" href="#"data-toggle="popover" data-placement="top" data-author="${author}" data-age="${randomNumber}">${author}</a>
                    </span> In <span><a class="text-dark user" href="#"data-toggle="popover2" data-placement="top" data-category="">News</a></span>
                    <br><time class=" text-muted user" data-toggle="tooltip" data-placement="top" title="Updated ${milisegundos}">${milisegundos}</time>
<span class="text-muted user"data-toggle="tooltip" data-placement="bottom" title="${randomNumber} min read">

<span width="6px" alt=""> &bull; ${randomNumber} min read ★</span>
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
                                                <p class="card-text"><small>${milisegundos}· ${randomNumber} min read ★</small></p>
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


const deletePost = (e) => {
    e.stopPropagation();
    console.log(e.target)
    let id = e.target.getAttribute("data-id")
    console.log(id)
    deletePostDB(id)
    location.reload()
    alert("prueba de borrar")
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
    // printCardInf(arrayTotals)
    printPopularPosts(arrayPopularSection)
    printCardInfinitIzquierda(arrayTotals)
    $(".detele-btn").click(deletePost)
}
printAllPosts()







