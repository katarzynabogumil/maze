'use strict';

class Node {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.wall = false;
    this.neighbours = [];
    this.dist = Infinity;
    this.prev = undefined;
  }
}


let maze = setupMaze(10, 20, 50);
print(maze);
console.log(' ');
let start = generatePoint(maze);
let end = generatePoint(maze);
// shortestPath(maze, [0,0], [4,6]);
shortestPath(maze, [start.x,start.y], [end.x,end.y]); // could change input to nodes


function shortestPath(maze, [a, b], [x, y]) {
  let start = maze[a][b]; // if nodes as input - not necessary
  let end = maze[x][y];
  // if no generatePoint used - check if points are not walls!
  // if (start.wall || end.wall) return console.log('Either start or target are walls - no path possible.');
  
  let q = [start];
  start.dist = 0;
  let visited = new Set();
  let found = false;

  // find end
  while (q.length > 0) {
    let node = q.shift(); // in weighted graph: choose node from q with least dist!
    if (node === end) {
      found = true;
      break;
    }; 
    // add further steps
    for (let neighbour of node.neighbours) {
      if (!visited.has(neighbour)) {
        q.push(neighbour);
        visited.add(neighbour);
        neighbour.dist = node.dist + 1;
        neighbour.prev = node;
      }
    }
  }
  if (!found) return console.log('No path found');

  let path = [];
  let node = end;
  while (node !== start) {
    path.unshift(node);
    node = node.prev;
  } 

  printPath(maze, path)
  return [end.dist, path];
}


function setupMaze(sizeX, sizeY, noOfWalls) {
  let maze = Array.from(Array(sizeX), (element, indexX) => Array.from(Array(sizeY), (element, indexY) => new Node(indexX, indexY)));

  maze.flat(1)
    .map(node => ({
      value: node,
      sort: Math.random()
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(node => node.value)
    .slice(0, noOfWalls)
    .forEach(node => maze[node.x][node.y].wall = true);

  maze.forEach(row => row.forEach((el) => el.neighbours.push(...getNeibours(el, maze))));

  return maze;
}


function getNeibours(el, maze) {
  let sizeX = maze.length;
  let sizeY = maze[0].length;
  let neighbours = [];
  for (let row = Math.max(el.x - 1, 0); row < Math.min(el.x + 2, sizeX); row++) {
    for (let col = Math.max(el.y - 1, 0); col < Math.min(el.y + 2, sizeY); col++) {
      if (!(maze[row][col].wall) && maze[row][col] !== el && (row === el.x || col === el.y)) { // no diags
        neighbours.push(maze[row][col]);
      }
    }
  }
  return neighbours;
}


function generatePoint(maze) {
  let sizeX = maze.length;
  let sizeY = maze[0].length;
  let point;
  do {
    point = maze[~~(Math.random()*sizeX)][~~(Math.random()*sizeY)]
  } while (point.wall !== false)
  return point;
}


function print(maze) {
  // console.table(maze.map(row => row.map(node => {
  //   if (node.wall) return 'X';
  //   else return ' ';
  // })));

  for (let i = 0; i < maze.length; i++) {
    let row = '';
    for (let j = 0; j < maze[0].length; j++) {
      let node = maze[i][j].wall ? String.fromCodePoint(11035) : String.fromCodePoint(11036); // 11093 - red circle, 11088 - star
      row += '' + node;
    }
    console.log(row);
  }
}

function printPath(maze, path) {
  for (let i = 0; i < maze.length; i++) {
    let row = ''; 
    for (let j = 0; j < maze[0].length; j++) {
      let el = maze[i][j];
      let node = el.wall ? String.fromCodePoint(11035) : String.fromCodePoint(11036);
      if (path.includes(el)) node = String.fromCodePoint(11093);
      if (el === path[0]) node = String.fromCodePoint(11088);
      if (el === path[path.length-1]) node = String.fromCodePoint(127919);
      row += '' + node;
    }
    console.log(row);
  }
}
