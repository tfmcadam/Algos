/* 
TODO: Create the DLLNode class and implement the DoublyLinkedList constructor
and the empty methods below the constructor.
*/

class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}

/**
 * A class to represent a doubly linked list and contain all of it's methods.
 * A doubly linked list is a singly linked list that can be traversed in both
 * directions.
 */
class DoublyLinkedList {
    /**
     * Executed when the new keyword is used to construct a new DoublyLInkedList
     * instance that inherits these methods and properties.
     */
    constructor() {
        this.head = null;
        this.tail = null;
    }

    /**
     * Inserts a new node with the given newVal after the node that has the
     * given targetVal as it's data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} targetVal The node data to find.
     * @param {any} newVal Data for the new node.
     * @returns {boolean} Indicates if the new node was added.
     */
    insertAfter(targetVal, newVal) {
        if (this.head == null) {
            return false;
        }
        if (this.tail.data == targetVal) {
            this.insertAtBack(newVal)
            return true;
        }
        let runner = this.head;
        while (runner) {
            if (runner.data == targetVal) {
                let newNode = new ListNode(newVal);
                newNode.next = runner.next;
                newNode.previous = runner;
                runner.next.previous = newNode;
                runner.next = newNode;
                return true;
            }
            runner = runner.next;
        }
        return false
    }
    /**
     * Inserts a new node with the given newVal before the node that has the
     * given targetVal as it's data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} targetVal The node data to find.
     * @param {any} newVal Data for the new node.
     * @returns {boolean} Indicates if the new node was added.
     */
    insertBefore(targetVal, newVal) {
        if (this.head == null) {
            return false;
        }
        if (this.head.data == targetVal) {
            this.insertAtFront(newVal)
            return true;
        }
        let runner = this.head;
        while (runner) {
            if (runner.data == targetVal) {
                let newNode = new ListNode(newVal);
                newNode.previous = runner.previous;
                newNode.next = runner;
                runner.previous.next = newNode;
                runner.previous = newNode;
                return true;
            }
            runner = runner.next;
        }
        return false
    }


    /**
     * Creates a new node and adds it at the front of this list.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {any} data The data for the new node.
     * @returns {DoublyLinkedList} This list.
     */
    insertAtFront(data) {
        let newNode = new ListNode(data);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        newNode.next = this.head;
        this.head = newNode;
        newNode.next.previous = newNode
        return this
    }

    insertAtFront2(data) {
        const newHead = new ListNode(data);

        if (this.isEmpty()) {
            this.head = newHead;
            this.tail = newHead;
            return this;
        }

        this.head.prev = newHead;
        newHead.next = this.head;
        this.head = newHead;
        return this;
    }

    /**
     * Creates a new node and adds it at the back of this list.
     * - Time: O(1) constant. No loop is needed since we have direct access to
     *    the tail.
     * - Space: O(1) constant.
     * @param {any} data The data for the new node.
     * @returns {DoublyLinkedList} This list.
     */
    insertAtBack(data) {
        let newNode = new ListNode(data);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
            return this
        }
        newNode.previous = this.tail;
        this.tail = newNode;
        newNode.previous.next = newNode;
        return this
    }

    /**
     * Removes the middle node in this list.
     * - Time: O(0.5n) -> O(n) linear, n = list length.
     *    Since it's not constant we simplify it to O(n). Without the early
     *    exists, it would not be 0.5n.
     * - Space: O(1) constant.
     * @returns {any} The data of the removed node.
     */
    removeMiddleNode() {
        // when there is only 1 node, it is the middle, remove it.
        if (!this.isEmpty() && this.head === this.tail) {
            const removedData = this.head.data;
            this.head = null;
            this.tail = null;
            return removedData;
        }

        let forwardRunner = this.head;
        let backwardsRunner = this.tail;

        while (forwardRunner && backwardsRunner) {
            if (forwardRunner === backwardsRunner) {
                const midNode = forwardRunner;
                midNode.prev.next = midNode.next;
                midNode.next.prev = midNode.prev;
                return midNode.data;
            }

            // runners passed each other without stopping on the same node, even length, we can exit early
            if (forwardRunner.prev === backwardsRunner) {
                return null;
            }

            forwardRunner = forwardRunner.next;
            backwardsRunner = backwardsRunner.prev;
        }
        return null;
    }

    /**
     * Determines if this list is empty.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean} Indicates if this list is empty.
     */
    isEmpty() {
        return this.head === null;
    }

    /**
     * Converts this list to an array of the node's data.
     * - Time: O(n) linear, n = list length.
     * - Space: O(n) linear, array grows as list length increases.
     * @returns {Array<any>} All the data of the nodes.
     */
    toArray() {
        const vals = [];
        let runner = this.head;

        while (runner) {
            vals.push(runner.data);
            runner = runner.next;
        }
        return vals;
    }

    /**
     * Adds all the given items to the back of this list.
     * @param {Array<any>} items Items to be added to the back of this list.
     * @returns {DoublyLinkedList} This list.
     */
    insertAtBackMany(items = []) {
        items.forEach((item) => this.insertAtBack(item));
        return this;
    }
}

const emptyList = new DoublyLinkedList();

/**************** Uncomment these test lists after insertAtBack is created. ****************/
const singleNodeList = new DoublyLinkedList().insertAtBack(1);
const biNodeList = new DoublyLinkedList().insertAtBack(1).insertAtBack(2);
const firstThreeList = new DoublyLinkedList().insertAtBackMany([1, 2, 3]);
const secondThreeList = new DoublyLinkedList().insertAtBackMany([4, 5, 6]);
const unorderedList = new DoublyLinkedList().insertAtBackMany([
    -5,
    -10,
    4,
    -3,
    6,
    1,
    -7,
    -2,
]);
// firstThreeList.insertAtBack(6, 22)
firstThreeList.insertAfter(8, 2)

console.log(firstThreeList.toArray())