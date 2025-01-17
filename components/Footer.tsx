const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} CSLEnterprise. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;
