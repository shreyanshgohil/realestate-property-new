import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const RenderChildren = ({ content }) => {
  return (
    <div>
      {typeof content === "string" ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <>{content}</>
      )}
    </div>
  );
};

const ToolTip = (props) => {
  // Inits
  const {
    children,
    onChildren = false,
    content: content = null,
    position = "bottom",
    backgroundColor = "#f6f6f6",
    color = "#5e5e5e",
    otherStyles = {},
    anchorSelect = "custom-anchor",
    wrapperProps = {},
    ...otherProps
  } = props;

  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, []);
  //   JSX
  return (
    <div {...wrapperProps}>
      <div className={`${anchorSelect} inline-block`}>
        {onChildren ? (
          children
        ) : (
          <span className="text-xs bg-brand-neutral-200 w-4 h-4 rounded-full flex items-center justify-center text-brand-neutral-900 cursor-pointer">
            ?
          </span>
        )}
      </div>
      <Tooltip
        id={Math.random()}
        anchorSelect={`.${anchorSelect}`}
        className="pros rounded-md mx-2 md:mx-0 max-w-[340px] shadow-[0_4px_16px_0_#1113]"
        place={position}
        clickable={true}
        effect="solid"
        opacity={1}
        noArrow={screenWidth > 768 ? false : true}
        style={{
          backgroundColor: backgroundColor,
          opacity: "1",
          borderRadius: "6px",
          color: color,
          ...otherStyles,
        }}
        {...otherProps}
      >
        <RenderChildren content={content} />
      </Tooltip>
    </div>
  );
};

export default ToolTip;
