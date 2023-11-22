import EmptyStates from "../components/EmptyStates";
import PageWrapper from "../components/PageWrapper";

const Configuration = () => {
    return (
        <PageWrapper title={"Configuration"} subTitle="Set up your chat widget">
            <div style={{ display: "grid", placeItems: "center" }}>
                <EmptyStates msg="Feature will be delivered soon" imgToUse="notReady" />
            </div>
        </PageWrapper>
    );
};

export default Configuration;
