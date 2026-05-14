import { NavBar } from "@/components/common/nav-bar";
import { Sidebar } from "@/components/common/side-bar";

export default function Dashboard() {
    return (
        <div>
            <NavBar />
            <div>
                <Sidebar />
            </div>
        </div>
    )
}