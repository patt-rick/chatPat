import styled, { keyframes } from "styled-components";

export const showNameAnimation = keyframes`
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 25rem;
    height: 35rem;
    bottom: 120%;
    right: 0.5rem;
    opacity: 1;
  }
`;

export const reverseShowNameAnimation = keyframes`
  0% {
    width: 25rem;
    height: 35rem;
    bottom: 120%;
    right: 0.5rem;
  }
  100% {
    width: 0;
    height: 0;
    opacity: 0;
  }
`;

export const Input = styled.input`
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 10px;
    flex-grow: 1;
`;
export const SendMessageWrapper = styled.div`
    padding: 10px 0.6rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px dashed;
    gap: 1rem;
`;
export const SendBtn = styled.button`
    padding: 5px;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Header = styled.div`
    position: sticky;
    top: 0;
    padding: 0.7rem 1rem;
    font-size: 1.2rem;
    border-radius: 20px 20px 0px;
`;
export const TextWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 5px 10px;

    .msg {
        border-radius: 8px 8px 0px;
        padding: 6px 8px;
        margin-left: 2rem;

        span {
            opacity: 0;
            max-height: 0;
            font-size: 0.7rem;
            text-align: right;
            text-align: right;
            display: block;
            transition: opacity 0.5s, max-height 0.5s;
        }
    }
    .msg:hover span {
        opacity: 1;
        max-height: 20px;
    }
`;
export const ReceiveTextWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 5px 10px;

    .msg {
        border-radius: 8px 8px 8px 0px;
        padding: 6px 8px;
        margin-right: 2rem;

        span {
            opacity: 0;
            max-height: 0;
            font-size: 0.7rem;
            text-align: right;
            text-align: right;
            display: block;
            transition: opacity 0.5s, max-height 0.5s;
        }
    }
    .msg:hover span {
        opacity: 1;
        max-height: 20px;
    }
`;

export const ChatWrapper = styled.div`
    font-family: Inter;
    bottom: 2rem;
    right: 2rem;
    width: fit-content;
    gap: 0.5rem;
    margin: 1rem;
    position: fixed;
`;

interface ChatViewProps {
    animate: boolean;
}
export const ChatView = styled.div<ChatViewProps>`
    border-radius: 20px 20px 0px;
    position: absolute;
    bottom: 50%;
    right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    animation: ${(props) => (props.animate ? showNameAnimation : reverseShowNameAnimation)} 0.5s
        ease-out forwards 0s;
`;

export const ChatWidget = styled.div`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    box-shadow: 1px 1px 5px #00000050;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 3;
    padding: 10px;
`;

export const ChatView2 = styled.div`
    overflow: auto;
    position: relative;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */

    &::-webkit-scrollbar {
        width: 0px; /* For Chrome, Safari, and Opera */
    }
`;

export const FileUpload = styled.input.attrs({ type: "file" })`
    display: none;
`;

export const UploadLabel = styled.label`
    display: flex;
    align-items: center;
    color: #aaa;
    font-size: 1.2rem;
    cursor: pointer;
`;

export const ProgressBar = styled.progress`
    border-radius: 0px;
    width: 100%;
    height: 5px;
    position: absolute;
`;

export const CtnBtn = styled.button`
    background-color: transparent;
`;
