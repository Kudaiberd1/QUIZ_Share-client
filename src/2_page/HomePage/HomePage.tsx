import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";

const HomePage = () => {
    return (
        <div className={`flex min-h-screen`}>
            <Sidebar />
            <div className={"flex-1 flex flex-col"}>
                <Navbar />
                <main className={"py-13 px-16 ms-3 me-10 my-3 h-full"}>
                    <p className={"text-5xl"}> Hello </p>
                </main>
            </div>
        </div>
    );
}

export default HomePage;