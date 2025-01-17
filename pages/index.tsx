import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
                <h1 className="text-5xl font-extrabold">CR Maker</h1>
                <div className="mt-8">
                    <ul className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6">
                        <li>
                            <Link
                                href="/daily"
                                className="block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                            >
                                Planification Quotidienne
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/Weekly"
                                className="block px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                            >
                                Planification Hebdomadaire
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
