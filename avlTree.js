class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}
class AVLTree {
  constructor() {
    this.root = null;
  }
  getHeight(node) {
    return node ? node.height : 0;
  }
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }
  updateHeight(node) {
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }
  leftRotate(root) {
    let newRoot = root.right;
    let temp = newRoot.left;
    newRoot.left = root;
    root.right = temp;
    this.updateHeight(root);
    this.updateHeight(newRoot);
    return newRoot;
  }
  rightRotate(root) {
    let newRoot = root.left;
    let temp = newRoot.right;
    newRoot.right = root;
    root.left = temp;
    this.updateHeight(root);
    this.updateHeight(newRoot);
    return newRoot;
  }
  noOfLevels(root) {
    if (!root) return 0;
    return (
      1 + Math.max(this.noOfLevels(root.left), this.noOfLevels(root.right))
    );
  }
  balanceTree(root) {
    if (!root) return root;
    this.updateHeight(root);

    let balance = this.getBalance(root);

    if (balance > 1) {
      if (this.getBalance(root.left) < 0) {
        root.left = this.leftRotate(root.left); // Left-Right case
      }
      root = this.rightRotate(root);
    }

    if (balance < -1) {
      if (this.getBalance(root.right) > 0) {
        root.right = this.rightRotate(root.right); // Right-Left case
      }
      root = this.leftRotate(root);
    }

    return root;
  }
  insertNode(root, newNode) {
    if (root === null) {
      return newNode;
    }
    if (newNode.val <= root.val) {
      root.left = this.insertNode(root.left, newNode);
    } else {
      root.right = this.insertNode(root.right, newNode);
    }
    return this.balanceTree(root);
  }
  deleteNodeMax(root) {
    if (!root.right) {
      return { newRoot: root.left, maxVal: root.val };
    }
    const { newRoot, maxVal } = this.deleteNodeMax(root.right);
    root.right = newRoot;
    return { newRoot: this.balanceTree(root), maxVal };
  }
  deleteNode(root, val) {
    if (!root) return root;

    if (val < root.val) {
      root.left = this.deleteNode(root.left, val);
    } else if (val > root.val) {
      root.right = this.deleteNode(root.right, val);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      const { newRoot, maxVal } = this.deleteNodeMax(root.left);
      root.val = maxVal;
      root.left = newRoot;
    }

    return this.balanceTree(root);
  }
  preOrderTraversal(root) {
    if (root === null) return;
    process.stdout.write(`${root.val} `);
    this.preOrderTraversal(root.left);
    this.preOrderTraversal(root.right);
  }
  inOrderTraversal(root) {
    if (root === null) return;
    this.inOrderTraversal(root.left);
    process.stdout.write(`${root.val} `);
    this.inOrderTraversal(root.right);
  }
  postOrderTraversal(root) {
    if (root === null) return;
    this.postOrderTraversal(root.left);
    this.postOrderTraversal(root.right);
    process.stdout.write(`${root.val} `);
  }
  displayTree(root, prefix = "", isLeft = true) {
    if (!root) return;
    if (root.right) {
      this.displayTree(root.right, prefix + (isLeft ? "│   " : "    "), false);
    }
    console.log(prefix + (isLeft ? "└── " : "┌── ") + root.val);
    if (root.left) {
      this.displayTree(root.left, prefix + (isLeft ? "    " : "│   "), true);
    }
  }
  searchNode(root, val) {
    if (!root) {
      return false;
    }
    if (root.val === val) {
      return true;
    }
    if (val < root.val) {
      return this.searchNode(root.left, val);
    }
    return this.searchNode(root.right, val);
  }
}

(function driver() {
  const avlTree = new AVLTree();
  let mode = "insert"; // default mode

  process.stdin.setEncoding("utf8");
  process.stdin.resume();

  console.log("AVL Tree Interactive CLI");
  console.log(
    "Modes: insert | delete | search | exit\nCommands: preorder | inorder | postorder | levels"
  );
  console.log("You are in INSERT mode by default. Enter a number to insert:");

  process.stdin.on("data", (chunk) => {
    const input = chunk.trim().toLowerCase();

    // Handle global commands
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
      avlTree.preOrderTraversal(avlTree.root);
      console.log();
      return;
    }

    if (input === "inorder") {
      process.stdout.write("\nIn-order traversal: ");
      avlTree.inOrderTraversal(avlTree.root);
      console.log();
      return;
    }

    if (input === "postorder") {
      process.stdout.write("\nPost-order traversal: ");
      avlTree.postOrderTraversal(avlTree.root);
      console.log();
      return;
    }

    if (input === "levels") {
      console.log(`\nHeight of tree: ${avlTree.noOfLevels(avlTree.root)}`);
      return;
    }

    // Handle numeric input
    const num = parseInt(input, 10);
    if (isNaN(num)) {
      console.log(
        `Invalid input: ${input}. Enter a number, a mode command, or a traversal/levels command.`
      );
      return;
    }

    // Perform action based on current mode
    switch (mode) {
      case "insert":
        avlTree.root = avlTree.insertNode(avlTree.root, new TreeNode(num));
        console.log(`\nInserted ${num}. Current Tree:`);
        avlTree.displayTree(avlTree.root);
        break;

      case "delete":
        avlTree.root = avlTree.deleteNode(avlTree.root, num);
        console.log(`\nDeleted ${num} (if it existed). Current Tree:`);
        avlTree.displayTree(avlTree.root);
        break;

      case "search":
        avlTree.displayTree(avlTree.root);
        if (avlTree.searchNode(avlTree.root, num)) {
          console.log(`\nValue ${num} exists in the tree.`);
        } else {
          console.log(`\nValue ${num} does NOT exist in the tree.`);
        }
        break;
    }

    console.log(`\n(Current mode: ${mode.toUpperCase()}) Enter next input:`);
  });
})();
