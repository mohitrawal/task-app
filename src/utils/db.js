const DB_NAME = 'taskManagerDB';
const DB_VERSION = 1;
const STORE_NAME = 'tasks';

let db = null;

export const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            reject('Database error: ' + event.target.error);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };
    });
};

export const addTask = (task) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(task);

        request.onsuccess = () => resolve(task);
        request.onerror = () => reject(request.error);
    });
};

export const updateTask = (task) => {
    const taskUpdated = JSON.parse(JSON.stringify(task)); // quick fix
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(taskUpdated);

        request.onsuccess = () => resolve(task);
        request.onerror = () => reject(request.error);
    });
};

export const deleteTask = (taskId) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(taskId);

        request.onsuccess = () => resolve(taskId);
        request.onerror = () => reject(request.error);
    });
};

export const getAllTasks = () => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};