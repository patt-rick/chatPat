import { SiteHeader } from "./site-header";
interface MainWrapperProps {
    children: any;
    title: string;
    subTitle?: string;
}
const PageWrapper = (props: MainWrapperProps) => {
    return (
        <>
            <SiteHeader title={props.title} />
            <div className="flex flex-1 flex-col h-[calc(100%-50px)]">
                <div className="@container/main flex flex-1 flex-col gap-2 p-4 h-full">
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default PageWrapper;
