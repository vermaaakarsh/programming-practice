class TreeNode {
  constructor(val) {
    this.val = val;
    this.color = "R";
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  noOfLevels(node = this.root) {
    if (!node) return 0;
    return (
      1 + Math.max(this.noOfLevels(node.left), this.noOfLevels(node.right))
    );
  }

  leftRotate(node) {
    let newRoot = node.right;
    let temp = newRoot.left;

    newRoot.left = node;
    node.right = temp;

    if (temp) temp.parent = node;
    newRoot.parent = node.parent;

    if (!node.parent) this.root = newRoot;
    else if (node.parent.left === node) node.parent.left = newRoot;
    else node.parent.right = newRoot;

    node.parent = newRoot;
    return newRoot;
  }

  rightRotate(node) {
    let newRoot = node.left;
    let temp = newRoot.right;

    newRoot.right = node;
    node.left = temp;

    if (temp) temp.parent = node;
    newRoot.parent = node.parent;

    if (!node.parent) this.root = newRoot;
    else if (node.parent.left === node) node.parent.left = newRoot;
    else node.parent.right = newRoot;

    node.parent = newRoot;
    return newRoot;
  }

  insert(val) {
    let newNode = new TreeNode(val);
    if (!this.root) {
      newNode.color = "B";
      this.root = newNode;
      return;
    }

    let current = this.root;
    let parent = null;

    while (current) {
      parent = current;
      if (val <= current.val) current = current.left;
      else current = current.right;
    }

    newNode.parent = parent;
    if (val <= parent.val) parent.left = newNode;
    else parent.right = newNode;

    this.insertFixup(newNode);
  }

  insertFixup(node) {
    if (!node.parent) {
      node.color = "B";
      this.root = node;
      return node;
    }

    if (node.parent.color === "B") return node;

    let parent = node.parent;
    let grandparent = parent.parent;
    if (!grandparent) return node;

    let uncle =
      grandparent.left === parent ? grandparent.right : grandparent.left;

    if (uncle && uncle.color === "R") {
      parent.color = "B";
      uncle.color = "B";
      grandparent.color = "R";
      return this.insertFixup(grandparent);
    }

    if (parent === grandparent.left) {
      if (node === parent.right) {
        node = this.leftRotate(parent);
        parent = node.parent;
      }
      parent.color = "B";
      grandparent.color = "R";
      node = this.rightRotate(grandparent);
    } else {
      if (node === parent.left) {
        node = this.rightRotate(parent);
        parent = node.parent;
      }
      parent.color = "B";
      grandparent.color = "R";
      node = this.leftRotate(grandparent);
    }

    this.root.color = "B";
    return node;
  }

  delete(val) {
    let node = this.root;
    while (node && node.val !== val) {
      node = val < node.val ? node.left : node.right;
    }
    if (!node) return; // not found

    this.deleteNode(node);
  }

  deleteNode(node) {
    let replacementNode;
    let originalColor = node.color;

    if (!node.left) {
      replacementNode = node.right;
      this.transplant(node, node.right);
    } else if (!node.right) {
      replacementNode = node.left;
      this.transplant(node, node.left);
    } else {
      let maxLeft = node.left;
      while (maxLeft.right) maxLeft = maxLeft.right;

      originalColor = maxLeft.color;
      replacementNode = maxLeft.left;

      if (maxLeft.parent !== node) {
        this.transplant(maxLeft, maxLeft.left);
        maxLeft.left = node.left;
        maxLeft.left.parent = maxLeft;
      }

      this.transplant(node, maxLeft);
      maxLeft.right = node.right;
      maxLeft.right.parent = maxLeft;
      maxLeft.color = node.color;
    }

    if (originalColor === "B") this.deleteFixup(replacementNode, node.parent);
  }

  transplant(u, v) {
    if (!u.parent) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;

    if (v) v.parent = u.parent;
  }

  deleteFixup(node, parent) {
    while (node !== this.root && (!node || node.color === "B")) {
      let sibling;
      if (node === (parent ? parent.left : null)) {
        sibling = parent.right;
        if (sibling && sibling.color === "R") {
          sibling.color = "B";
          parent.color = "R";
          this.leftRotate(parent);
          sibling = parent.right;
        }

        if (
          (!sibling.left || sibling.left.color === "B") &&
          (!sibling.right || sibling.right.color === "B")
        ) {
          if (sibling) sibling.color = "R";
          node = parent;
          parent = node ? node.parent : null;
        } else {
          if (!sibling.right || sibling.right.color === "B") {
            if (sibling.left) sibling.left.color = "B";
            sibling.color = "R";
            this.rightRotate(sibling);
            sibling = parent.right;
          }
          if (sibling) sibling.color = parent.color;
          parent.color = "B";
          if (sibling && sibling.right) sibling.right.color = "B";
          this.leftRotate(parent);
          node = this.root;
        }
      } else {
        sibling = parent.left;
        if (sibling && sibling.color === "R") {
          sibling.color = "B";
          parent.color = "R";
          this.rightRotate(parent);
          sibling = parent.left;
        }

        if (
          (!sibling.left || sibling.left.color === "B") &&
          (!sibling.right || sibling.right.color === "B")
        ) {
          if (sibling) sibling.color = "R";
          node = parent;
          parent = node ? node.parent : null;
        } else {
          if (!sibling.left || sibling.left.color === "B") {
            if (sibling.right) sibling.right.color = "B";
            sibling.color = "R";
            this.leftRotate(sibling);
            sibling = parent.left;
          }
          if (sibling) sibling.color = parent.color;
          parent.color = "B";
          if (sibling && sibling.left) sibling.left.color = "B";
          this.rightRotate(parent);
          node = this.root;
        }
      }
    }

    if (node) node.color = "B";
  }

  search(val, node = this.root) {
    if (!node) return false;
    if (val === node.val) return true;
    return val < node.val
      ? this.search(val, node.left)
      : this.search(val, node.right);
  }

  preOrderTraversal(node = this.root) {
    if (!node) return;
    process.stdout.write(`${node.val}(${node.color}) `);
    this.preOrderTraversal(node.left);
    this.preOrderTraversal(node.right);
  }

  inOrderTraversal(node = this.root) {
    if (!node) return;
    this.inOrderTraversal(node.left);
    process.stdout.write(`${node.val}(${node.color}) `);
    this.inOrderTraversal(node.right);
  }

  postOrderTraversal(node = this.root) {
    if (!node) return;
    this.postOrderTraversal(node.left);
    this.postOrderTraversal(node.right);
    process.stdout.write(`${node.val}(${node.color}) `);
  }

  displayTree(node = this.root, prefix = "", isLeft = true) {
    if (!node) return;
    if (node.right)
      this.displayTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
    console.log(
      prefix + (isLeft ? "└── " : "┌── ") + node.val + "(" + node.color + ")"
    );
    if (node.left)
      this.displayTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
  }
}

(function driver() {
  const redBlackTree = new RedBlackTree();
  let mode = "insert"; // default mode

  process.stdin.setEncoding("utf8");
  process.stdin.resume();

  const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    black: "\x1b[37m",
  };

  function coloredValue(node) {
    if (!node) return "";
    return (
      (node.color === "R" ? colors.red : colors.black) + node.val + colors.reset
    );
  }

  function displayTree(node = redBlackTree.root, prefix = "", isLeft = true) {
    if (!node) return;
    if (node.right)
      displayTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
    console.log(prefix + (isLeft ? "└── " : "┌── ") + coloredValue(node));
    if (node.left)
      displayTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
  }

  console.log("Red-Black Tree Interactive CLI (Colored Output)");
  console.log(
    "Modes: insert | delete | search | exit\nCommands: preorder | inorder | postorder | levels"
  );
  console.log("You are in INSERT mode by default. Enter a number to insert:");

  process.stdin.on("data", (chunk) => {
    const input = chunk.trim().toLowerCase();

    if (["insert", "delete", "search"].includes(input)) {
      mode = input;
      console.log(`\nSwitched to ${mode.toUpperCase()} mode.`);
      if (mode === "insert") console.log("Enter a number to insert:");
      if (mode === "delete") console.log("Enter a number to delete:");
      if (mode === "search") console.log("Enter a number to search:");
      return;
    }

    if (input === "exit") {
      console.log("\nExiting program...");
      process.exit(0);
    }

    if (input === "preorder") {
      process.stdout.write("\nPre-order traversal: ");
      redBlackTree.preOrderTraversal();
      console.log();
      return;
    }

    if (input === "inorder") {
      process.stdout.write("\nIn-order traversal: ");
      redBlackTree.inOrderTraversal();
      console.log();
      return;
    }

    if (input === "postorder") {
      process.stdout.write("\nPost-order traversal: ");
      redBlackTree.postOrderTraversal();
      console.log();
      return;
    }

    if (input === "levels") {
      console.log(`\nHeight of tree: ${redBlackTree.noOfLevels()}`);
      return;
    }

    const num = parseInt(input, 10);
    if (isNaN(num)) {
      console.log(
        `Invalid input: ${input}. Enter a number, a mode command, or a traversal/levels command.`
      );
      return;
    }

    switch (mode) {
      case "insert":
        redBlackTree.insert(num);
        console.log(`\nInserted ${num}. Current Tree:`);
        displayTree();
        break;

      case "delete":
        redBlackTree.delete(num);
        console.log(`\nDeleted ${num} (if it existed). Current Tree:`);
        displayTree();
        break;

      case "search":
        displayTree();
        if (redBlackTree.search(num)) {
          console.log(`\nValue ${num} exists in the tree.`);
        } else {
          console.log(`\nValue ${num} does NOT exist in the tree.`);
        }
        break;
    }

    console.log(`\n(Current mode: ${mode.toUpperCase()}) Enter next input:`);
  });
})();
