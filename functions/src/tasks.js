import dbConnect from "./dbconnect.js";

export async function getTasks(req, res) {
  const db = dbConnect();
  // db.collection("task").get();
  const collection = await db
    .collection("task")
    .get()
    .catch((err) => res.status(500).send(err));
  const tasks = collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
    // let task = doc.data();
    // task.id = doc.id;
    // return task,
  });
  res.send(tasks);
}

export async function createTask(req, res) {
  const newTask = req.body;
  if (!newTask || !newTask.task) {
    res.status(400).send({ success: false, message: "Invalid request" });
    return;
  }
  const db = dbConnect;
  await db
    .collection("task")
    .add(newTask)
    .catch((err) => res.status(500).send(err));
  res.status(201)
  getTasks(req, res);
  return;
}

export function updateTask(req, res) {
  const taskUpdate = req.body;
  const { taskId } = req.params;
  res.status(202).send("Task Updated");
}

export function deleteTask(req, res) {
  const { taskId } = req.params;
  res.status(203).send("Task Deleted");
}
