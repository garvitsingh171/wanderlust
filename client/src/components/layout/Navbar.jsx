import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
    const { user, isAuthenticated, isCheckingAuth, handleLogout } = useAuth();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-airbnb-border shadow-elevated">
            <nav
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
                aria-label="Main navigation"
            >
                <Link
                    to="/"
                    className="text-2xl font-bold text-gradient hover:opacity-80 transition-all flex items-center gap-2"
                >
                    <span className="text-3xl">🏠</span>
                    Wanderlust
                </Link>
                <div className="flex items-center gap-2 sm:gap-6">
                    {!isCheckingAuth && !isAuthenticated && (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 font-medium hover:text-airbnb-pink transition-colors"
                            >
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary">
                                Sign up
                            </Link>
                        </>
                    )}
                    {!isCheckingAuth && isAuthenticated && (
                        <>
                            <Link
                                to="/listings/new"
                                className="hidden sm:block text-gray-700 font-medium hover:text-airbnb-pink hover:bg-airbnb-light px-4 py-2 rounded-lg transition-all"
                            >
                                🏡 Become a host
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="btn-ghost"
                            >
                                Logout
                            </button>
                            
                            <button
                                type="button"
                                title={
                                    user?.username || user?.email || "Profile"
                                }
                                className="h-10 w-10 rounded-full border border-airbnb-border bg-airbnb-light text-airbnb-dark font-semibold"
                            >
                                {(
                                    user?.username?.[0] ||
                                    user?.email?.[0] ||
                                    "U"
                                ).toUpperCase()}
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
