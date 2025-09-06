class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insertNode(val) {
    let newNode = new TreeNode(val);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    let prev;
    let curr = this.root;
    while (curr !== null) {
      prev = curr;
      if (newNode.val <= curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    if (newNode.val <= prev.val) {
      prev.left = newNode;
    } else {
      prev.right = newNode;
    }
  }
  deleteNodeMax(root, prev) {
    if (root.right === null) {
      if (prev.right === root) {
        prev.right = root.left;
      } else {
        prev.left = root.left;
      }
      return root.val;
    }
    return this.deleteNodeMax(root.right, root);
  }

  deleteNode(root, val) {
    if (root === null) {
      console.log("Node not found!");
      return root;
    }
    if (val === root.val) {
      if (root.left === null && root.right === null) {
        return null;
      } else if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      } else {
        root.val = this.deleteNodeMax(root.left, root);
      }
    } else if (val < root.val) {
      root.left = this.deleteNode(root.left, val);
    } else {
      root.right = this.deleteNode(root.right, val);
    }
    return root;
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
}
(function driver() {
  const bst = new BST();
  let phase = "insert";

  process.stdin.setEncoding("utf8");
  process.stdin.resume();

  console.log("Enter nodes of the BST (type 'done' when finished):");

  process.stdin.on("data", (chunk) => {
    const userInput = chunk.trim();

    // Handle sentinel value
    if (userInput.toLowerCase() === "done") {
      if (phase === "insert") {
        // Print initial traversals
        console.log("\nInitial Traversals:");
        process.stdout.write("Pre-order: ");
        bst.preOrderTraversal(bst.root);
        console.log();
        process.stdout.write("In-order: ");
        bst.inOrderTraversal(bst.root);
        console.log();
        process.stdout.write("Post-order: ");
        bst.postOrderTraversal(bst.root);
        console.log();

        // Switch to delete phase
        phase = "delete";
        console.log("\nEnter numbers to delete (type 'done' to exit):");
      } else if (phase === "delete") {
        console.log("\nExiting program...");
        process.exit(0);
      }
      return;
    }

    // Insert phase
    if (phase === "insert") {
      const num = parseInt(userInput, 10);
      if (!isNaN(num)) {
        bst.insertNode(num);
      } else {
        console.log(`Invalid input (not an integer): ${userInput}`);
      }
    }

    // Delete phase
    else if (phase === "delete") {
      const num = parseInt(userInput, 10);
      if (!isNaN(num)) {
        bst.root = bst.deleteNode(bst.root, num);
        console.log(`\nDeleted ${num}. Current Traversals:`);
        process.stdout.write("Pre-order: ");
        bst.preOrderTraversal(bst.root);
        console.log();
        process.stdout.write("In-order: ");
        bst.inOrderTraversal(bst.root);
        console.log();
        process.stdout.write("Post-order: ");
        bst.postOrderTraversal(bst.root);
        console.log();
      } else {
        console.log(`Invalid input (not an integer): ${userInput}`);
      }
    }
  });
})();
