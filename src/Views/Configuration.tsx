import EmptyStates from "../components/EmptyStates";
import PageWrapper from "../components/PageWrapper";

const Configuration = () => {
    return (
        <PageWrapper title={"Configuration"} subTitle="Set up your chat widget">
            <div>Configure</div>
            <EmptyStates msg="Very soon" imgToUse="noInternet" />
        </PageWrapper>
    );
};

export default Configuration;
