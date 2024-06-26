import React from "react";

import {
  Circle,
  CircleHalf,
  CircleFull,
  CircleArrowLeft,
  CircleArrowRight,
  CircleX,
  Square,
  PencilPage,
  DownloadIcon,
  LockIcon,
  SearchIcon,
  SquareHalf,
  SquareFull,
  SquareLeftArrow,
  SquareRightArrow,
  SquareX,
  Diamond,
  DiamondHalf,
  DiamondFull,
  DiamondLeft,
  DiamondRight,
  DiamondX,
  Minus,
  DollarBill,
  Astrick,
  Exclamation1,
  Exclamation2,
  Exclamation3,
  QuestionMark,
  InitNote,
  BlankSVG,
} from "../../../../Components/icons";
import { useJournalRefs } from "../../../../Services/Reference";

const iconComponents = {
  "bullet-init-note": InitNote,
  "circle-init-task": Circle,
  "circle-started-task": CircleHalf,
  "circle-completed-task": CircleFull,
  "circle-migrated-task": CircleArrowLeft,
  "circle-delegated-task": CircleArrowRight,
  "circle-cancelled-task": CircleX,
  "square-init-event": Square,
  "square-started-event": SquareHalf,
  "square-completed-event": SquareFull,
  "square-migrated-event": SquareLeftArrow,
  "square-delegated-event": SquareRightArrow,
  "square-cancelled-event": SquareX,
  "diamond-init-appointment": Diamond,
  "diamond-started-appointment": DiamondHalf,
  "diamond-completed-appointment": DiamondFull,
  "diamond-migrated-appointment": DiamondLeft,
  "diamond-delegated-appointment": DiamondRight,
  "diamond-cancelled-appointment": DiamondX,
  "no context": BlankSVG,
  important: Astrick,
  reminder: Exclamation1,
  "reminder-2": Exclamation2,
  "reminder-3": Exclamation3,
  question: QuestionMark,
  money: DollarBill,
  PencilPage,
  DownloadIcon,
  LockIcon,
  SearchIcon,
  Minus,
  Exclamation2,
};

export const getIconComponent = (iconName, styles) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent styles={styles} />;
};

export const FloatingMenu = ({
  floatingMenuPosition,
  closeMenu,
  selectIcon,
  refName,
  getIconName,
  note,
}) => {
  const { data } = useJournalRefs(refName);

  return (
    <div
      className="absolute z-50 h-1/2  flex flex-col w-56 p-2 bg-gray-100 border border-gray-400 rounded"
      style={{
        top: `${floatingMenuPosition.y + 30}px`,
        left: `${floatingMenuPosition.x + 12}px`,
      }}
    >
      <button onClick={closeMenu} className="self-end text-lg p-1">
        &times;
      </button>
      <p className="pb-2 mx-auto text-sm">ADD A TAG</p>
      <div className="flex flex-col items-start mt-2 overflow-scroll">
        {data &&
          data?.map((ref, idx) => {
            if (getIconName(ref) === "reminder") {
              return (
                <button key={`icon_button_${idx}`} className="icon_button">
                  {getIconComponent(getIconName(ref), "h-4")}
                  <label htmlFor="reminder-due-date" className="pl-2 text-left">
                    {getIconName(ref)}
                  </label>
                  <input
                    id="reminder-due-date"
                    type="date"
                    value={note?.due_date?.slice(0, 10)}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      zIndex: -1,
                      left: 150,
                      top: 150,
                    }}
                    onFocus={(event) => event.target.showPicker?.()}
                    onChange={(e) =>
                      selectIcon({ iconId: ref.id, due_date: e.target.value })
                    }
                  />
                </button>
              );
            }

            return (
              <button
                key={`icon_button_${idx}`}
                onClick={() => {
                  selectIcon({ iconId: ref.id });
                }}
                className="icon_button"
              >
                {getIconComponent(getIconName(ref), "h-4")}
                <span className="pl-2 text-left">{getIconName(ref)}</span>
              </button>
            );
          })}
      </div>
    </div>
  );
};
