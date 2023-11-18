import TopNav from "./TopNav";
interface MainWrapperProps {
    children: any;
    title: string;
    subTitle?: string;
}
const PageWrapper = (props: MainWrapperProps) => {
    return (
        <div className="mainPage__wrapper">
            <TopNav title={props.title} subTitle={props.subTitle} />
            {props.children}
        </div>
    );
};

export default PageWrapper;
