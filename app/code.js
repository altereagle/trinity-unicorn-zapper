// Adjustable properties
var abilityCost      = 31;
var regeneration     = 0;
var regenerationRate = 250;

var characterImageSrc = {
  forward: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQotqIlOczZsr65WZm3vKkQXcy7WS-5TJF7ZU68qSDU7KmM5MQF"
};

var zapImageSource = {
  primary: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/160215/spark.gif"
};

var debug      = $('#debug');
var player     = $('#player');
var cursor     = $('#cursor');
var body       = $('body');
var stats      = $('stats');
var specialbar = $('specialbar');

player.attr('src', characterImageSrc.forward);

body.on("mousemove", function(event) {
  var x     = event.clientX;
  var y     = event.clientY;
  var midX  = body.width() / 2;
  var midY  = body.height() / 2;
  var pastX = x < midX;
  
  if (pastX) {
    player.css('transform', 'rotateY(180deg)');
  }
  
  if (!pastX) {
    player.css('transform', 'rotateY(0deg)');
  }
  
  cursor.css({
    top : (y - 20) + "px",
    left: (x - 20) + "px"
  });
  
  return debug.html("X: " + x + ", Y: " + y);
});

body.on("mouseup", function(event) {
  if (specialbar.hasClass('looseSpecial')) return;
  if (specialbar.width() <= abilityCost) return;
  
  var x = event.clientX;
  var y = event.clientY;
  plusOrMinus = (ref = Math.random() < 0.5) != null ? ref : - {
    1: 1
  };
  
  var zap = $('<img/>');
  zap.addClass("zap");
  zap.css({
    left: x - 50,
    top: y - 50
  });
  zap.attr("src", zapImageSource.primary.replace(/\?.*$/, "") + "?x=" + Math.random());
  zap.appendTo(body);
  
  var clearZap = function() {
    return zap.remove();
  };
  
  setTimeout(clearZap, 500);

  debug.html("zap!");
  cursor.addClass('flash');
  specialbar.addClass('looseSpecial');
  specialbar.css('width', specialbar.width() - abilityCost);

  var clearAnimation = function() {
    specialbar.removeClass('looseSpecial');
    return cursor.removeClass('flash');
  };
  
  return setTimeout(clearAnimation, 150);
});

var initialSpecialWidth = specialbar.width();

// Regenerates digits "energy"
var regenerateSpecial = function(amount) {
  if(amount) {
      var regeneratedAmount = initialSpecialWidth * amount;
  } else {
      var regeneratedAmount = initialSpecialWidth * regeneration;
  }
  
  var full = specialbar.width() >= initialSpecialWidth;
  if (full) return specialbar.width(initialSpecialWidth);
  return specialbar.width(specialbar.width() + regeneratedAmount);
};

setInterval(regenerateSpecial, regenerationRate);

// Digit should regenerate energy when a player presses r
// Listen for keyup events
document.addEventListener("keydown", function(event){
  
  console.log(event.keyCode)
  
  if(event.keyCode === 82){
    regenerateSpecial(0.05)
  } 
    
});

// Make unicorn move from side to side
document.addEventListener("keydown", function(event){
  
  console.log(event.keyCode)
  
  if(event.keyCode === 73){
    characterImageSrcPosition.x += 1;
  }
  
});

