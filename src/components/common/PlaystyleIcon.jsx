import React from "react";
import classNames from "classnames";
import { buildDynamicUrl } from "../utils/utils";

/**
 * PlaystyleIcon component - Displays a playstyle trait icon inside a hexagon
 *
 * @param {Object} props
 * @param {string|number} props.playstyle - Playstyle ID
 * @param {string} props.iconColor - Color for the icon
 * @param {string} props.bgColor - Background color for the hexagon
 * @param {string} props.strokeColor - Color for the hexagon outline
 * @param {boolean} props.isMini - Whether to show a smaller version
 * @param {boolean} props.isIconOnly - Whether to show only the icon without hexagon
 */
const PlaystyleIcon = ({
  playstyle,
  iconColor = "#ffffff",
  bgColor = "#000000",
  strokeColor = "#ffffff",
  isMini = false,
  isIconOnly = false,
}) => {
  const traitImageUrl = buildDynamicUrl("traits", playstyle);
  const filterId = `color-filter-${playstyle}-${Math.random()
    .toString(36)
    .substring(2, 8)}`;

  if (isIconOnly) {
    return (
      <div
        className="relative"
        style={{
          width: isMini ? "2em" : "2.5em",
          height: isMini ? "2em" : "2.5em",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 256 256">
          <defs>
            <filter id={filterId}>
              <feFlood floodColor={iconColor} />
              <feComposite in2="SourceAlpha" operator="in" />
            </filter>
          </defs>
          <image
            href={traitImageUrl}
            x="0"
            y="0"
            width="256"
            height="256"
            filter={`url(#${filterId})`}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative">
      <svg
        className={classNames(
          "svg-container svg-icon svg-icon--size-sm",
          isMini ? "!w-[2em] !h-[2em]" : "!w-[2.5em] !h-[2.5em]"
        )}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
      >
        <defs>
          <filter id={filterId}>
            <feFlood floodColor={iconColor} />
            <feComposite in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
        <path
          d="M12.813,104.953L68.157,21.862H188.143l55.045,83.091L128,235.138Z"
          fillOpacity="1"
          stroke={strokeColor}
          strokeLinejoin="round"
          strokeWidth="8"
          fill={bgColor}
        />
        <image
          href={traitImageUrl}
          x="44"
          y="44"
          width="168"
          height="168"
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  );
};

export default PlaystyleIcon;
