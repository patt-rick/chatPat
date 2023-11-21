import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../Contexts/ThemeContext";

interface ColorSelectProps {
    value: string;
    onSelect: (x: string) => void;
}
const ColorSelect = (props: ColorSelectProps) => {
    const { themeColors } = useContext(ThemeContext);
    const colors = [
        "#556cd6",
        "#FF5733",
        "#28B463",
        "#3498DB",
        "#F1C40F",
        "#683c7b",
        "#E67E22",
        "#e74c3c",
        "#2ecc71",
        "#9b59b6",
        "#1abc9c",
    ];

    return (
        <>
            <Div style={{ borderColor: themeColors.border }}>
                {colors.map((color) => (
                    <Color
                        onClick={() => props.onSelect(color)}
                        style={{
                            backgroundColor: color,
                            borderColor: themeColors.border,
                            boxShadow: props.value === color ? `0 0 0 4px ${color}` : "",
                        }}
                        key={color}
                    />
                ))}
            </Div>
        </>
    );
};

export default ColorSelect;
const Div = styled.div`
    width: fit-content;
    height: fit-content;
    border-radius: 8px;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 1rem;
    border: 2px solid;
    padding: 1rem;
`;
const Color = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: 4px solid #ddd;
    cursor: pointer;
`;
