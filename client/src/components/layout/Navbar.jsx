import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
    const { user, isAuthenticated, isCheckingAuth, handleLogout } = useAuth();
    const { pathname } = useLocation();

    const userLabel = user?.username || user?.email || "Profile";
    const userInitial = (user?.username?.[0] || user?.email?.[0] || "U").toUpperCase();
    const isAuthRoute = pathname === "/login" || pathname === "/register";
    const isHostingRoute = pathname === "/listings/new";

    function getNavLinkClass(isActive) {
        return `nav-link ${isActive ? "nav-link-active" : ""}`;
    }

    return (
        <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
            <nav
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4"
                aria-label="Main navigation"
            >
                <Link
                    to="/"
                    className="nav-brand"
                    aria-label="Wanderlust home"
                >
                    <span className="nav-brand-mark" aria-hidden="true">
                        <img
                            src="/wanderlustLogo.jpg"
                            alt="logo"
                            className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                    </span>
                    <span className="flex flex-col leading-none">
                        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gray-400">
                            Stay better
                        </span>
                        <span className="text-gradient text-xl sm:text-2xl font-black tracking-tight">
                            Wanderlust
                        </span>
                    </span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-3">
                    {!isCheckingAuth && !isAuthenticated && (
                        <>
                            <Link
                                to="/login"
                                className={getNavLinkClass(pathname === "/login")}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className={isAuthRoute && pathname === "/register" ? "btn-primary shadow-lg shadow-airbnb-pink/20" : "btn-primary"}
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                    {!isCheckingAuth && isAuthenticated && (
                        <>
                            <Link
                                to="/listings/new"
                                className={`${getNavLinkClass(isHostingRoute)} hidden sm:inline-flex`}
                            >
                                <span aria-hidden="true">🏡</span>
                                Become a host
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="btn-ghost rounded-full px-4 py-2.5 font-medium"
                            >
                                Logout
                            </button>
                            
                            <div
                                title={userLabel}
                                className="nav-profile-chip"
                            >
                                <span className="nav-avatar">{userInitial}</span>
                                <span className="hidden md:block max-w-28 truncate text-sm font-semibold text-airbnb-dark">
                                    {userLabel}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
