(function() {
  var drawGalia, drawLetter, drawSpiral, drawText, gimelColor, gradient, hehColor, lamedColor, lettersX, lettersY, text1, text2, yodColor;

  $(function() {
    var MAX_HB_ANGLE, MAX_HB_SIZE, SPIRAL_LENGTH, canvas, ctx, galia, hbsize, height, i, rot, srot, width;
    canvas = $('canvas')[0];
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    width = canvas.width;
    height = canvas.height;
    ctx = canvas.getContext('2d');
    ctx.translate(width / 2, height / 2);
    SPIRAL_LENGTH = 1000;
    MAX_HB_SIZE = width / 10;
    MAX_HB_ANGLE = 0.15;
    i = 3;
    rot = 0;
    srot = 0;
    hbsize = 1;
    galia = false;
    return setInterval(function() {
      ctx.clearRect(-width / 2, -height / 2, width, height);
      drawSpiral(ctx, 0, 0, 5, 4, 'grey', i);
      ctx.rotate(srot);
      drawSpiral(ctx, 0, 0, 5, 3, 'white', i);
      ctx.rotate(-srot);
      srot += 0.1;
      if (galia) {
        drawGalia(ctx, width / 3, width, height);
      }
      rot += (Math.random() - 0.5) * 0.01;
      if (rot < -MAX_HB_ANGLE) {
        rot = -MAX_HB_ANGLE;
      }
      if (rot > MAX_HB_ANGLE) {
        rot = MAX_HB_ANGLE;
      }
      hbsize += (Math.random() - 0.3) * 1.2;
      if (hbsize >= MAX_HB_SIZE) {
        hbsize = MAX_HB_SIZE;
      }
      drawText(ctx, rot * Math.PI, hbsize, hbsize * 1.5, height);
      if (i < SPIRAL_LENGTH) {
        return i += 3;
      } else {
        i = SPIRAL_LENGTH;
        return galia = true;
      }
    }, 20);
  });

  drawSpiral = function(ctx, originx, originy, scale, width, color, steps) {
    var angle, i, x, y, _i;
    ctx.save();
    ctx.scale(scale, scale);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    originx = originx / scale;
    originy = originy / scale;
    ctx.moveTo(originx, originy);
    for (i = _i = 0; 0 <= steps ? _i < steps : _i > steps; i = 0 <= steps ? ++_i : --_i) {
      angle = 0.1 * i;
      x = (1 + angle) * Math.cos(angle) + originx;
      y = (1 + angle) * Math.sin(angle) + originy;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    return ctx.restore();
  };

  gradient = null;

  text1 = "Happy Birthday!!!";

  text2 = "★ עד מאה שלושים ושמונה לפחות ★";

  drawText = function(ctx, rotation, size, height) {
    var size2, textWidth, y1;
    if (!gradient) {
      gradient = ctx.createLinearGradient(0, 0, 0, -height);
      gradient.addColorStop(0, "orange");
      gradient.addColorStop(1, "yellow");
    }
    size2 = Math.floor(size * 0.5);
    ctx.save();
    ctx.rotate(rotation);
    ctx.save();
    ctx.scale(1, 1.5);
    ctx.fillStyle = gradient;
    ctx.font = "900 " + size + "px impact";
    textWidth = ctx.measureText(text1);
    y1 = size / 2;
    ctx.fillText(text1, -textWidth.width / 2, y1);
    if (size > 4) {
      ctx.strokeStyle = "#F57AB1";
      ctx.lineWidth = size / 40;
      ctx.strokeText(text1, -textWidth.width / 2, y1);
    }
    ctx.restore();
    ctx.font = "900 " + size2 + "px sans-serif";
    textWidth = ctx.measureText(text2);
    ctx.fillStyle = "yellow";
    ctx.fillText(text2, -textWidth.width / 2, y1 * 1.5 + size2);
    if (size > 4) {
      ctx.strokeStyle = "orange";
      ctx.lineWidth = size2 / 30;
      ctx.strokeText(text2, -textWidth.width / 2, y1 * 1.5 + size2);
    }
    ctx.restore();
  };

  lettersX = null;

  lettersY = null;

  gimelColor = 'pink';

  lamedColor = 'lightblue';

  yodColor = 'lightgreen';

  hehColor = 'teal';

  drawGalia = function(ctx, size, width, height) {
    var galiaHeight, galiaWidth, i, _i, _j, _ref;
    if (!lettersX) {
      galiaWidth = width * 0.7;
      galiaHeight = height;
      lettersY = [];
      lettersX = [];
      for (i = _i = 0; _i <= 5; i = ++_i) {
        lettersX[i] = galiaWidth / 2 - i * size / 2;
        lettersY[i] = size / 2;
      }
    }
    ctx.font = "900 " + size + "px sans-serif";
    drawLetter(ctx, "☂", "#101010", lettersX[0], lettersY[0]);
    drawLetter(ctx, "ג", gimelColor, lettersX[1], lettersY[1]);
    drawLetter(ctx, "ל", lamedColor, lettersX[2], lettersY[2]);
    drawLetter(ctx, "י", yodColor, lettersX[3], lettersY[3]);
    drawLetter(ctx, "ה", hehColor, lettersX[4], lettersY[4]);
    drawLetter(ctx, "☂", "#202020", lettersX[5], lettersY[5]);
    for (i = _j = 0, _ref = lettersX.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
      if (i % 2 === 0) {
        lettersY[i] += height / 500 + Math.random() * height / 200;
      } else {
        lettersY[i] -= height / 500 + Math.random() * height / 200;
      }
      if (lettersX[i] >= width / 2) {
        lettersX[i] = width / 2;
      } else if (lettersX[i] <= -width / 2) {
        lettersX[i] = -width / 2;
      }
      if (i % 2 === 0 && lettersY[i] >= height / 2) {
        lettersY[i] = -height / 2;
      } else if (i % 2 !== 0 && lettersY[i] <= -height / 2) {
        lettersY[i] = height / 2 + size;
      }
    }
  };

  drawLetter = function(ctx, text, color, x, y) {
    ctx.fillStyle = color;
    return ctx.fillText(text, x, y);
  };

}).call(this);
