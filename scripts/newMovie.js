
$(document).ready(function () {

    const movies = JSON.parse(localStorage.getItem("json"));
    let nameOfMovieOrShow;
    let point_;
    let category;

    $("#name").on("keyup", function () {
        nameOfMovieOrShow = $(this).val();
    });

    $("#point").on("keyup", function () {
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
        movies.push(newTypeObject)
        localStorage.setItem("json", JSON.stringify(movies));

        Swal.fire({
            title: "Başarılı bir şekilde kaydedildi!",
            icon: "success",
            confirmButtonText: "Devam",
        });
    });
})

