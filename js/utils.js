function lerp(a, b, u) {
  return (1 - u) * a + u * b;
}

function getRGBText(color){
  return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
}