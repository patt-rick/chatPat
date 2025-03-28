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
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div className="px-4 lg:px-6">{props.children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageWrapper;
