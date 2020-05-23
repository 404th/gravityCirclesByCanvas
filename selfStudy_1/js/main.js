let can = document.getElementById("canvas");
can.width = window.innerWidth;
can.height = window.innerHeight;
let c = can.getContext("2d");

let maxRad = 80;

let mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", () => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize" , () => {
  can.width = window.innerWidth
  can.height = window.innerHeight
})

function SetCircles(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.rad = radius;
  this.dx = dx;
  this.dy = dy;

  this.build = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
    c.fillStyle = "rgba( 0, 255, 0, 1 )";
    c.fill();
  };

  this.upDate = () => {
    if (this.x + this.rad > innerWidth || this.x - this.rad < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.rad > innerHeight || this.y - this.rad < 0) {
      this.dy = -this.dy;
    }

    if (
      this.x - mouse.x < 50 &&
      this.x - mouse.x > -50 &&
      this.y - mouse.y < 50 &&
      this.y - mouse.y > -50
    ) {
      if (this.rad < maxRad) {
        this.rad += 4;
      }
    } else if (this.rad > radius) {
      this.rad -= 4;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.build();
  };
}

let circleStorage = [];

for (p = 0; p < 1000; p++) {
  let radius = Math.random() * 5+4
  let x = Math.random() * (innerWidth - 2 * radius) + radius;
  let y = Math.random() * (innerHeight - 2 * radius) + radius;
  let dy = (Math.random() - 0.5) * 5;
  let dx = (Math.random() - 0.5) * 5;

  circleStorage.push(new SetCircles(x, y, radius, dx, dy));
}

function amazingCircles() {
  requestAnimationFrame(amazingCircles);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let r = 0; r < circleStorage.length; r++) {
    circleStorage[r].upDate();
  }
}

amazingCircles();
