import { AtSign, AtSignIcon, AwardIcon, Bed, ChevronLeftCircle, ChevronRightCircle, Globe, Heart, HeartIcon, MapPin, MapPinned, PhoneIcon, Star, ThumbsUp, UserRound, Utensils } from "lucide-react";
import { DadabadiForm } from "../lib/dadabadidefinitions";
import Link from "next/link";
import { HandRaisedIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function DadabadiDetail({
  dadabadi
}: {
  dadabadi: DadabadiForm;
}) {

  return (
    <>
      {/* {https://tailgrail.com/tailwind/product-detail/product-detail-style-5} */}
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
       </div><section className="py-10 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 lg:h-96">                  
                  <Image width={500} height={500} src={dadabadi.image1} alt={dadabadi.title} className="object-contain w-full h-full" />
                  {/* <img className="object-contain w-full lg:h-full" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt="" /> */}                    
                </div>
                <div className="relative mb-6 lg:mb-10 lg:h-96">                  
                  <Image width={500} height={500} src={dadabadi.image2} alt={dadabadi.title} className="object-contain w-full h-full" />
                  {/* <img className="object-contain w-full lg:h-full" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt="" /> */}                    
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <span className="px-2.5 py-0.5 text-sm text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                    दादाबाड़ी 
                  </span>
                  <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {dadabadi.titlehin}
                  </h2>                 
                  <p className="inline-block mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>{dadabadi.title}</span>
                    <span className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">
                      {dadabadi.city}
                    </span>
                  </p>
                  <div className="mb-2">
                    <div className="flex gap-3">
                      <span><HandRaisedIcon className="w-5 h-5" /></span>
                      <h2 className="mb-2 text-md font-semibold text-gray-700 dark:text-gray-400">मूलनायक : {dadabadi.moolnayakname}</h2>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex gap-3">
                      <span><HandRaisedIcon className="w-5 h-5" /></span>
                      <h2 className="mb-2 text-md font-semibold text-gray-700 dark:text-gray-400">दादागुरु : {dadabadi.dadaguruname}</h2>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center mb-6">
                    <ul className="flex mb-4 mr-2 lg:mb-0">
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                          </path>
                        </svg>
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                          </path>
                        </svg>
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                          </path>
                        </svg>
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                          </path>
                        </svg>
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                          </path>
                        </svg>
                      </li>
                    </ul>
                    <Link href="https://www.dadaguru.in" target="_blank" className="mb-4 text-xs underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" >
                      www.dadaguru.in
                    </Link>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex gap-3">
                    <span><AwardIcon className="w-5 h-5"/></span>
                    <h2 className="mb-2 text-md font-semibold text-gray-700 dark:text-gray-400">Trust : {dadabadi.trustname}</h2>
                  </div>                  
                </div>
                <div className="mb-2">
                  <div className="flex gap-3">
                    <UserRound className="w-5 h-5"/>
                  <h2 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-400">Contact Person : {dadabadi.contactname}</h2>
                  </div>                  
                </div>
                <div className="mb-2">
                  <div className="flex gap-3">
                    <PhoneIcon className="w-5 h-5"/>
                    <h2 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-400">Contact Number : {dadabadi.contactnumber}</h2>
                  </div>                  
                </div>
                <div className="mb-4">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Address :</h2>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <div className="p-3 lg:p-5 ">
                      <div>
                        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                          {dadabadi.address}, {dadabadi.city}, {dadabadi.state}, {dadabadi.pin}
                        </h2> 
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">System Specs :</h2>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <div className="p-3 lg:p-5">
                      <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                          <div className="w-2/5 mb-4">
                            <div className="flex">
                              <span className="mr-3 text-gray-500 dark:text-gray-400">
                                <Utensils />
                              </span>
                              <div>
                                <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                  भोजनशाला 
                                </p>
                                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                  {dadabadi.bhojanshala}
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-2/5 mb-4">
                            <div className="flex ">
                              <span className="mr-3 text-gray-500 dark:text-gray-400">
                                <Bed />
                              </span>
                              <div>
                                <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                धर्मशाला
                                </p>
                                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                  {dadabadi.dharmshala}
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-1 lg:mb-0 md:w-full">
                            <div className="flex content-start">
                              <span className="mr-3 text-gray-500 dark:text-gray-400">
                                <AtSign className="w-5 h-5" />
                              </span>
                              <div>
                                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Email :
                                </p>
                                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                  {dadabadi.email}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-1 lg:mb-0 md:w-full">
                            <div className="flex content-start">
                              <span className="mr-3 text-gray-500 dark:text-gray-400">
                                <ThumbsUp className="w-5 h-5" />
                              </span>
                              <div>
                                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                Social Media Link :
                                </p>
                                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {dadabadi.socialmediaurl}
                                </p>
                              </div>
                            </div>
                          </div>                          
                          <div className="w-full mb-1 lg:mb-0 md:w-full">
                            <div className="flex content-start">
                              <span className="mr-3 text-gray-500 dark:text-gray-400">
                                <Globe className="w-5 h-5" />
                              </span>
                              <div>
                                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                Website :
                                </p>
                                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {dadabadi.websiteurl}
                                </p>
                              </div>
                            </div>
                          </div>                        
                          <div className="w-full mb-1 lg:mb-0 md:w-full">
                            <div className="flex content-start">
                              <span className="mr-3 text-gray-500 dark:text-gray-400">
                                <MapPinned className="w-5 h-5" />
                              </span>
                              <div>
                                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Google Location Link :
                                </p>
                                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                {dadabadi.maplink}
                                </p>
                              </div>
                            </div>
                          </div>                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                  <span className="text-base text-gray-600 dark:text-gray-400">Event :</span>
                  <p className="mt-2 text-sm text-gray-500">
                    <span className="text-gray-600 dark:text-gray-400">
                      {dadabadi.eventid}
                    </span>
                  </p>
                </div>
                <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                  <span className="text-base text-gray-600 dark:text-gray-400">Description / Comments</span>
                  <p className="mt-2 text-sm text-gray-500">
                    <span className="text-gray-600 dark:text-gray-400">
                      {dadabadi.description}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 mb-6">                 
                  <div className="mb-0">
                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                      <AtSign />
                    </button>
                  </div>
                  <div className="mb-0">
                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                      <ThumbsUp />
                    </button>
                  </div>
                  <div className="mb-0">
                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                      <Globe />
                    </button>
                  </div>
                  <div className="mb-0">
                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                      <MapPinned />
                    </button>
                  </div>
                  <div className="mb-0">
                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                      <Star />
                    </button>
                  </div>                  
                </div>
                <div className="flex gap-4 mb-6">
                  <a href="/dadabadis" className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                    Back to List page</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}


