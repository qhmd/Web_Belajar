import React from 'react';

const Services = () => {
  return (
    <section className="bg-black py-24 z-[99]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
            Yang Kami Tawarkan
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl">
            Ikuti Alur Pembelajaran Kami
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
          Pelajari Web Development dengan cara yang mudah dan terstruktur dengan kursus yang dipandu oleh para ahli kami.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Front-End Development */}
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      {/* Front-End Icon */}
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 10H4m0 0V6a2 2 0 012-2h12a2 2 0 012 2v4m-14 0l1.106 6.678a2 2 0 001.989 1.664h8.154a2 2 0 001.99-1.664L20 10H4z"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">
                    Front-End Development
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                  Pelajari cara membuat tampilan web yang indah dan interaktif dengan kerangka kerja HTML, CSS, dan JavaScript.
                  </p>
                </div>
              </div>
            </div>

            {/* Back-End Development */}
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      {/* Back-End Icon */}
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h8m0 0l-4-4m4 4l-4 4"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">
                    Back-End Development
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                  Kuasai pengembangan sisi server dengan teknologi seperti Node.js, Express, Laravel, dan lainnya.
                  </p>
                </div>
              </div>
            </div>

            {/* Fullstack Development */}
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      {/* Fullstack Icon */}
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v8m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg leading-6 font-medium text-gray-900">
                    Fullstack Development
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                  Menjadi mahir dalam teknologi front-end dan back-end untuk membangun aplikasi web yang lengkap.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

