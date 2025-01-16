import {useState} from "react";
import Navbar from "@/components/navbar";

export default function Weekly() {
    const [tasks, setTasks] = useState([{taskName: "", taskObservation: ""}]);
    const [opinions, setOpinions] = useState([{opinionResult: "bad", opinionContext: "", opinionComment: ""}]);
    const [summary, setSummary] = useState("");

    const addTask = () => {
        setTasks([...tasks, {taskName: "", taskObservation: ""}]);
    };

    const addOpinion = () => {
        setOpinions([...opinions, {opinionResult: "bad", opinionContext: "", opinionComment: ""}]);
    };

    const generateSummary = (name: string) => {
        let taskTable = `
    <table class="table-auto w-full text-left mt-4 border border-gray-300">
        <thead class="bg-gray-700 text-gray-200">
            <tr>
                <th class="px-4 py-2 border border-gray-300">Tâches à mener</th>
                <th class="px-4 py-2 border border-gray-300">Observations</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
`;

        tasks.forEach((task) => {
            taskTable += `
        <tr>
            <td class="px-4 py-2 border border-gray-300">${task.taskName || "Non spécifié"}</td>
            <td class="px-4 py-2 border border-gray-300">${task.taskObservation || "Non spécifié"}</td>
        </tr>
    `;
        });

        taskTable += `</tbody></table>`;

        let opinionTable = `
    <table class="table-auto w-full text-left mt-4 border border-gray-300">
        <thead class="bg-gray-700 text-gray-200">
            <tr>
                <th class="px-4 py-2 border border-gray-300">Mon avis</th>
                <th class="px-4 py-2 border border-gray-300">Commentaire</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
`;

        opinions.forEach((opinion) => {
            opinionTable += `
        <tr>
            <td class="px-4 py-2 border border-gray-300">${opinion.opinionContext || "Non spécifié"}: 
                <span class="${opinion.opinionResult === "bad" ? "text-red-500" : opinion.opinionResult === "average" ? "text-yellow-500" : "text-green-500"}">
                    <strong>${opinion.opinionResult === "bad" ? "Mauvaise" : opinion.opinionResult === "average" ? "À améliorer" : "Bonne"}</strong>
                </span>
            </td>
            <td class="px-4 py-2 border border-gray-300">${opinion.opinionComment || "Non spécifié"}</td>
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

    const createMail = () => {
        const name = (document.getElementById("name") as HTMLInputElement).value.trim();
        if (!name) {
            alert("Veuillez remplir le nom et prénom du collaborateur.");
            return;
        }

        const mailSubject = encodeURIComponent(`Rapport hebdomadaire - ${name}`);
        const mailBody = encodeURIComponent(summary.replace(/<[^>]*>?/gm, '')); // Supprime les balises HTML pour le corps de l'e-mail.

        const mailtoLink = `mailto:?subject=${mailSubject}&body=${mailBody}`;
        window.location.href = mailtoLink;
    };


    return (
        <>
            <Navbar/>
            <div className="p-6 min-h-screen bg-gray-900 text-gray-200 flex justify-center flex-col">
                <h1 className="text-3xl font-extrabold text-center text-gray-100">Rapport Hebdomadaire</h1>
                <p className="text-center text-gray-400 mt-2">
                    Générez ici vos rapports hebdomadaires pour suivre les performances et les tâches réalisées. 🗓️
                </p>
                <div className="form flex justify-center">
                    <form className="mt-6 container" onSubmit={(e) => e.preventDefault()}>
                        <div className="name mb-4">
                            <label htmlFor="name" className="block text-lg font-medium text-gray-200">Nom et Prénom
                                :</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="NOM Prénom"
                                required
                                className="w-1/4 p-3 mt-2 border rounded-3xl text-black"
                            />
                        </div>

                        <div id="tasksContainer">
                            <label className="block text-lg font-medium text-gray-200">Tâches et Observations :</label>
                            {tasks.map((task, index) => (
                                <div key={index} className="flex mb-4">
                                    <input
                                        type="text"
                                        placeholder="Tâche"
                                        className="task-name w-1/2 p-3 mr-2 border rounded-3xl text-black"
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
                                        className="task-observation w-1/2 p-3 border rounded-3xl text-black"
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
                                    <input
                                        type="text"
                                        placeholder="Contexte de l'avis"
                                        className="opinion-context w-1/3 p-3 mr-2 border rounded-3xl text-black"
                                        value={opinion.opinionContext}
                                        onChange={(e) => {
                                            const newOpinions = [...opinions];
                                            newOpinions[index].opinionContext = e.target.value;
                                            setOpinions(newOpinions);
                                        }}
                                    />
                                    <select
                                        className="opinion-result w-1/3 p-3 mr-2 border rounded-3xl text-black"
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
                                        placeholder="Commentaire"
                                        className="opinion-comment w-1/3 p-3 border rounded-3xl text-black"
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
                                className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 py-2 px-4 rounded-3xl">
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
                </div>

                {summary && (
                    <div id="output" className="mt-6 bg-gray-800 p-4 rounded-3xl">
                        <h2 className="text-xl font-semibold text-gray-200">Récapitulatif :</h2>
                        <div className="text-gray-300" dangerouslySetInnerHTML={{__html: summary}}></div>
                        <button
                            type="button"
                            onClick={createMail}
                            className="bg-purple-500 text-white py-2 px-4 rounded-3xl mt-4 hover:bg-purple-600"
                        >
                            Ouvrir dans Outlook
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
