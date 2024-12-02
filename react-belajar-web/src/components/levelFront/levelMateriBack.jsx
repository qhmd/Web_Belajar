import React from "react";


const LevelMateriBack = () => {
    return (
        <div className="flex flex-col items-center gap-5 mt-6 mb-6">
            <div className='w-full flex justify-center'>
                <h1 className="text-2xl font-bold text-center text-black">Tingkatan Materi Back-End</h1>
            </div>
            <div className="flex justify-center gap-6">
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="back-end/pemula">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pemula</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Belajar dasar-dasar pengembangan back-end dengan Node.js. Pahami konsep dasar seperti server, HTTP, dan API. Kuasai penggunaan Express.js untuk membangun aplikasi web.</p>
                <a href="back-end/pemula" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Next
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="back-end/menengah">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Menengah</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Bangun aplikasi back-end yang lebih dinamis dengan RESTful API menggunakan Express.js dan MongoDB. Pelajari tentang autentikasi, middleware, dan pengelolaan database dengan Mongoose.</p>
                <a href="back-end/menengah" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Next
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="back-end/lanjutan">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lanjutan</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Optimalkan performa aplikasi back-end dengan menggunakan teknik advanced seperti GraphQL, WebSocket, dan server-side rendering (SSR). Pelajari juga tentang pengujian back-end menggunakan Jest dan supertest.</p>
                <a href="back-end/lanjutan" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

export default LevelMateriBack; 