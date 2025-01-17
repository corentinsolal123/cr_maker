import React from "react";

interface TaskInputProps {
    task: { taskName: string; taskObservation: string };
    onTaskChange: (updatedTask: { taskName: string; taskObservation: string }) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ task, onTaskChange }) => {
    return (
        <div className="flex mb-4">
            <input
                type="text"
                placeholder="Tâche"
                className="task-name w-1/2 p-3 mr-2 border rounded-3xl text-black"
                value={task.taskName}
                onChange={(e) => onTaskChange({ ...task, taskName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Observation"
                className="task-observation w-1/2 p-3 border rounded-3xl text-black"
                value={task.taskObservation}
                onChange={(e) => onTaskChange({ ...task, taskObservation: e.target.value })}
            />
        </div>
    );
};

export default TaskInput;
