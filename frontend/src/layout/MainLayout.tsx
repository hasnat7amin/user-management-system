import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />
            {/* Main Content */}
            <main className="container mx-auto px-6 py-6">{children}</main>
        </div>
    );
};

export default Layout;
