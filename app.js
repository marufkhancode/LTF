// var g = G$('john', 'Doe');
// g.greet().setLang('en').greet(true).log();

$('#login').click(function () {
    var loginGrtr = G$('Maruf', 'Khan');
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
    setTimeout(function () {
        location.reload();
        alert('reloading......')
    }, 5000);
});

// $(document).ready(function () {
//     if (jQuery) {
//         // jQuery is loaded  
//         alert("Yeah Jquery work!");
//     } else {
//         // jQuery is not loaded
//         alert("Doesn't Work");
//     }
// });