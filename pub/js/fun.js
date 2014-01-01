var count = 0;
function mouseenter () {
    if (count > 5) {
        $('#thumb-down').css({ WebkitTransform: 'rotate(180deg)'});
        $('#q').css({ WebkitTransform: 'rotate(90deg)'}).fadeIn(400);
        // $('#q').css({visibility: 'visible'});
        return;
    }
    var $this = $(this),
        dWidth = $(document).width() - $this.width(),
        height = 360,
        nextX = Math.floor(Math.random() * dWidth),
        nextY = Math.floor(Math.random() * height);
    $('#thumb-down').animate({ left: nextX + 'px', top: nextY + 'px' });
    count++;
}

$(document).ready(function(){
    $('#thumb-down').mouseenter(mouseenter);
});