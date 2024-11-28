import React, {useContext} from 'react';
import bgImage from '../../images/bg-code.jpg';
// import { AuthContext } from '../../context/AuthContext';
import { useLogin } from '../../context/AuthContext';

const Home = () => {
    const { isLoggedIn } = useLogin();
    console.log(bgImage);
    return (
        <div className="relative isolate px-6 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 z-[-99] overflow-hidden blur-[2px] min-h-screen"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            ></div>

            <div className="max-w-4xl py-32 sm:py-44 relative"> 
                <div className="relative">
                    <h1 className="text-balance text-7xl font-semibold tracking-tight text-white sm:text-7xl">
                        Belajar Web Developer Hanya Di LearningCode
                    </h1>
                    <p className="mt-8 text-pretty max-w-2xl text-lg font-medium text-white sm:text-xl/8">
                        LearningCode adalah salah satu website yang dimana kita dapat belajar tentang Web Developer secara efektif dan mudah dipahami.
                    </p>
                    <div className="mt-10 flex items-center justify-star mx-20">
                        {
                            isLoggedIn ? (
                                null
                            ) : (
                                <a
                                href="/login"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Get started
                                </a>
                            )
                        }
                    </div>
                </div>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            ></div>
        </div>
    );
};

export default Home;
