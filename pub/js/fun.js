function runAway () {
    var $this = $(this),
        dWidth = $(document).width() - $this.width(),
        height = 360,
        nextX = Math.floor(Math.random() * dWidth),
        nextY = Math.floor(Math.random() * height);
    $('#thumb-down').animate({ left: nextX + 'px', top: nextY + 'px' });
    count++;
}

$(document).ready(function(){
    $('#thumb-down').mouseenter(runAway);
});