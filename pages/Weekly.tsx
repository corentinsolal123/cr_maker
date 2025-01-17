import Navbar from "@/components/Navbar";
import WeeklyForm from "@/components/WeeklyForm";
import Footer from "@/components/Footer";

export default function Weekly() {
    return (
        <>
            <Navbar />
            <div className="p-6 min-h-screen bg-gray-900 text-gray-200 flex justify-center flex-col">
                <h1 className="text-3xl font-extrabold text-center text-gray-100">Rapport Hebdomadaire</h1>
                <p className="text-center text-gray-400 mt-2">
                    Générez ici vos rapports hebdomadaires pour suivre les performances et les tâches réalisées. 🗓️
                </p>
                <div className="form flex justify-center">
                    <WeeklyForm />
                </div>
            </div>
            <Footer/>
        </>
    );
}
