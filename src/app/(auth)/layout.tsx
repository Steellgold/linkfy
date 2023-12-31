export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="grow">
        <section className="relative">
          {/* Illustration */}
          <div
            className="hidden overflow-hidden w-screen md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10"
            aria-hidden="true"
          >
            <svg
              className="max-w-none"
              width="1440"
              height="322"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="98.284%"
                  y1="37.276%"
                  x2="9.488%"
                  y2="37.276%"
                  id="a"
                >
                  <stop stopColor="#6366F1" offset="0%" />
                  <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="100%"
                  y1="37.276%"
                  x2="9.488%"
                  y2="37.276%"
                  id="c"
                >
                  <stop stopColor="#6EE7B7" offset="0%" />
                  <stop stopColor="#6EE7B7" stopOpacity="0" offset="100%" />
                </linearGradient>
                <filter
                  x="-17.6%"
                  y="-34.2%"
                  width="135.1%"
                  height="168.4%"
                  filterUnits="objectBoundingBox"
                  id="b"
                >
                  <feGaussianBlur stdDeviation="50" in="SourceGraphic" />
                </filter>
                <filter
                  x="-23.6%"
                  y="-187.5%"
                  width="147.2%"
                  height="475%"
                  filterUnits="objectBoundingBox"
                  id="d"
                >
                  <feGaussianBlur stdDeviation="50" in="SourceGraphic" />
                </filter>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path
                  fill="url(#a)"
                  filter="url(#b)"
                  d="M262.114 307.493 253 438.5l844.888-307.493L1107 0z"
                  transform="translate(-.085 -152)"
                />
                <path
                  fill="url(#c)"
                  filter="url(#d)"
                  transform="rotate(-20 156.955 105.525)"
                  d="m306.098 141.285-35.583 80h599.417l35.583-80z"
                />
              </g>
            </svg>
          </div>

          {children}
        </section>
      </main>
    </>
  );
}
