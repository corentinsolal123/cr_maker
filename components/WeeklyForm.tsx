import React, {useState} from "react";
import TaskList from "./weekly/TaskList";
import OpinionList from "./weekly/OpinionList";

const WeeklyForm: React.FC = () => {
    const [tasks, setTasks] = useState([{taskName: "", taskObservation: ""}]);
    const [opinions, setOpinions] = useState([{opinionResult: "bad", opinionContext: "", opinionComment: ""}]);
    const [summary, setSummary] = useState("");

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
            <p> </p>
            ${taskTable}
            <p> </p>            
            ${opinionTable}
            <p> </p>
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
        const mailBody = encodeURIComponent(summary.replace(/<[^>]*>?/gm, "")); // Supprime les balises HTML pour le corps de l'e-mail.

        const mailtoLink = `mailto:?subject=${mailSubject}&body=${mailBody}`;
        window.location.href = mailtoLink;
    };

    return (
        <form className="mt-6 container" onSubmit={(e) => e.preventDefault()}>
            <div className="name mb-4">
                <label htmlFor="name" className="block text-lg font-medium text-gray-200">
                    Prénom et Nom :
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Prénom Nom"
                    required
                    className="w-1/4 p-3 mt-2 border rounded-3xl text-black"
                />
            </div>

            <TaskList tasks={tasks} setTasks={setTasks}/>

            <OpinionList opinions={opinions} setOpinions={setOpinions}/>

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
        </form>
    );
};

export default WeeklyForm;
