import EmptyStates from "../components/EmptyStates";
import PageWrapper from "../components/PageWrapper";

const Dashboard = () => {
    return (
        <PageWrapper title={"Dashboard"} subTitle="Check all your statistics here">
            <div style={{ display: "grid", placeItems: "center" }}>
                <EmptyStates msg="Feature will be delivered soon" imgToUse="notReady" />
            </div>
        </PageWrapper>
    );
};

export default Dashboard;
