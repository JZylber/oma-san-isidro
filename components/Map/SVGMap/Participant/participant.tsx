"use client";
import { Tooltip } from "react-tooltip";

interface School {
  name: string;
  acronym: string;
}

interface ParticipantProps {
  school?: School;
  level?: number;
  id: string;
  size?: number;
  selected?: boolean;
}

const Participant = ({
  school,
  level,
  id,
  size = 40,
  selected = false,
}: ParticipantProps) => {
  const backgroundColor = selected ? "#D9F5FC" : "#FEFDF3";
  const color = "#000000";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        data-tooltip-id={id}
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        fill={backgroundColor}
      >
        <rect
          x="2.5"
          y="2.5"
          width="395"
          height="395"
          rx="33.5"
          stroke={color}
          strokeWidth="5"
        />
        <path
          d="M200.333 229.333C182 229.333 166.306 222.806 153.25 209.75C140.194 196.694 133.667 181 133.667 162.667C133.667 144.333 140.194 128.639 153.25 115.583C166.306 102.528 182 96 200.333 96C218.667 96 234.361 102.528 247.417 115.583C260.472 128.639 267 144.333 267 162.667C267 181 260.472 196.694 247.417 209.75C234.361 222.806 218.667 229.333 200.333 229.333ZM67 362.667V316C67 306.556 69.4306 297.875 74.2917 289.958C79.1528 282.042 85.6111 276 93.6667 271.833C110.889 263.222 128.389 256.764 146.167 252.458C163.944 248.153 182 246 200.333 246C218.667 246 236.722 248.153 254.5 252.458C272.278 256.764 289.778 263.222 307 271.833C315.056 276 321.514 282.042 326.375 289.958C331.236 297.875 333.667 306.556 333.667 316V362.667H67ZM100.333 329.333H300.333V316C300.333 312.944 299.569 310.167 298.042 307.667C296.514 305.167 294.5 303.222 292 301.833C277 294.333 261.861 288.708 246.583 284.958C231.306 281.208 215.889 279.333 200.333 279.333C184.778 279.333 169.361 281.208 154.083 284.958C138.806 288.708 123.667 294.333 108.667 301.833C106.167 303.222 104.153 305.167 102.625 307.667C101.097 310.167 100.333 312.944 100.333 316V329.333ZM200.333 196C209.5 196 217.347 192.736 223.875 186.208C230.403 179.681 233.667 171.833 233.667 162.667C233.667 153.5 230.403 145.653 223.875 139.125C217.347 132.597 209.5 129.333 200.333 129.333C191.167 129.333 183.319 132.597 176.792 139.125C170.264 145.653 167 153.5 167 162.667C167 171.833 170.264 179.681 176.792 186.208C183.319 192.736 191.167 196 200.333 196Z"
          fill={color}
        />
        {level && (
          <>
            <rect
              x="247.5"
              y="247.5"
              width="120"
              height="120"
              rx="60"
              fill={backgroundColor}
            />
            <rect
              x="247.5"
              y="247.5"
              width="120"
              height="120"
              rx="60"
              stroke={color}
              strokeWidth="15"
            />
            <foreignObject x="247.5" y="247.5" width="120" height="120">
              <div className="flex justify-center items-center font-montserrat h-full text-[90px]">
                <span>{level}</span>
              </div>
            </foreignObject>
          </>
        )}
        {school && (
          <foreignObject x="2.5" y="2.5" width="395" height="90">
            <div className="flex justify-center items-center font-unbounded h-full text-[80px]">
              <span>{school.acronym}</span>
            </div>
          </foreignObject>
        )}
      </svg>
      {school && level && (
        <foreignObject>
          <Tooltip id={id} place="right">
            <div
              className="flex font-montserrat divide-x-2"
              style={{ fontSize: `${size / 3}px` }}
            >
              <span className="pr-6">{level}</span>
              <span className="pl-6">{school.name}</span>
            </div>
          </Tooltip>
        </foreignObject>
      )}
    </div>
  );
};

export default Participant;
