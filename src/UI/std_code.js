/** A supporting function for the webserver. Allows the server to navigate "up" on most machines. */
function navigateUp(string) {
  // modifies the string to remove the last /, in effect navigating up without using ..
  // console.log(string)
  const spl = string.split('\\');
  let newStr = '';
  for (let i=0; i<spl.length-1; i++) {
    newStr += spl[i] + '\\';
  }

  return newStr;
}

/** A simple dot product. */
function dot(a, b) {
  return ( a.x*b.x)+(a.y*b.y);
}

/** Finds the projected vector.*/
function projectReal(l1, l2, p) {
  vx = p.x - l1.x;
  vy = p.y - l1.y;
  v = {x: vx, y: vy};

  sx = l2.x - l1.x;
  sy = l2.y - l1.y;
  s = {x: sx, y: sy};

  num = dot(v, s);
  den = dot(s, s);

  tot = num/den;
  return {x: (sx*tot)+l1.x, y: (sy*tot)+l1.y};
}

/** Converts radians to degrees*/
function rtd(inp) {
  return (inp/Math.PI)*180;
}

/**  returns the distance between two points*/
function pointDistance(p1, p2) {
  const dis=Math.sqrt(Math.pow(p2.x-p1.x, 2)+Math.pow(p2.y-p1.y, 2));
  return dis;
}

/**  Returns the direction between two points.*/
function pointDirection(p1, p2) {
  return rtd(Math.atan2(p2.y - p1.y, p2.x - p1.x));
}


/** Deepcopy saves the values, not the references. */
function deepcopy(val) {
  return JSON.parse(JSON.stringify(val));
}

/** A supporting function for the route/navigation subsystem. Linearly interpolates between two positions.*/
function lerpDistance(p1, p2, dis) {
  const retX=p1.x+(((p2.x-p1.x)*dis)/pointDistance(p1, p2));
  const retY=p1.y+(((p2.y-p1.y)*dis)/pointDistance(p1, p2));

  return {x: retX, y: retY};
}


/** given 3 positions in 1 dimension, finds the percentage between the two. */
function inverseLerp1D(pos1, pos2, posX) {
  // inverse lerp
  const perc=(posX-pos1)/(pos2-pos1);

  return perc;
}

/** finds the percentage position in a pair of 2D points.*/
function findLerpedPerc(start, end, point) {
  let perc = inverseLerp1D(start.x, end.x, point.x);
  if (start.x==end.x) {
    perc = inverseLerp1D(start.y, end.y, point.y);
  }
  if (start.y==end.y) {
    perc = inverseLerp1D(start.x, end.x, point.x);
  }

  return perc;
}

/** finds the closest point, distance, and other useful features of a polygon or polyline compared to a point.*/
function closestProjection(polygon, point, closed) {
  let distMin = 1000000;
  let idMin = 0;
  // console.log("length: "+polygon.length)
  for (let i=0; i<polygon.length; i++) {
    const start = polygon[i];
    let end = {};
    if (polygon[i+1]) {
      end = polygon[i+1];
      loopedSegment = false;
    } else {
      end = polygon[0];
      loopedSegment = true;
    }

    let proj = projectReal(start, end, point);

    perc = findLerpedPerc(start, end, proj);
    proj = {};
    projIsExtreme = false;
    if (perc>1 || perc<0) {
      if (perc>1) {
        proj = end;
      } else {
        proj = start;
      }
      projIsExtreme = true;
    } else {
      proj = projectReal(start, end, point);
    }
    // console.log("points: ",proj,point)
    const dist = geolib.getDistance({latitude: proj.y, longitude: proj.x}, {latitude: point.y, longitude: point.x})/1000;
    // console.log("dist for ",i,": ",dist)

    if (dist<distMin && ((loopedSegment && closed) || (!loopedSegment))) {
      idMin = i;
      minProj = proj;
      distMin = dist;
      isExtreme = projIsExtreme;
      finalPerc = perc;
      bestStart = start;
      bestEnd = end;
    }
  }

  return {id: idMin, proj: minProj, dis: distMin, end: bestEnd, start: bestStart, perc: finalPerc};
}


