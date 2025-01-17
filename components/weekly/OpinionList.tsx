import React from "react";
import OpinionInput from "@/components/weekly/OpinionInput";

interface OpinionListProps {
    opinions: { opinionResult: string; opinionContext: string; opinionComment: string }[];
    setOpinions: React.Dispatch<
        React.SetStateAction<{ opinionResult: string; opinionContext: string; opinionComment: string }[]>
    >;
}

const OpinionList: React.FC<OpinionListProps> = ({ opinions, setOpinions }) => {
    const handleOpinionChange = (
        index: number,
        updatedOpinion: { opinionResult: string; opinionContext: string; opinionComment: string }
    ) => {
        const newOpinions = [...opinions];
        newOpinions[index] = updatedOpinion;
        setOpinions(newOpinions);
    };

    const addOpinion = () => {
        setOpinions([...opinions, { opinionResult: "bad", opinionContext: "", opinionComment: "" }]);
    };

    return (
        <div id="opinionsContainer" className="mt-6">
            <label className="block text-lg font-medium text-gray-200">Avis général :</label>
            {opinions.map((opinion, index) => (
                <OpinionInput
                    key={index}
                    opinion={opinion}
                    onOpinionChange={(updatedOpinion) => handleOpinionChange(index, updatedOpinion)}
                />
            ))}
            <button
                type="button"
                onClick={addOpinion}
                className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 py-2 px-4 rounded-3xl"
            >
                Ajouter une ligne (Avis général)
            </button>
        </div>
    );
};

export default OpinionList;
