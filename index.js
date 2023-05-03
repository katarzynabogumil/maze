'use strict';

class Node {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.wall = false;
    this.neighbours = [];
  }
}

let maze = setupMaze(5, 7, 10);
print(maze);


// function shortestPath(maze, [a, b], [x, y]) {
//   let visited = [];
//   let path = 0;
//   maze
//   let q = [];
// }


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
      if (!(maze[row][col].wall) && maze[row][col] !== el) {
        neighbours.push(maze[row][col]);
      }
    }
  }
  return neighbours;
}

function print(maze) {
  // console.table(maze.map(row => row.map(node => {
  //   if (node.wall) return 'X';
  //   else return ' ';
  // })));

  for (let i = 0; i < maze.length; i++) {
    let row = ''; //+i;
    for (let j = 0; j < maze[0].length; j++) {
      let node = maze[i][j].wall ? String.fromCodePoint(11035) : String.fromCodePoint(11036); // 11093 - red circle, 11088 - star
      row += '' + node;
    }
    console.log(row);
  }
}

