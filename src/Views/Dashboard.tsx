import Chat from "../components/Chat";
import PageWrapper from "../components/PageWrapper";

const Dashboard = () => {
    return (
        <PageWrapper title={"Dashboard"} subTitle="Check all your statistics here">
            <Chat details={{ name: "Patrick", id: 2786, schoolName: "LIWSCO" }} />
        </PageWrapper>
    );
};

export default Dashboard;
