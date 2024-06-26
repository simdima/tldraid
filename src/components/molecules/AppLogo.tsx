import { Navbar } from 'flowbite-react';

const AppLogo = () => (
  <Navbar.Brand href="/" className="dark:bg-gray-800">
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={70}
      height={70}
      className="-ml-3"
      viewBox="0 0 200.000000 200.000000"
      preserveAspectRatio="xMidYMid meet"
      transform="matrix(1, 0, 0, 1, 0, 0)"
    >
      <g
        transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
        fill="#0891b2"
        stroke="none"
      >
        <path
          d="M544 1651 c-56 -25 -101 -83 -114 -146 -7 -34 -10 -217 -8 -526 l3 -474 28 -47 c18 -31 44 -57 75 -75 l47 -28 415 0 c228 0 427 3 442 8 39 10 95 63 121 111 22 41 22 45 22 546 0 560 3 536 -67 595 -65 55 -64 55 -510 55 -380 0 -416 -2 -454 -19z m443 -151 c217 -11 281 -34 341 -122 41 -61 50 -97 57 -233 8 -147 15 -175 59 -245 20 -30 36 -63 36 -72 0 -22 -38 -48 -71 -48 -23 0 -26 -3 -21 -25 4 -25 3 -25 -63 -25 -82 0 -84 -18 -6 -40 l53 -15 -4 -62 c-3 -52 -9 -68 -33 -93 l-29 -30 -140 0 c-166 1 -295 23 -349 60 -20 14 -46 43 -59 65 -20 36 -23 52 -21 145 1 58 9 209 17 335 9 127 18 274 22 328 6 95 7 98 28 92 11 -3 94 -10 183 -15z m-355 -120 l28 0 -3 -373 c-2 -342 -1 -375 16 -400 22 -35 4 -37 -44 -4 -68 45 -69 52 -69 441 l0 348 23 -6 c12 -3 34 -6 49 -6z"
          fill="#0891b2"
        />
        <path
          d="M1015 1048 c-30 -16 -55 -50 -55 -76 0 -53 48 -102 100 -102 11 0 34 13 52 29 45 40 45 92 0 132 -34 30 -64 36 -97 17z"
          fill="#0891b2"
        />
      </g>
    </svg>
    <span className="-ml-2 self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
      <span>tldr</span>
      <span className="text-cyan-normal">AI</span>
      <span>d</span>
    </span>
  </Navbar.Brand>
);

export default AppLogo;
