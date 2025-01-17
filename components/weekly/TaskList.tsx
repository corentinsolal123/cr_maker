import React from "react";
import TaskInput from "@/components/weekly/TaskInput";

interface TaskListProps {
    tasks: { taskName: string; taskObservation: string }[];
    setTasks: React.Dispatch<React.SetStateAction<{ taskName: string; taskObservation: string }[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
    const handleTaskChange = (index: number, updatedTask: { taskName: string; taskObservation: string }) => {
        const newTasks = [...tasks];
        newTasks[index] = updatedTask;
        setTasks(newTasks);
    };

    const addTask = () => {
        setTasks([...tasks, { taskName: "", taskObservation: "" }]);
    };

    return (
        <div id="tasksContainer">
            <label className="block text-lg font-medium text-gray-200">Tâches et Observations :</label>
            {tasks.map((task, index) => (
                <TaskInput
                    key={index}
                    task={task}
                    onTaskChange={(updatedTask) => handleTaskChange(index, updatedTask)}
                />
            ))}
            <button
                type="button"
                onClick={addTask}
                className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 py-2 px-4 rounded-3xl"
            >
                Ajouter une ligne (Tâches)
            </button>
        </div>
    );
};

export default TaskList;
