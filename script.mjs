import { LinkedList } from "./linked-list.mjs";

// This class creates a hash map data structure, see more comments in linked list module;
class HashMap {
  constructor() {
    this.hashMap = [];
    this.capacity = 16;
  }

  // This method ensures that the hash code is a valid index;
  validateIndex = (index) => {
    if (index < 0 || index >= this.capacity) {
      throw new Error("Trying to access bucket out of bounds");
    }
  };

  // This method hashes the key;
  hash = (key) => {
    if (key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }
      this.validateIndex(hashCode);
      return hashCode;
    } else console.error("ERROR: NO KEY GIVEN!");
  };

  // This function checks whether the proportion of entries to buckets in the hash map has reached the load factor;
  isFullLoad = () => {
    const loadFactor = 0.75;
    const load = this.length() / this.capacity;
    return load > loadFactor;
  };

  // This function increases the number of buckets in the hash map;
  growMap = () => {
    const newMap = [];
    this.capacity = this.capacity * 2;
    const entries = this.entries();
    entries.forEach((entry) => {
      const [key, value] = entry;
      const index = this.hash(key);
      if (newMap[index] === undefined) newMap[index] = LinkedList();
      const bucket = newMap[index];
      bucket.set(key, value);
    });
    this.hashMap = newMap;
  };

  set = (key, value) => {
    const index = this.hash(key);
    if (this.hashMap[index] === undefined) this.hashMap[index] = LinkedList();
    const bucket = this.hashMap[index];
    bucket.set(key, value);
    if (this.isFullLoad()) this.growMap();
  };

  get = (key) => {
    const index = this.hash(key);
    const bucket = this.hashMap[index];
    if (bucket) return bucket.get(key);
    else return null;
  };

  has = (key) => {
    const index = this.hash(key);
    const bucket = this.hashMap[index];
    if (bucket) return bucket.has(key);
    else return false;
  };

  clear = () => {
    this.hashMap.forEach((bucket) => {
      if (bucket) bucket.clear();
    });
  };

  remove = (key) => {
    const index = this.hash(key);
    const bucket = this.hashMap[index];
    if (bucket) return bucket.remove(key);
    else return false;
  };

  keys = () => {
    return this.hashMap.reduce(
      (keys, bucket) => [...keys, ...bucket.keys()],
      []
    );
  };

  values = () => {
    return this.hashMap.reduce(
      (values, bucket) => [...values, ...bucket.values()],
      []
    );
  };

  entries = () => {
    return this.hashMap.reduce(
      (entries, bucket) => [...entries, ...bucket.entries()],
      []
    );
  };

  length = () => {
    return this.hashMap.reduce(
      (count, bucket) => (count += bucket.length()),
      0
    );
  };
}

const test = new HashMap();
test.set("Ngoni", "Loves coding!");
test.get("Ngoni"); // Loves coding!
