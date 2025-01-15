import { useState } from "react";
import Navbar from "@/pages/navbar";

export default function Weekly() {
    const [tasks, setTasks] = useState([{ taskName: "", taskObservation: "" }]);
    const [opinions, setOpinions] = useState([{ opinionResult: "bad", opinionContext: "", opinionComment: "" }]);
    const [summary, setSummary] = useState("");

    const addTask = () => {
        setTasks([...tasks, { taskName: "", taskObservation: "" }]);
    };

    const addOpinion = () => {
        setOpinions([...opinions, { opinionResult: "bad", opinionContext: "", opinionComment: "" }]);
    };

    const generateSummary = (name: string) => {
        let taskTable = `
            <table class="table-auto w-full text-left mt-4">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Tâches à mener</th>
                        <th class="px-4 py-2">Observations</th>
                    </tr>
                </thead>
                <tbody>
        `;

        tasks.forEach((task) => {
            taskTable += `
                <tr>
                    <td class="px-4 py-2">${task.taskName || "Non spécifié"}</td>
                    <td class="px-4 py-2">${task.taskObservation || "Non spécifié"}</td>
                </tr>
            `;
        });

        taskTable += `</tbody></table>`;

        let opinionTable = `
            <table class="table-auto w-full text-left mt-4">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Mon avis</th>
                        <th class="px-4 py-2">Commentaire</th>
                    </tr>
                </thead>
                <tbody>
        `;

        opinions.forEach((opinion) => {
            opinionTable += `
                <tr>
                    <td class="px-4 py-2">${opinion.opinionContext || "Non spécifié"}: 
                        <span class="${opinion.opinionResult === "bad" ? "text-red-500" : opinion.opinionResult === "average" ? "text-yellow-500" : "text-green-500"}">
                            {opinion.opinionResult === "bad" ? "Mauvaise" : opinion.opinionResult === "average" ? "À améliorer" : "Bonne"}
                        </span>
                    </td>
                    <td class="px-4 py-2">${opinion.opinionComment || "Non spécifié"}</td>
                </tr>
            `;
        });

        opinionTable += `</tbody></table>`;

        const completeSummary = `
            <p>Bonjour,</p>
            <p>Vous trouverez ci-dessous les observations de la semaine concernant le travail de <strong>${name}</strong> :</p>
            ${taskTable}
            <h3 class="mt-4 font-semibold text-xl">Mon avis :</h3>
            ${opinionTable}
            <p>Cordialement,</p>
        `;

        setSummary(completeSummary);
    };

    return (
        <>
            <Navbar />
            <div className="p-6 min-h-screen bg-gray-900 text-gray-200">
                <h1 className="text-3xl font-extrabold text-center text-gray-100">Rapport Hebdomadaire</h1>
                <p className="text-center text-gray-400 mt-2">
                    Générez ici vos rapports hebdomadaires pour suivre les performances et les tâches réalisées. 🗓️
                </p>

                <form className="mt-6 container" onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-medium text-gray-200">Nom et Prénom :</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Entrez le nom et prénom"
                            required
                            className="w-full p-2 mt-2 border rounded-3xl text-gray-900"
                        />
                    </div>

                    <div id="tasksContainer">
                        <label className="block text-lg font-medium text-gray-200">Tâches et Observations :</label>
                        {tasks.map((task, index) => (
                            <div key={index} className="flex mb-4">
                                <input
                                    type="text"
                                    placeholder="Tâche"
                                    className="task-name w-1/2 p-2 mr-2 border rounded-3xl"
                                    value={task.taskName}
                                    onChange={(e) => {
                                        const newTasks = [...tasks];
                                        newTasks[index].taskName = e.target.value;
                                        setTasks(newTasks);
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Observation"
                                    className="task-observation w-1/2 p-2 border rounded-3xl"
                                    value={task.taskObservation}
                                    onChange={(e) => {
                                        const newTasks = [...tasks];
                                        newTasks[index].taskObservation = e.target.value;
                                        setTasks(newTasks);
                                    }}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTask}
                            className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 py-2 px-4 rounded-3xl">
                            Ajouter une ligne (Tâches)
                        </button>
                    </div>

                    <div id="opinionsContainer" className="mt-6">
                        <label className="block text-lg font-medium text-gray-200">Avis général :</label>
                        {opinions.map((opinion, index) => (
                            <div key={index} className="flex mb-4">
                                <select
                                    className="opinion-result w-1/3 p-2 mr-2 border rounded-3xl"
                                    value={opinion.opinionResult}
                                    onChange={(e) => {
                                        const newOpinions = [...opinions];
                                        newOpinions[index].opinionResult = e.target.value;
                                        setOpinions(newOpinions);
                                    }}
                                >
                                    <option value="bad" className="bad">Mauvaise</option>
                                    <option value="average" className="average">À améliorer</option>
                                    <option value="good" className="good">Bonne</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Contexte de l'avis"
                                    className="opinion-context w-1/3 p-2 mr-2 border rounded-3xl"
                                    value={opinion.opinionContext}
                                    onChange={(e) => {
                                        const newOpinions = [...opinions];
                                        newOpinions[index].opinionContext = e.target.value;
                                        setOpinions(newOpinions);
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Commentaire"
                                    className="opinion-comment w-1/3 p-2 border rounded-3xl"
                                    value={opinion.opinionComment}
                                    onChange={(e) => {
                                        const newOpinions = [...opinions];
                                        newOpinions[index].opinionComment = e.target.value;
                                        setOpinions(newOpinions);
                                    }}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addOpinion}
                            className="bg-blue-500 text-white py-2 px-4 rounded-3xl hover:bg-blue-600"
                        >
                            Ajouter une ligne (Avis général)
                        </button>
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                const name = (document.getElementById("name") as HTMLInputElement).value.trim();
                                if (!name) {
                                    alert("Veuillez remplir le nom et prénom du collaborateur.");
                                    return;
                                }
                                generateSummary(name);
                            }}
                            className="bg-green-500 text-white py-2 px-4 rounded-3xl hover:bg-green-600"
                        >
                            Générer le récapitulatif
                        </button>
                    </div>
                </form>

                {summary && (
                    <div id="output" className="mt-6 bg-gray-800 p-4 rounded-3xl">
                        <h2 className="text-xl font-semibold text-gray-200">Récapitulatif :</h2>
                        <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: summary }}></div>
                        <button
                            type="button"
                            onClick={() => {
                                navigator.clipboard.writeText(summary).then(() => {
                                    alert("Le récapitulatif a été copié dans le presse-papier !");
                                }).catch((err) => {
                                    console.error("Erreur de copie :", err);
                                    alert("Impossible de copier le texte.");
                                });
                            }}
                            className="bg-blue-500 text-white py-2 px-4 rounded-3xl mt-4 hover:bg-blue-600"
                        >
                            Copier
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
