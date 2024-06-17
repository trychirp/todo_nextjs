import Task from "../../../models/Task";
import dbConnect from "../../../utils/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
	const { method } = req;

	// Connect to database
	await dbConnect();

	// Create task
	if (method === "POST") {
		try {
			const newTask = await new Task(req.body).save();
			res
				.status(201)
				.json({ data: newTask, message: "Task added successfully" });
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log(error);
		}
	}

	if (method === "GET") {
		try {
			const tasks = await Task.find().sort({ order: 1 });
			res.status(200).json({ data: tasks });
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log(error);
		}
	}

	if (method === "PUT") {
    try {
      const { tasks } = req.body;
      await Promise.all(
        tasks.map((task, index) => {
          return Task.findByIdAndUpdate(task._id, { order: index });
        })
      );
      res.status(200).json({ message: "Tasks reordered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
};
