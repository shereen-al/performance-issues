// on window load add event listener to the menu button
window.addEventListener('load', function () {
    document.getElementById('menu-button').addEventListener('click', function () {
        // toggle the class 'open' on the menu
        document.getElementById('menu').classList.toggle('open');
    });
});