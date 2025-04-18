const AnimatedWave = () => {
  return (
    <>
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 390"
        xmlns="http://www.w3.org/2000/svg"
        class="transition duration-300 ease-in-out delay-150"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stop-color="#F78DA7"></stop>
            <stop offset="95%" stop-color="#8ED1FC"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,400 L 0,150 C 113.49282296650719,174.4306220095694 226.98564593301438,198.86124401913875 335,194 C 443.0143540669856,189.13875598086125 545.5502392344497,154.98564593301435 618,145 C 690.4497607655503,135.01435406698565 732.8133971291866,149.19617224880383 820,171 C 907.1866028708134,192.80382775119617 1039.1961722488038,222.2296650717703 1150,220 C 1260.8038277511962,217.7703349282297 1350.401913875598,183.88516746411483 1440,150 L 1440,400 L 0,400 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          fill-opacity="1"
          class="transition-all duration-300 ease-in-out delay-150 path-0"
        ></path>
      </svg>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 490"
        xmlns="http://www.w3.org/2000/svg"
        className="transition duration-300 ease-in-out delay-150"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#F78DA7" />
            <stop offset="95%" stopColor="#8ED1FC" />
          </linearGradient>
        </defs>

        <style>
          {`
            .path-0 {
              animation: pathAnim-0 4s linear infinite;
            }
            @keyframes pathAnim-0 {
              0% { d: path("M 0,500 L 0,125 C 78.85,141.91 157.71,158.82 231,170 C 304.28,181.17 371.98,186.61 455,178 C 538.01,169.38 636.33,146.73 720,117 C 803.66,87.26 872.67,50.45 959,70 C 1045.32,89.54 1148.94,165.44 1232,184 C 1315.05,202.55 1377.52,163.77 1440,125 L 1440,500 L 0,500 Z"); }
              50% { d: path("M 0,500 L 0,125 C 60.36,93.05 120.73,61.10 209,62 C 297.26,62.89 413.41,96.62 510,97 C 606.58,97.37 683.6,64.39 744,69 C 804.4,73.6 848.18,115.77 924,140 C 999.81,164.22 1107.66,170.49 1199,165 C 1290.33,159.5 1365.16,142.25 1440,125 L 1440,500 L 0,500 Z"); }
              100% { d: path("M 0,500 L 0,125 C 78.85,141.91 157.71,158.82 231,170 C 304.28,181.17 371.98,186.61 455,178 C 538.01,169.38 636.33,146.73 720,117 C 803.66,87.26 872.67,50.45 959,70 C 1045.32,89.54 1148.94,165.44 1232,184 C 1315.05,202.55 1377.52,163.77 1440,125 L 1440,500 L 0,500 Z"); }
            }
          `}
        </style>

        <path
          d="M 0,500 L 0,125 C 78.85,141.91 157.71,158.82 231,170 C 304.28,181.17 371.98,186.61 455,178 C 538.01,169.38 636.33,146.73 720,117 C 803.66,87.26 872.67,50.45 959,70 C 1045.32,89.54 1148.94,165.44 1232,184 C 1315.05,202.55 1377.52,163.77 1440,125 L 1440,500 L 0,500 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="0.53"
          className="transition-all duration-300 ease-in-out delay-150 path-0"
        />
      </svg>
    </>
  );
};

export default AnimatedWave;
////////////////////////////////////
