import React, { useEffect, useRef } from "react";

export function PieChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const total = data.active + data.inactive;
    const activePercentage = (data.active / total) * 100;

    if (chartRef.current) {
      const circle = chartRef.current.querySelector(".progress-ring");
      const circumference = 2 * Math.PI * 40;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset =
        circumference - (activePercentage / 100) * circumference;
    }
  }, [data]);

  return (
    <div
      className="relative h-full w-full flex items-center justify-center"
      ref={chartRef}
    >
      <div className="relative w-full max-w-[300px] aspect-square">
        <svg
          viewBox="0 0 100 100"
          className="transform -rotate-90 w-full h-full"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient
              id="blueGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: "#48A6A7" }} />
              <stop offset="100%" style={{ stopColor: "#48A6A7" }} />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#DBDBDB"
            strokeWidth="20"
            className="transition-all duration-1000 ease-in-out"
          />

          {/* Active students segment with gradient */}
          <circle
            className="progress-ring transition-all duration-1000 ease-in-out"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="url(#blueGradient)"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Center text group */}
          <g transform="rotate(90 50 50)" className="drop-shadow-sm">
            <text
              x="50"
              y="45"
              textAnchor="middle"
              className="text-sm font-bold fill-gray-500"
            >
              {Math.round((data.active / (data.active + data.inactive)) * 100)}%
            </text>
            <text
              x="50"
              y="65"
              textAnchor="middle"
              className="text-sm fill-gray-500"
            >
              Active
            </text>
          </g>
        </svg>
      </div>

      {/* Enhanced Legend */}
      <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-8 text-sm  p-4 ">
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm">
          <div className="w-3 h-3 rounded-full bg-[#48A6A7]"></div>
          <span className="text-gray-700 font-medium">
            Active ({data.active.toLocaleString()})
          </span>
        </div>
        <div className="flex items-center gap-3  bg-white px-4 py-2 rounded-full shadow-sm">
          <div className="w-3 h-3 rounded-full bg-[#DBDBDB]"></div>
          <span className="text-gray-700 font-medium">
            Inactive ({data.inactive.toLocaleString()})
          </span>
        </div>
      </div>
    </div>
  );
}
