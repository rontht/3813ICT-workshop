$(document).ready(function () {
  $("#loginForm").submit(function (event) {
    event.preventDefault();
    ajaxPost();
  });

  function ajaxPost() {
    // form data will accept both email and password
    var formData = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
    // do ajax POST
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: window.location + "api/loginForm",
      data: JSON.stringify(formData),
      dataType: "json",

      // when successful from server side,
      success: function (response) {
        if (response.valid) {
          window.location.href = `/account?name=${response.name}&email=${response.email}`;
          $("#errorMessage").removeClass("showError").addClass("hideError");
        } else {
          $("#errorMessage").removeClass("hideError").addClass("showError");
        }
      },

      // if POST request failed,
      error: function (e) {
        alert("Error! POST request failed.");
        console.log("ERROR: ", e);
      },
    });
  }
});