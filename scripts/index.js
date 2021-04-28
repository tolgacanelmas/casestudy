$(document).ready(function () {
  const movies = JSON.parse(localStorage.getItem("json"));
  movies.forEach((movie, i) => {
    const singleMovie = `
                <div class="movie"> 
                    <div>${movie.name}</div>
                    <div>${movie.point}</div>
                    <div>
                        <span>Puan Ver</span>
                        <span class="material-icons-outlined"> arrow_drop_up </span>
                        <span class="material-icons-outlined"> arrow_drop_down </span>
                    </div>
                </div>
            `;
    $(".movies").append(singleMovie);
  });

  //menu buttons
  $(".left div button").on("click", function () {
    $(this).next().toggleClass("active");
  });

  // menu sub buttons

  let nameOfMovieOrShow = "";
  let point_ = "";
  let category = "";

  $("#name").on("keyup", function () {
    nameOfMovieOrShow = $(this).val();
  });

  $(".point").on("keyup", function () {
    point_ = $(this).val();
  });

  $(".select-type")
    .children("div")
    .each(function () {
      $(this)
        .find("input")
        .on("change", function () {
          category = $(this).val();
        });
    });

  $(".save-new").on("click", function () {
    const newTypeObject = {
      name: nameOfMovieOrShow,
      point: point_,
      kind: category,
    };
    $.getJSON("../assets/movies.json", function (movies) {
      movies.push(newTypeObject);
      localStorage.setItem("json", JSON.stringify(movies));
    });

    Swal.fire({
      title: "Başarılı bir şekilde kaydedildi!",
      icon: "success",
      confirmButtonText: "Devam",
    });

    $('.new-sign-container').find('input').each(function(){
        $(this).val('');
    })
  });
});
