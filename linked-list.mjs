// This function creates a linked list node;
function ListNode(key, value) {
  return { data: { key, value }, next: null };
}

// This function creates a linked list;
function LinkedList() {
  const list = { head: null };

  // This method adds a new node to the end of the list or replaces an existing value;
  const set = (key, value) => {
    let current = list.head;
    if (current === null) {
      list.head = ListNode(key, value);
    } else {
      while (current) {
        if (current.data.key === key) {
          current.data.value = value;
          break;
        } else {
          if (current.next === null) {
            current.next = ListNode(key, value);
            break;
          } else current = current.next;
        }
      }
    }
  };

  // This method returns the value of the node with the specified key;
  const get = (key) => {
    let current = list.head;
    while (current) {
      if (current.data.key === key) return current.data.value;
      else current = current.next;
    }
    return null;
  };

  // This method returns true if the  key is in the list otherwise false;
  const has = (key) => {
    let current = list.head;
    while (current) {
      if (current.data.key === key) return true;
      else current = current.next;
    }
    return false;
  };

  // This method clears the linked list;
  const clear = () => {
    list.head = null;
  };

  // This method removes the node with the key from the list;
  const remove = (key) => {
    let previous = null;
    let current = list.head;
    while (current) {
      if (current.data.key === key) {
        current === list.head
          ? (list.head = current.next)
          : (previous.next = current.next);
        return true;
      } else {
        previous = current;
        current = current.next;
      }
    }
    return false;
  };

  // This method gets all the keys from the nodes;
  const keys = () => {
    let keys = [];
    let current = list.head;
    while (current) {
      keys = [...keys, current.data.key];
      current = current.next;
    }
    return keys;
  };

  // This method gets all the values from the nodes;
  const values = () => {
    let values = [];
    let current = list.head;
    while (current) {
      values = [...values, current.data.value];
      current = current.next;
    }
    return values;
  };

  // This method gets all the key value pairs from the nodes;
  const entries = () => {
    let entries = [];
    let current = list.head;
    while (current) {
      entries = [...entries, [current.data.key, current.data.value]];
      current = current.next;
    }
    return entries;
  };

  // This method returns the total number of nodes in the list;
  const length = () => {
    let count = 0;
    let current = list.head;
    while (current) {
      count += 1;
      current = current.next;
    }
    return count;
  };

  // This method prints the linked list as a string;
  const printBucket = () => {
    let listString = "";
    let current = list.head;
    while (current) {
      listString += `{key: ${current.data.key}, value: ${current.data.value}} -> `;
      current = current.next;
    }
    console.log((listString += current));
  };

  return {
    set,
    get,
    has,
    clear,
    remove,
    keys,
    values,
    entries,
    length,
    printBucket,
  };
}

export { LinkedList };
