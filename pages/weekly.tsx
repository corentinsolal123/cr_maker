import { useState } from 'react';
import Navbar from "@/pages/navbar";

type WeeklyParticipant = {
    name: string;
    status: 'X' | 'ABS';
    summary: string;
};

export default function Weekly() {
    const [participants, setParticipants] = useState<WeeklyParticipant[]>([]);

    const addParticipant = () => {
        setParticipants([...participants, { name: '', status: 'X', summary: '' }]);
    };

    const updateParticipant = (index: number, field: string, value: string) => {
        const updated = [...participants];
        updated[index] = { ...updated[index], [field]: value };
        setParticipants(updated);
    };

    const generateReport = () => {
        console.log('Weekly Report:', participants);
        alert('Rapport hebdomadaire généré avec succès ! 📊');
    };

    return (
        <>
            <Navbar/>
            <div className="p-6 min-h-screen bg-gray-900 text-gray-200">
                <h1 className="text-3xl font-extrabold text-center text-gray-100">CR Weekly</h1>
                <p className="text-center text-gray-400 mt-2">
                    Ajoutez les participants et leur résumé hebdomadaire pour générer un rapport complet. 🗓️
                </p>
                <div className="space-y-6 mt-6">
                    {participants.map((participant, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 items-center bg-gray-800 shadow-md p-4 rounded-lg"
                        >
                            <input
                                type="text"
                                placeholder="Nom"
                                value={participant.name}
                                onChange={(e) =>
                                    updateParticipant(index, 'name', e.target.value)
                                }
                                className="w-full sm:w-auto flex-1 p-2 border border-gray-700 bg-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={participant.status}
                                onChange={(e) =>
                                    updateParticipant(index, 'status', e.target.value)
                                }
                                className="w-full sm:w-auto flex-1 p-2 border border-gray-700 bg-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="X">Présent(e)</option>
                                <option value="ABS">Absent(e)</option>
                            </select>
                            <textarea
                                placeholder="Résumé de la semaine"
                                value={participant.summary}
                                onChange={(e) =>
                                    updateParticipant(index, 'summary', e.target.value)
                                }
                                className="w-full sm:w-auto flex-1 p-2 border border-gray-700 bg-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <button
                        onClick={addParticipant}
                        className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        Ajouter un participant
                    </button>
                </div>
                <button
                    onClick={generateReport}
                    className="w-full sm:w-auto mt-6 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    Générer le rapport hebdomadaire
                </button>
                <div className="mt-10">
                    <h2 className="text-lg font-semibold text-gray-100">Récapitulatif :</h2>
                    {participants.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full mt-4 border-collapse border border-gray-700">
                                <thead>
                                <tr className="bg-gray-800">
                                    <th className="border border-gray-700 px-4 py-2">Nom</th>
                                    <th className="border border-gray-700 px-4 py-2">Présent(e)</th>
                                    <th className="border border-gray-700 px-4 py-2">Résumé</th>
                                </tr>
                                </thead>
                                <tbody>
                                {participants.map((participant, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-700 px-4 py-2">
                                            {participant.name || 'Non spécifié'}
                                        </td>
                                        <td className="border border-gray-700 px-4 py-2">
                                            {participant.status === 'X' ? 'Oui' : 'Non'}
                                        </td>
                                        <td className="border border-gray-700 px-4 py-2">
                                            {participant.summary || '-'}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-400 mt-4">Aucun participant ajouté pour l'instant.</p>
                    )}
                </div>
            </div>
        </>
    );
}
