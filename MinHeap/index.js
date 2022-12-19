/**
 * Class to represent a MinHeap which is a Priority Queue optimized for fast
 * retrieval of the minimum value. It is implemented using an array but it is
 * best visualized as a tree structure where each 'node' has left and right
 * children except the 'node' may only have a left child.
 * - parent is located at: Math.floor(i / 2);
 * - left child is located at: i * 2
 * - right child is located at: i * 2 + 1
 */
class MinHeap {
    constructor() {
        /**
         * 0th index not used, so null is a placeholder. Not using 0th index makes
         * calculating the left and right children's index cleaner.
         * This also effectively makes our array start at index 1.
         */
        this.heap = [null];
    }

    /**
     * Extracts the min num from the heap and then re-orders the heap to
     * maintain order so the next min is ready to be extracted.
     * 1. Save the first node to a temp var.
     * 2. Pop last node off and set idx1 equal to the popped value.
     * 3. Iteratively swap the old last node that is now at idx1 with it's
     *    smallest child IF the smallest child is smaller than it.
     * - Time: O(log n) logarithmic due to shiftDown.
     * - Space: O(1) constant.
     * @returns {?number} The min number or null if empty.
     */
    extract() { 
        if(this.heap[1] == null){
            return null;
        }
        this.swap(1, this.heap.length-1);
        this.heap.pop;

        let i = 1;
        while(this.heap[i] > this.heap[i*2] ||this.heap[1] > this.heap[i*2]+1){
            this.heap[i*2] <=this.heap[(i*2)+1] ? (this.swap(i, i*2), i = i*2)
            : 
            (this.swap(i, (i * 2) + 1 ), i = (i * 2) +1 )

        }
        return this.heap[i]
    }

    /**
     * Retrieves the top (minimum number) in the heap without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {?number} Null if empty.
     */
    top() {
        return this.heap.length > 1 ? this.heap[1] : null;
    }

    size() { 
        // -1 since ) index is unused
    return this.heap.length - 1;
}
/**
 * Inserts a new number into the heap and reorders heap to maintain order.
 * 1. Push new num to back.
 * 2. Iteratively swap the new num with it's parent while it is smaller than
 *    it's parent.
 * - Time: O(log n) logarithmic due to shiftUp.
 * - Space: O(1) constant.
 * @param {number} num The num to add.
 */
insert(num) {
    // insert at the end
    this.heap.push(num)

    // place num where it needs to go
    if (this.heap.length > 1) {
        let parentIdx = this.heap.length - 1;

        while (parentIdx > 1 && this.heap[Math.floor(parentIdx / 2)] >

            this.heap[parentIdx]) {
            [this.heap[Math.floor(parentIdx / 2)]],
                [this.heap[parentIdx]] = [this.heap[parentIdx]], this.heap[Math.floor(parentIdx / 2)]
            parentIdx = Math.floor(parentIdx / 2)
        }
    }
    return this
}
insert2(num) {
    this.heap.push(num);
    this.shiftUp();
    // .push on array returns the new length
    return this.size();
}

// AKA: siftUp, heapifyUp, bubbleUp to restore order after insert
shiftUp() {
    let idxOfNodeToShiftUp = this.heap.length - 1;

    while (idxOfNodeToShiftUp > 1) {
        const idxOfParent = this.idxOfParent(idxOfNodeToShiftUp);

        const isParentSmallerOrEqual =
            this.heap[idxOfParent] <= this.heap[idxOfNodeToShiftUp];

        // Parent is supposed to be smaller so ordering is complete.
        if (isParentSmallerOrEqual) {
            break;
        }

        this.swap(idxOfNodeToShiftUp, idxOfParent);
        // after swapping the node is at idxOfParent now.
        idxOfNodeToShiftUp = idxOfParent;
    }
}

/**
 * Logs the tree horizontally with the root on the left and the index in
 * parenthesis using reverse inorder traversal.
 */
printHorizontalTree(parentIdx = 1, spaceCnt = 0, spaceIncr = 10) {
    if (parentIdx > this.heap.length - 1) {
        return;
    }

    spaceCnt += spaceIncr;
    this.printHorizontalTree(parentIdx * 2 + 1, spaceCnt);

    console.log(
        " ".repeat(spaceCnt < spaceIncr ? 0 : spaceCnt - spaceIncr) +
        `${this.heap[parentIdx]} (${parentIdx})`
    );

    this.printHorizontalTree(parentIdx * 2, spaceCnt);
}
}


let test = new MinHeap()

test.insert(3)
test.insert(12)
test.insert(6)
test.insert(78)
test.insert(32)
test.insert(25)
test.insert(12)
test.insert(29)
test.insert(04)
// test.isEmpty()
console.log(test.heap)