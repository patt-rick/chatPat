import { Chat } from "@patt-rick/react-quickchat";
// import { Chat } from "../components/Chat";
import PageWrapper from "../components/PageWrapper";
import { theme } from "../theme";

const Dashboard = () => {
    return (
        <PageWrapper title={"Dashboard"} subTitle="Check all your statistics here">
            <Chat
                primaryColor={theme.palette.primary.main}
                clientDetails={{ clientName: "Patrick", clientId: 1, clientOrgName: "LIWSCO" }}
                adminDetails={{ adminOrgName: "Asqii Ltd", adminOrgId: "TfLEpkKvweLc7ygVjkCf" }}
            />
        </PageWrapper>
    );
};

export default Dashboard;
