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
  noOfLevels(node = this.root) {
    if (!node) return 0;
    return (
      1 + Math.max(this.noOfLevels(node.left), this.noOfLevels(node.right))
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
  insertNode(newNode, node = this.root) {
    if (!node) {
      if (node === this.root) this.root = newNode;
      return newNode;
    }

    if (newNode.val <= node.val) {
      node.left = this.insertNode(newNode, node.left);
    } else {
      node.right = this.insertNode(newNode, node.right);
    }

    const balancedNode = this.balanceTree(node);
    if (node === this.root) this.root = balancedNode;
    return balancedNode;
  }
  deleteNodeMax(root) {
    if (!root.right) {
      return { newRoot: root.left, maxVal: root.val };
    }
    const { newRoot, maxVal } = this.deleteNodeMax(root.right);
    root.right = newRoot;
    return { newRoot: this.balanceTree(root), maxVal };
  }
  deleteNode(val, node = this.root) {
    if (!node) return null;

    if (val < node.val) {
      node.left = this.deleteNode(val, node.left);
    } else if (val > node.val) {
      node.right = this.deleteNode(val, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const { newRoot, maxVal } = this.deleteNodeMax(node.left);
      node.val = maxVal;
      node.left = newRoot;
    }

    const balancedNode = this.balanceTree(node);
    if (node === this.root) this.root = balancedNode;
    return balancedNode;
  }
  preOrderTraversal(node = this.root) {
    if (!node) return;
    process.stdout.write(`${node.val} `);
    this.preOrderTraversal(node.left);
    this.preOrderTraversal(node.right);
  }
  inOrderTraversal(node = this.root) {
    if (!node) return;
    this.inOrderTraversal(node.left);
    process.stdout.write(`${node.val} `);
    this.inOrderTraversal(node.right);
  }
  postOrderTraversal(node = this.root) {
    if (!node) return;
    this.postOrderTraversal(node.left);
    this.postOrderTraversal(node.right);
    process.stdout.write(`${node.val} `);
  }
  displayTree(node = this.root, prefix = "", isLeft = true) {
    if (!node) return;
    if (node.right) {
      this.displayTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
    console.log(prefix + (isLeft ? "└── " : "┌── ") + node.val);
    if (node.left) {
      this.displayTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
    }
  }
  searchNode(val, node = this.root) {
    if (!node) return false;
    if (node.val === val) return true;
    return val < node.val
      ? this.searchNode(val, node.left)
      : this.searchNode(val, node.right);
  }
}

(function driver() {
  const avlTree = new AVLTree();
  let mode = "insert";

  process.stdin.setEncoding("utf8");
  process.stdin.resume();

  console.log("AVL Tree Interactive CLI");
  console.log(
    "Modes: insert | delete | search | exit\nCommands: preorder | inorder | postorder | levels"
  );
  console.log("You are in INSERT mode by default. Enter a number to insert:");

  process.stdin.on("data", (chunk) => {
    const input = chunk.trim().toLowerCase();

    if (["insert", "delete", "search"].includes(input)) {
      mode = input;
      console.log(`\nSwitched to ${mode.toUpperCase()} mode.`);
      return;
    }

    if (input === "exit") {
      console.log("\nExiting program...");
      process.exit(0);
    }

    if (["preorder", "inorder", "postorder", "levels"].includes(input)) {
      switch (input) {
        case "preorder":
          process.stdout.write("\nPre-order traversal: ");
          avlTree.preOrderTraversal();
          console.log();
          break;
        case "inorder":
          process.stdout.write("\nIn-order traversal: ");
          avlTree.inOrderTraversal();
          console.log();
          break;
        case "postorder":
          process.stdout.write("\nPost-order traversal: ");
          avlTree.postOrderTraversal();
          console.log();
          break;
        case "levels":
          console.log(`\nHeight of tree: ${avlTree.noOfLevels()}`);
          break;
      }
      return;
    }

    const num = parseInt(input, 10);
    if (isNaN(num)) {
      console.log(`Invalid input: ${input}.`);
      return;
    }

    switch (mode) {
      case "insert":
        avlTree.insertNode(new TreeNode(num));
        console.log(`\nInserted ${num}. Current Tree:`);
        avlTree.displayTree();
        break;

      case "delete":
        avlTree.deleteNode(num);
        console.log(`\nDeleted ${num} (if it existed). Current Tree:`);
        avlTree.displayTree();
        break;

      case "search":
        avlTree.displayTree();
        console.log(
          avlTree.searchNode(num)
            ? `\nValue ${num} exists in the tree.`
            : `\nValue ${num} does NOT exist in the tree.`
        );
        break;
    }
  });
})();
