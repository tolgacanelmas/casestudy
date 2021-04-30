
mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field.two'));

function saveLocalStorage(movies){
  localStorage.setItem("movies" , JSON.stringify(movies))
}

function getFromLocalStorage(){
  return JSON.parse(localStorage.getItem("movies"))
}

$(document).ready(function () {

  let nameOfMovieOrShow;
  let point_;
  let category;
  $('#save-btn').on('click',function(){
    const newTypeObject = {
      name: nameOfMovieOrShow,
      point: point_,
      kind: category,
    };
    let newArr = getFromLocalStorage();
    newArr.push(newTypeObject)
    saveLocalStorage(newArr)

    Swal.fire({
      title: "Başarılı bir şekilde kaydedildi!",
      icon: "success",
      confirmButtonText: "Devam",
    });
  })

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
});
