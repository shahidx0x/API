const Task = require("./task.model");
const TaskController = {
  createTask: async (req, res, next) => {
    try {
      const { title, description, dueDate, createdBy } = req.body;
      const newTask = new Task({ title, description, dueDate, createdBy });
      await newTask.save();

      res
        .status(201)
        .json({ message: "Task created successfully", task: newTask });
    } catch (error) {
      next(error);
    }
  },

  getTask: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      let limit = parseInt(req.query.limit, 10) || 10;
      const skip = (page - 1) * limit;
      const taskId = req.query.id;
      const search = req.query.search || "";
      let query = {};
      if (taskId) {
        query.createdBy = taskId;
      }
      if (search) {
        query.title = new RegExp(search, "i");
      }
      let taskList;
      taskList = await Task.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      const totalTask = await Task.countDocuments(query);

      const totalPages = Math.ceil(totalTask / (limit === 0 ? 1 : limit));
      if (totalTask === 0) {
        res.status(200).json({ message: "No Task Found in the database" });
      } else {
        res.status(200).json({
          message: "Tasks fetched successfully",
          meta: {
            total_task: totalTask,
            total_page: totalPages,
            current_page: page,
            limit,
          },

          tasks: taskList,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const { title, description, dueDate, isComplete, createdBy } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description, dueDate, isComplete, createdBy },
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res
        .status(200)
        .json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = TaskController;
