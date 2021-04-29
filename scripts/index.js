$(document).ready(function () {
  let arr;
  $.getJSON("../assets/movies.json", function (movies) {
    const movies_ = JSON.parse(localStorage.getItem("json"));

    if (movies_ == null) {
      arr = movies;
    } else {
      arr = movies_;
    }

    arr.forEach((movie, i) => {
      const singleMovie = `
                  <div class="movie"> 
                      <div class="movie-name">
                      <p>
                      ${movie.name}
                      </p>
                      <span class="material-icons-outlined">
                      delete
                      </span>
                      </div>
                      <div class="movie-point">
                      <span class="material-icons-outlined">
                      star
                      </span>
                      ${movie.point}</div>
                      <div class="give-point">
                          <span>Puan Ver</span>
                          <span class="material-icons-outlined"> arrow_drop_up </span>
                          <span class="material-icons-outlined"> arrow_drop_down </span>
                      </div>
                  </div>
              `;
      $(".movies").append(singleMovie);
    });
  });

  //menu buttons
  $(".left div button").on("click", function () {
    $(this).next().toggleClass("active");
  });
});
