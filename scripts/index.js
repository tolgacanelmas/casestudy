$('html').attr("data-theme", 'orange')
const theme = localStorage.getItem("theme")
if (theme != null) {
  $('html').attr("data-theme", theme)

}

let newArray = ["all"];
let filteredList = getFromLocalStorage();

function getList() {
  $.ajax({
    dataType: "json",
    url: "../assets/movies.json",
    success: function (movies) {
      saveLocalStorage(movies)
    }
  });
}

function saveLocalStorage(movies) {
  localStorage.setItem("movies", JSON.stringify(movies))
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("movies"))
}

function getFilteredData(movies) {
  filteredList.length = 0;
  for (let i = 0; i < movies.length; i++) {
    if (newArray.includes("all") || newArray.includes(movies[i].kind)) {
      filteredList.push(movies[i]);
    }
  }
  $('.options').removeClass("active")
  showList(filteredList)
}

function sortByPointASC(a, b) {
  var aPoint = a.point;
  var bPoint = b.point;
  return ((aPoint < bPoint) ? -1 : ((aPoint > bPoint) ? 1 : 0));
}

function sortByPointDESC(a, b) {
  var aPoint = a.point;
  var bPoint = b.point;
  return ((aPoint > bPoint) ? -1 : ((aPoint < bPoint) ? 1 : 0));
}

function deleteItemFromArray(arr, name) {
  let indexOfSelected = arr.findIndex(movie => movie.name == name)
  arr.splice(indexOfSelected, 1);
  return arr;
}

function deleteItem(name) {
  let array = getFromLocalStorage();
  saveLocalStorage(deleteItemFromArray(array, name))
  filteredList = deleteItemFromArray(filteredList, name)
  showList(filteredList)

  Swal.fire({
    title: "Silme Başarılı",
    icon: "error",
    confirmButtonText: "Devam",
  });
}

function showList(filteredList) {
  $(".movies").html("");
  filteredList.forEach((movie, i) => {
    const singleMovie = `
                      <div class="movie" id=${i}> 
                          <div class="movie-name">
                              <p>
                              ${movie.name}
                              <span class="material-icons-outlined delete-item" onclick="deleteItem('${movie.name}')">
                              delete
                              </span>
                              </p>
                             
                          </div>
                          <div class="movie-point">
                            <span class="material-icons-outlined">
                            star
                            </span>
                            ${movie.point}
                          </div>
                          <div class="give-point">
                              <span>Puan Ver</span>
                              <span class="material-icons-outlined"> arrow_drop_up </span>
                              <span class="material-icons-outlined"> arrow_drop_down </span>
                          </div>
                      </div>
                  `;
    $(".movies").append(singleMovie);
  });
}



$(document).ready(function () {
  if (localStorage.getItem("movies") == null) {
    getList()
  }
  showList(getFromLocalStorage())

  $('#order-by-asc').on('click', function () {
    filteredList.sort(sortByPointASC)
    showList(filteredList)
  });

  $('#order-by-desc').on('click', function () {
    filteredList.sort(sortByPointDESC)
    showList(filteredList)
  });

  //menu buttons
  $(".left div button").on("click", function () {
    $(this).next().toggleClass("active");
  });

  $('.theme-color > span').on('click', function () {
    $('.theme-color').toggleClass("active")
  })

  $('input[name="color"]').on('change', function () {
    $('input[name="color"]').prop('checked', false);
    $(this).prop('checked', true);
    $('html').attr("data-theme", $(this).val())
    localStorage.setItem("theme", $(this).val())
  })

  $('input[name="kind"]').on('change', function () {
    $('input[name="kind"]').prop('checked', false);
    $(this).prop('checked', true);

    newArray.length = 0;
    if ($('#all').is(":checked")) {
      newArray.push("all")
    }
    if ($('#movie').is(":checked")) {
      newArray.push("movie")
    }
    if ($('#series').is(":checked")) {
      newArray.push("series")
    }
    getFilteredData(getFromLocalStorage())
  })
});

