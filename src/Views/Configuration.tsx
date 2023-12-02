import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import Tooltip from "@mui/material/Tooltip";

const Configuration = () => {
    const npmScript = "npm install @patt-rick/react-quickchat";
    const yarnScript = "yarn add @patt-rick/react-quickchat";
    const { themeColors } = useContext(ThemeContext);
    const [info, setInfo] = useState<string>("Copy to clipboard");
    const [organisationId, setOrganisationId] = useState<string>("");
    const [organisationName, setOrganisationName] = useState<string>("");

    useEffect(() => {
        const data = localStorage.getItem("ORGANISATION") || "{}";
        JSON.parse(data).id ? setOrganisationId(JSON.parse(data).id) : null;
        JSON.parse(data).name ? setOrganisationName(JSON.parse(data).name) : null;
    }, []);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setInfo("Copied");
            setTimeout(() => {
                setInfo("Copy to clipboard");
            }, 1000);
        } catch (err) {
            setInfo("Not Copied");
        }
    };

    return (
        <PageWrapper title={"Configuration"} subTitle="Set up your chat widget">
            <div style={{ overflow: "auto" }}>
                <h1>Chat widget settings</h1>
                <p>A simple task to start using our live chat in your application</p>
                <h2>Add widget to your React app</h2>
                <div style={{ display: "flex", gap: "7rem" }}>
                    <DivCopy
                        background={themeColors.accentBackground}
                        shadow={themeColors.shadowColor}
                    >
                        <span className="type">npm</span>
                        <Tooltip title={info} placement="top-end">
                            <span onClick={() => copyToClipboard(npmScript)} className="script">
                                {npmScript}
                            </span>
                        </Tooltip>
                    </DivCopy>
                    <DivCopy
                        background={themeColors.accentBackground}
                        shadow={themeColors.shadowColor}
                    >
                        <span className="type">yarn</span>
                        <Tooltip title={info} placement="top-end">
                            <span onClick={() => copyToClipboard(yarnScript)} className="script">
                                {yarnScript}
                            </span>
                        </Tooltip>
                    </DivCopy>
                </div>
                <h3 style={{ marginTop: "4rem" }}>
                    simply follow these to use our awesome chat widget
                </h3>
                <p style={{ width: "70%" }}>
                    This live chat feature is designed specifically for SaaS business owners who
                    desire to provide their customers with consistent and high-quality assistance.
                </p>
                <p>Below is a sample you can use for your account</p>
                <DivCopy background={themeColors.accentBackground} shadow={themeColors.shadowColor}>
                    <span className="script main">
                        <span>{"import React from 'react';"}</span>
                        <span style={{ marginBottom: "2rem" }}>
                            {"import { Chat } from '@patt-rick/react-quickchat'"}
                        </span>
                        <span> {"<Chat"}</span>
                        <span className="one">
                            {"primaryColor=// any hex color or rgb. it is optional"}
                        </span>
                        <span className="one">{"clientDetails={{"}</span>
                        <span className="two">{"clientName: // name of client,"}</span>
                        <span className="two">{"clientId: // any id relating to client,"}</span>
                        <span className="two">
                            {"clientOrgName: // name of organisation of client,"}
                        </span>
                        <span className="one">{"}}"}</span>
                        <span className="one">{"adminDetails={{"}</span>
                        <span className="two">{`adminOrgName: '${organisationName}',`}</span>
                        <span className="two">{`adminOrgId: '${organisationId}',`}</span>
                        <span className="one">{"}}"}</span>
                        <span>{"/>"}</span>
                    </span>
                </DivCopy>
            </div>
        </PageWrapper>
    );
};

export default Configuration;
interface Props {
    background: string;
    shadow: string;
}
const DivCopy = styled.div<Props>`
    display: flex;
    flex-direction: column;
    .type {
        padding: 0.5rem;
    }
    .script {
        box-shadow: inset -5px 6px 21px -21px ${(props: Props) => props.shadow};
        background-color: ${(props: Props) => props.background};
        width: fit-content;
        padding: 0.5rem 2.5rem;
        border-radius: 6px;
        cursor: pointer;
    }
    .script.main {
        width: 50rem;
        display: flex;
        flex-direction: column;
        cursor: text;
    }
    .one {
        padding-left: 2rem;
    }
    .two {
        padding-left: 4rem;
    }
`;
