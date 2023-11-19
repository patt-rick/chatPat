import EmptyStates from "../components/EmptyStates";
import PageWrapper from "../components/PageWrapper";

const Dashboard = () => {
    return (
        <PageWrapper title={"Dashboard"} subTitle="Check all your statistics here">
            <div>Start</div>
            <EmptyStates msg="The little brown fox" imgToUse="notReady" />
        </PageWrapper>
    );
};

export default Dashboard;
