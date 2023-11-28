import { theme } from "../../theme";

const Logo = () => {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            viewBox="0 0 220.000000 197.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <g
                transform="translate(0.000000,197.000000) scale(0.100000,-0.100000)"
                fill={theme.palette.primary.main}
                stroke="none"
            >
                <path
                    d="M563 1785 c-183 -50 -325 -195 -368 -376 -18 -79 -22 -718 -4 -815
       15 -83 61 -173 121 -239 64 -70 119 -108 205 -143 l68 -27 726 -3 726 -3 6
       347 c11 557 9 789 -8 869 -21 99 -58 167 -133 247 -71 75 -162 127 -260 147
       -84 17 -1012 14 -1079 -4z"
                />
            </g>
        </svg>
    );
};

export default Logo;
