// import Arrow from "@/images/icons/arrow.svg";
import { useEffect, useRef, useState } from "react";
import ToolTip from "../ToolTip";
import Image from "next/image";

const labels = {
  weekday_daytime: "Weekday daytime",
  weekday_evening: "Weekday evening",
  weekends: "Weekends",
  OAPs: "OAP",
  ADHD: "ADHD coaching",
  Confidence: "Confidence coaching",
  "Career coaching": "Career development",
  "Stop smoking": "Quit smoking",
  "Face to face": "In person",
};

const AccordionWrapper = ({
  title,
  children,
  index,
  isOpen,
  toggleAccordionHandler,
  attribute = "test",
  tooltip,
  anchorSelect,
  alwaysOpen = false,
  isLast = false,
}) => {
  const accordionRef = useRef(null);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const [accordionHeight, setAccordionHeight] = useState(0);

  const onClickHandler = () => {
    if (alwaysOpen) return;
    toggleAccordionHandler(index);
    setAnimationRunning(true);
  };
  const elementHeight = isOpen
    ? accordionRef?.current?.getBoundingClientRect()?.height || 0
    : accordionRef?.current?.scrollHeight || 0;

  useEffect(() => {
    setAccordionHeight(elementHeight);
    if (title === "Session type") {
      setAccordionHeight(
        accordionRef.current?.getBoundingClientRect()?.height || 0
      );
    }
  }, [elementHeight]);

  //   if (
  //     items.length === 0 &&
  //     attribute !== "test" &&
  //     attribute !== "type_of_session"
  //   ) {
  //     return null;
  //   }

  const getFilterLabel = (item) => {
    let label = null;
    if (attribute === "accessibility") {
      return "Accessible";
    } else if (attribute === "professional_body") {
      return "Member of a professional body";
    } else {
      label = labels[item.label] ? labels[item.label] : item.label;
    }
    return label;
  };

  return (
    <div
      className={`pt-4 ${
        !isLast && "pb-4 border-b-brand-neutral-200 border-b"
      }`}
    >
      <div
        className="cursor-pointer flex items-center justify-between gap-3"
        onClick={onClickHandler}
      >
        <div className="flex items-center gap-2">
          <p className="cursor-pointer font-semibold inline-block text-brand-blue-700">
            {title}
          </p>
          {tooltip && (
            <ToolTip
              content={
                <>
                  <span className="text-brand-neutral-900 font-semibold text-base block">
                    {title}
                  </span>
                  <span className="text-brand-neutral text-sm mt-2 block font-normal">
                    {tooltip}
                  </span>
                </>
              }
              position="right"
              anchorSelect={anchorSelect}
              otherStyles={{ zIndex: 100 }}
              wrapperProps={{ className: "flex items-center justify-center" }}
            />
          )}
        </div>
        <div className="text-brand-neutral-200">
          <Image
            src={"/images/icons/arrow.svg"}
            width={10}
            height={6}
            alt=""
            className={`opacity-30 transition-all duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>
      <div
        onTransitionEnd={() => {
          setAnimationRunning(false);
        }}
        className={`transition-all duration-300 ${
          !isOpen
            ? isAnimationRunning
              ? "overflow-y-clip"
              : "overflow-y-hidden"
            : isAnimationRunning
            ? "overflow-y-clip"
            : "overflow-y-visible"
        }`}
        style={{
          height: isOpen ? elementHeight : alwaysOpen ? elementHeight : 0,
        }}
      >
        <div className="pt-3" ref={accordionRef}>
          {children}
        </div>
      </div>
      {/* {!isOpen && (
        <div>
          <div className="flex flex-wrap items-center gap-1">
            {appliedFilters.slice(0, 2).map((item, index) => {
              const label =
                attribute === "accessibility"
                  ? "Accessible"
                  : labels[item.label]
                  ? labels[item.label]
                  : item.label;
              return (
                <div className="flex">
                  <span className="text-brand-purple text-sm">
                    Hello world
                    {`${getFilterLabel(item)}${
                      appliedFilters[index + 1] ? "," : ""
                    }`}
                  </span>
                </div>
              );
            })}
            {appliedFilters.slice(2, appliedFilters.length).length > 0 && (
              <span className="text-brand-purple text-sm">{`+ ${
                appliedFilters.slice(2, appliedFilters.length).length
              } more`}</span>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AccordionWrapper;
