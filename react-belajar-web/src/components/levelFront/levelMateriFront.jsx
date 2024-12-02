import React from "react";


const LevelMateriFront = () => {
    return (
        <div className="flex relative flex-col justify-center gap-5 mt-6 mb-6">
            <div className='flex items- justify-center'>
                    <h1 className="text-2xl font-bold text-center text-black">Tingkatan Materi Front-End</h1>
            </div>
            <div className="flex justify-center gap-6">
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="front-end/pemula">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pemula</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Belajar dasar-dasar pengembangan web modern dengan JavaScript. Kuasai HTML, CSS, dan pengenalan JavaScript untuk membangun halaman web interaktif.</p>
                    <a href="front-end/pemula" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="front-end/menengah">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Menengah</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Bangun antarmuka pengguna yang lebih dinamis menggunakan framework populer seperti React.js. Pelajari state management dan komponen yang dapat digunakan ulang.</p>
                    <a href="front-end/menengah" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="front-end/lanjutan">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lanjutan</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Optimalkan performa aplikasi frontend dengan teknik advanced di React seperti server-side rendering (SSR) atau Next.js. Kuasai testing aplikasi menggunakan Jest atau Cypress.</p>
                    <a href="front-end/lanjutan" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LevelMateriFront; 