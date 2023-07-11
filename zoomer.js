$(document).ready(function() {
    var zoomRate = 1; // Initial zoom rate
    var isZoomed = false; // Is an image currently zoomed?
    var panSpeed = 70; // Speed of panning
    var xPos = 0, yPos = 0; // Image's position in the zoomed state

    $('body').prepend('<div class="zoomDiv" style="display:none;"><img src="" class="zoomImg"></div>');
    $('.zoomDiv').css({opacity: '0', width: '100%', height: '100%', background: 'white', position: 'fixed', top: '0', left: '0', zIndex: '50', display: 'flex', alignItems: 'center', justifyContent: 'center'});

    $('img:not(.zoomImg)').click(function() {
      zoomRate = 1; // Reset zoom rate every time a new image is clicked
      xPos = yPos = 0; // Reset image position when a new image is clicked
      $('.zoomImg').attr('src', $(this).attr('src')).css({width: 'auto', height: 'auto', position: 'relative', left: xPos + 'px', top: yPos + 'px'});
      $('.zoomDiv').css({opacity: '1'}).show();
      isZoomed = true; // Now the image is zoomed
    });

    $('.zoomDiv').on('wheel', function(e) {
      // Only zoom if an image is currently zoomed
      if(isZoomed) {
        e.preventDefault(); // Prevent scrolling

        // Zoom in/out based on wheel direction
        if(e.originalEvent.deltaY < 0) {
          zoomRate += 0.1;
        } else {
          zoomRate -= 0.1;
          if (zoomRate < 0.1) zoomRate = 0.1; // Prevent zooming out too much
        }

        var imgWidth = $('.zoomImg')[0].naturalWidth * zoomRate;
        var imgHeight = $('.zoomImg')[0].naturalHeight * zoomRate;
        $('.zoomImg').css({width: imgWidth + 'px', height: imgHeight + 'px'});
      }
    });

    // Hide zoomDiv when clicking anywhere on it
    $('.zoomDiv').click(function() {
      $(this).css({opacity: '0'}).hide();
      isZoomed = false; // Now the image is not zoomed
    });

    // Keyboard navigation
    $(document).keydown(function(e) {
      if(isZoomed) {
        e.preventDefault();
        var img = $('.zoomImg');

        switch (e.key) {
          case 'd':
            xPos -= panSpeed;
            break;
          case 'a':
            xPos += panSpeed;
            break;
          case 'x':
            yPos -= panSpeed;
            break;
          case 'w':
            yPos += panSpeed;
            break;
        }
        img.css({left: xPos + 'px', top: yPos + 'px'});
      }
    });
  });