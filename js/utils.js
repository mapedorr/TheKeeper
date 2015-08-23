var lerp = function(a, b, u) {
    return (1 - u) * a + u * b;
};

var fade = function(target, start, end, duration) {
    var interval = 10;
    var steps = duration / interval;
    var step_u = 1.0 / steps;
    var u = 0.0;
    var theInterval = setInterval(function() {
        if (u >= 1.0) {
            clearInterval(theInterval);
        }
        var r = Math.round(lerp(start.r, end.r, u));
        var g = Math.round(lerp(start.g, end.g, u));
        var b = Math.round(lerp(start.b, end.b, u));
        target.color = {
          r: r,
          g: g,
          b: b
        };
        u += step_u;
    }, interval);
};






/*function transition(value, maximum, start_point, end_point){
  return start_point + (end_point - start_point)*value/maximum;
}

function transition3(value, maximum, s1, s2, s3, e1, e2, e3){
  var r1= transition(value, maximum, s1, e1);
  var r2= transition(value, maximum, s2, e2);
  var r3= transition(value, maximum, s3, e3);
  return (r1, r2, r3);
}

function rgb_to_hsv(r, g, b){
  maxc= Math.max(r, g, b);
  minc= Math.min(r, g, b);
  var v= maxc;
  if(minc == maxc) return (0, 0, v);
  var diff= maxc - minc;
  var s= diff / maxc;
  var rc= (maxc - r) / diff;
  var gc= (maxc - g) / diff;
  var bc= (maxc - b) / diff;
  var h = 0;
  if(r == maxc then){
    h= bc - gc;
  }else if(g == maxc then){
    h= 2.0 + rc - bc;
  }else{
    h = 4.0 + gc - rc;
  }
  h = (h / 6.0) % 1.0; //comment: this calculates only the fractional part of h/6
  return [h, s, v];
}

function hsv_to_rgb(h, s, v){
  if(s == 0.0){
    return [v, v, v];
  }
  var i= parseInt(Math.floor(h*6.0)); //comment: floor() should drop the fractional part
  var f= (h*6.0) - i;
  var p= v*(1.0 - s);
  var q= v*(1.0 - s*f);
  var t= v*(1.0 - s*(1.0 - f));
  if(i mod 6 == 0){
    return v, t, p;
  }
  if(i == 1){
    return q, v, p;
  }
  if(i == 2){
    return p, v, t;
  }
  if(i == 3){
    return p, q, v;
  }
  if(i == 4){
    return t, p, v;
  }
  if(i == 5){
    return v, p, q;
  }
  //comment: 0 <= i <= 6, so we never come here
}

*/