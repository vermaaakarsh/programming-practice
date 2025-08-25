class Stack {
  constructor() {
    this.list = [];
  }

  push(item) {
    this.list.push(item);
  }
  pop(item) {
    if (this.list.length === 0) {
      return "Underflow";
    }
    return this.list.pop(item);
  }
  top() {
    if (this.list.length === 0) {
      return "Stack empty";
    }
    return this.list[this.list.length - 1];
  }
  isEmpty() {
    return this.list.length === 0;
  }
  size() {
    return this.list.length;
  }
  display() {
    let ind = this.list.length - 1;
    while (ind >= 0) {
      console.log(this.list[ind--]);
    }
  }
}

function towerOfHanoi(noOfDisks, source, aux, dest) {
  if (noOfDisks === 0) {
    return;
  }
  towerOfHanoi(noOfDisks - 1, source, dest, aux);
  dest.push(source.pop());
  towerOfHanoi(noOfDisks - 1, aux, source, dest);
}

function displayAllTower(source, auxiliary, destination, when) {
  console.log(when);
  console.log("Source Tower: ");
  source.display();
  console.log("Auxiliary Tower: ");
  auxiliary.display();
  console.log("Destination Tower: ");
  destination.display();
  console.log("============================================================");
}

(function () {
  let noOfDisks = 3;
  let source = new Stack();
  let auxiliary = new Stack();
  let destination = new Stack();

  while (noOfDisks > 0) {
    source.push(noOfDisks--);
  }
  displayAllTower(source, auxiliary, destination, "Initial");
  towerOfHanoi(source.size(), source, auxiliary, destination);
  displayAllTower(source, auxiliary, destination, "Final");
})();
