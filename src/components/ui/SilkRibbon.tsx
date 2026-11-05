export function RibbonOudToSand() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "relative", height: "80px", background: "#F3E8DC", overflow: "hidden" }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: "-2%",
            top: "0",
            width: "104%",
            height: "100%",
            animation: "ribbonFlow 14s ease-in-out infinite alternate",
          }}
        >
          <defs>
            <linearGradient id="rb1" x1="0" x2="1">
              <stop offset="0" stopColor="#B4695A" />
              <stop offset=".55" stopColor="#6B3F35" />
              <stop offset="1" stopColor="#B4695A" />
            </linearGradient>
          </defs>
          <path d="M0 0H1440V46C1200 98 960 12 720 58C480 104 240 14 0 64Z" fill="#2E1A16" />
          <path
            d="M0 64C240 14 480 104 720 58C960 12 1200 98 1440 46V60C1200 114 960 30 720 76C480 122 240 34 0 80Z"
            fill="url(#rb1)"
          />
          <path
            d="M0 88C260 40 470 124 730 80C980 34 1210 114 1440 66"
            fill="none"
            stroke="#C99A5B"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity=".8"
          />
        </svg>
      </div>
    </>
  );
}

export function RibbonOudToIvory() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "relative", height: "80px", background: "#FBF7F2", overflow: "hidden" }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: "-2%",
            top: "0",
            width: "104%",
            height: "100%",
            animation: "ribbonFlow 16s ease-in-out infinite alternate-reverse",
          }}
        >
          <defs>
            <linearGradient id="rb2" x1="0" x2="1">
              <stop offset="0" stopColor="#6B3F35" />
              <stop offset=".5" stopColor="#B4695A" />
              <stop offset="1" stopColor="#6B3F35" />
            </linearGradient>
          </defs>
          <path d="M0 0H1440V40C1180 92 960 20 720 62C470 106 230 10 0 58Z" fill="#2E1A16" />
          <path
            d="M0 58C230 10 470 106 720 62C960 20 1180 92 1440 40V54C1180 108 960 36 720 78C470 122 230 28 0 74Z"
            fill="url(#rb2)"
          />
          <path
            d="M0 84C240 36 480 120 730 82C980 44 1200 110 1440 64"
            fill="none"
            stroke="#C99A5B"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity=".8"
          />
        </svg>
      </div>
    </>
  );
}

export function RibbonToFooter() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "relative", height: "80px", background: "#2E1A16", overflow: "hidden" }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: "-2%",
            top: "0",
            width: "104%",
            height: "100%",
            animation: "ribbonFlow 15s ease-in-out infinite alternate",
          }}
        >
          <defs>
            <linearGradient id="rb3" x1="0" x2="1">
              <stop offset="0" stopColor="#B4695A" />
              <stop offset=".5" stopColor="#6B3F35" />
              <stop offset="1" stopColor="#B4695A" />
            </linearGradient>
          </defs>
          <path d="M0 0H1440V52C1200 100 960 18 720 60C480 102 240 16 0 62Z" fill="#F3E8DC" />
          <path
            d="M0 62C240 16 480 102 720 60C960 18 1200 100 1440 52V66C1200 116 960 34 720 76C480 118 240 32 0 78Z"
            fill="url(#rb3)"
          />
        </svg>
      </div>
    </>
  );
}
