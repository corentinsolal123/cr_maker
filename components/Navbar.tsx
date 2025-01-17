import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/">
                  <span className="text-2xl text-white font-bold hover:text-gray-400 transition duration-300">
                    CR Maker
                </span>
                </Link>

                {/* Bouton de menu pour mobile */}
                <button
                    className="lg:hidden text-white focus:outline-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="@navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu de navigation */}
                <div className="hidden lg:flex space-x-6" id="navbarNav">
                    <ul className="flex space-x-6 text-lg">
                        {/* Lien vers la page Weekly */}
                        <li>
                            <Link href="/Weekly">
                                <span className="text-white hover:text-gray-400 transition duration-300">Weekly</span>
                            </Link>
                        </li>

                        {/* Lien vers la page Daily */}
                        <li>
                            <Link href="/daily">
                                <span className="text-white hover:text-gray-400 transition duration-300">Daily</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Menu mobile */}
            <div className="lg:hidden collapse navbar-collapse" id="navbarNav">
                <ul className="bg-gray-900 p-4">
                    <li className="my-2">
                        <Link href="/Weekly">
                            <span className="text-white hover:text-gray-400">Weekly</span>
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link href="/daily">
                            <span className="text-white hover:text-gray-400">Daily</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
