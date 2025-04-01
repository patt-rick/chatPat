import { Chat } from "@patt-rick/react-quickchat";
import PageWrapper from "../components/PageWrapper";
import EmptyStates from "../components/EmptyStates";

const Dashboard = () => {
    return (
        <PageWrapper title={"Dashboard"} subTitle="Check all your statistics here">
            <div style={{ display: "grid", placeItems: "center" }}>
                <EmptyStates msg="Feature will be delivered soon" imgToUse="notReady" />
            </div>
            <Chat
                primaryColor={"teal"}
                clientDetails={{
                    clientName: "Emmanuel",
                    clientId: 6,
                    clientOrgName: "UPSA",
                }}
                adminDetails={{
                    adminOrgName: "Jeskin Org",
                    adminOrgId: "8v7EuKA4UYIyCzBwkei7",
                }}
            />
        </PageWrapper>
    );
};

export default Dashboard;
