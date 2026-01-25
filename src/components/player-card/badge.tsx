import type { CSSProperties } from "react";

type PlayStyleBadgeProps = {
    shapeId: string;
    filterId: string;
    iconUrl: string;
};

export function PlayStyleBadge({
    iconUrl,
    shapeId,
    filterId
}: PlayStyleBadgeProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="45"
            preserveAspectRatio="xMidYMid meet"
        >
            <use href={`#${shapeId}`} />
            <image
                href={iconUrl}
                x="22"
                y="18"
                width="55"
                height="55"
                filter={`url(#${filterId})`}
                preserveAspectRatio="xMidYMid meet"
            />
        </svg>
    );
}

type StatBadgeProps = {
    text: string;
    color?: string;
    shapeId: string;
};

export function StatBadge({ text, color, shapeId }: StatBadgeProps) {

    return (
        <svg width="100" viewBox="0 0 200 100" style={{ display: "inline-block" }}>
            <use href={`#${shapeId}`} />
            <text
                x={45}
                y={30}
                fontSize="1.9em"
                fill={color || "white"}
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ whiteSpace: "nowrap" }}
            >
                {text}
            </text>
        </svg>
    );
}
