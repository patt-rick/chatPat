// import { Chat } from "@patt-rick/react-quickchat";
import { Chat } from "../components/Chat";
import PageWrapper from "../components/PageWrapper";
import { theme } from "../theme";

const Dashboard = () => {
    return (
        <PageWrapper title={"Dashboard"} subTitle="Check all your statistics here">
            <Chat
                primaryColor={theme.palette.primary.main}
                details={{ userName: "Patrick", userId: 2786, orgName: "LIWSCO", orgId: "1" }}
            />
        </PageWrapper>
    );
};

export default Dashboard;
