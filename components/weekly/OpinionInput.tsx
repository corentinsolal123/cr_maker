import React from "react";

interface OpinionInputProps {
    opinion: { opinionResult: string; opinionContext: string; opinionComment: string };
    onOpinionChange: (updatedOpinion: { opinionResult: string; opinionContext: string; opinionComment: string }) => void;
}

const OpinionInput: React.FC<OpinionInputProps> = ({ opinion, onOpinionChange }) => {
    return (
        <div className="flex mb-4">
            <input
                type="text"
                placeholder="Contexte de l'avis"
                className="opinion-context w-1/3 p-3 mr-2 border rounded-3xl text-black"
                value={opinion.opinionContext}
                onChange={(e) => onOpinionChange({ ...opinion, opinionContext: e.target.value })}
            />
            <select
                className="opinion-result w-1/3 p-3 mr-2 border rounded-3xl text-black"
                value={opinion.opinionResult}
                onChange={(e) => onOpinionChange({ ...opinion, opinionResult: e.target.value })}
            >
                <option value="bad">Mauvaise</option>
                <option value="average">À améliorer</option>
                <option value="good">Bonne</option>
            </select>
            <input
                type="text"
                placeholder="Commentaire"
                className="opinion-comment w-1/3 p-3 border rounded-3xl text-black"
                value={opinion.opinionComment}
                onChange={(e) => onOpinionChange({ ...opinion, opinionComment: e.target.value })}
            />
        </div>
    );
};

export default OpinionInput;
