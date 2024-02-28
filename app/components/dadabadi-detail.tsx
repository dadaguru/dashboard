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
        <div className="max-w-6xl px-4 mx-auto text-keshar-saffronRedLight">
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
                  <span className="px-2.5 py-1 text-sm bg-orange-200 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                    दादाबाड़ी 
                  </span>
                  <div>
                  <h2 className="max-w-xl mt-6 mb-6 text-keshar-saffronRedDark text-xl font-semibold leading-loose tracking-wide md:text-2xl">
                    {dadabadi.titlehin}
                  </h2>
                  </div>                                   
                  <p className="inline-block mb-6 text-2xl font-semibold">
                    <span className="text-keshar-saffronRedDark">{dadabadi.title}</span>
                    <span className="ml-3 text-base font-normal">
                      {dadabadi.city}
                    </span>
                  </p>
                  <div className="mb-2">
                    <div className="flex gap-3">
                      <span><HandRaisedIcon className="w-5 h-5" /></span>
                      <h2 className="mb-2 text-base">मूलनायक : 
                      <span className="text-lg font-semibold text-keshar-saffronRedDark">
                        {dadabadi.moolnayakname ? dadabadi.moolnayakname : 'Not Available'}
                        </span>
                        </h2>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex gap-3">
                      <span><HandRaisedIcon className="w-5 h-5" /></span>
                      <h2 className="mb-2 text-base">दादागुरु : 
                      <span className="text-lg font-semibold text-keshar-saffronRedDark">
                        {dadabadi.dadaguruname ? dadabadi.dadaguruname : 'Not Available'}
                        </span>
                        </h2>
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
                    <Link href="https://www.dadaguru.in" target="_blank" className="mb-4 text-sm text-amber-500 underline hover:text-blue-600 lg:mb-0" >
                      www.dadaguru.in
                    </Link>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex gap-3">
                    <span><AwardIcon className="w-5 h-5"/></span>
                    <h2 className="mb-2 text-base">Trust : 
                    <span className="text-lg font-semibold text-keshar-saffronRedDark">
                      {dadabadi.trustname ? dadabadi.trustname : 'Not Available'}
                      </span>
                      </h2>
                  </div>                  
                </div>
                <div className="mb-2">
                  <div className="flex gap-3">
                    <UserRound className="w-5 h-5"/>
                  <h2 className="mb-2 text-base">Contact Person : <span className="text-lg font-semibold text-keshar-saffronRedDark">{dadabadi.contactname}</span></h2>
                  </div>                  
                </div>
                <div className="mb-2">
                  <div className="flex gap-3">
                    <PhoneIcon className="w-5 h-5"/>
                    <h2 className="mb-2 text-base">Contact Number : <span className="text-lg font-semibold text-keshar-saffronRedDark">{dadabadi.contactnumber}</span></h2>
                  </div>                  
                </div>
                <div className="mb-4">
                  <h2 className="mb-2 text-base">Address :</h2>
                  <div className="bg-orange-100 rounded-xl">
                    <div className="p-3 lg:p-5 ">
                      <div>
                        <h2 className="text-lg font-semibold text-keshar-saffronRedDark">
                        {dadabadi.address}, {dadabadi.city}, {dadabadi.state}, {dadabadi.pin}
                        </h2> 
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-base">Details :</h2>
                  <div className="bg-orange-100 rounded-xl">
                    <div className="p-3 lg:p-5">                      
                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                          <div className="w-2/5 mb-4">
                            <div className="flex">
                              <span className="mr-3">
                                <Utensils />
                              </span>
                              <div>
                                <p className="mb-2 text-sm font-medium">
                                  भोजनशाला 
                                </p>
                                <h2 className="text-base font-semibold text-keshar-saffronRedDark">
                                  {dadabadi.bhojanshala}
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-2/5 mb-4">
                            <div className="flex ">
                              <span className="mr-3">
                                <Bed />
                              </span>
                              <div>
                                <p className="mb-2 text-sm font-medium">
                                धर्मशाला
                                </p>
                                <h2 className="text-base font-semibold text-keshar-saffronRedDark">
                                  {dadabadi.dharmshala}
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-1 lg:mb-0 md:w-full">
                            <div className="flex content-start">
                              <span className="mr-3">
                                <AtSign className="w-5 h-5" />
                              </span>
                              <div>
                                <p className="mb-1 text-sm font-medium">
                                  Email :
                                </p>
                                <p className="mb-1 text-sm font-medium text-keshar-saffronRedDark">
                                  {dadabadi.email ? dadabadi.email : 'Not Available'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="w-full mb-1 lg:mb-0 md:w-full">
                            <div className="flex content-start">
                              <span className="mr-3">
                                <ThumbsUp className="w-5 h-5" />
                              </span>
                              <div>
                                <p className="mb-1 text-sm font-medium">
                                Social Media Link :
                                </p>
                                <p className="mb-1 text-sm font-medium text-keshar-saffronRedDark">
                                {dadabadi.socialmediaurl ? dadabadi.socialmediaurl : 'Not Available'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="w-full mb-1 lg:mb-0 md:w-full">
                            <div className="flex content-start">
                              <span className="mr-3">
                                <Globe className="w-5 h-5" />
                              </span>
                              <div>
                                <p className="mb-1 text-sm font-medium">
                                Website :
                                </p>
                                <p className="mb-1 text-sm font-medium text-keshar-saffronRedDark">
                                {dadabadi.websiteurl ? dadabadi.websiteurl : 'Not Available'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="w-full mb-1 lg:mb-0 md:w-full">
                            <div className="flex content-start">
                              <span className="mr-3">
                                <MapPinned className="w-5 h-5" />
                              </span>
                              <div>
                                <p className="mb-1 text-sm font-medium">
                                  Google Location Link :
                                </p>
                                <p className="mb-1 text-sm font-medium text-keshar-saffronRedDark">
                                {dadabadi.maplink ? dadabadi.maplink : 'Not Available'}
                                </p>
                              </div>
                            </div>
                          </div>                          
                        </div>                     
                    </div>
                  </div>
                </div>
                <div className="py-4 mb-2 border-t border-keshar-saffronRedLight">
                  <span className="text-base">Event Information :</span>
                  <p className="mt-2 text-sm text-keshar-saffronRedDark">
                    <span>
                      {dadabadi.eventid ? dadabadi.eventid : 'Not Available'}
                    </span>
                  </p>
                </div>
                <div className="py-4 mb-2 border-t border-b border-keshar-saffronRedLight">
                  <span className="text-base">Description / Comments</span>
                  <p className="mt-2 mb-2 text-sm text-keshar-saffronRedDark">
                    <span className="">
                      {dadabadi.description ? dadabadi.description : 'Not Available'}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap py-4 items-center justify-center lg:justify-end border-b border-keshar-saffronRedLight gap-2 mb-6">                 
                  <div className="mb-2">
                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 bg-amber-500 text-keshar-saffronRedDark lg:w-11 hover:text-white hover:bg-keshar-saffronRedLight">
                      <AtSign />
                    </button>
                  </div>
                  <div className="mb-2">
                    <Link href={`${dadabadi.socialmediaurl ? dadabadi.socialmediaurl : "www.google.com"}`} className="flex items-center justify-center w-full h-10 p-2 mr-4 bg-amber-500 text-keshar-saffronRedDark lg:w-11 hover:text-white hover:bg-keshar-saffronRedLight">
                      <ThumbsUp />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <Link href={`${dadabadi.websiteurl ? dadabadi.websiteurl : "www.dadaguru.in"}`} className="flex items-center justify-center w-full h-10 p-2 mr-4 bg-amber-500 text-keshar-saffronRedDark lg:w-11 hover:text-white hover:bg-keshar-saffronRedLight">
                      <Globe />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <Link href={`${dadabadi.maplink ? dadabadi.maplink : "www.dadaguru.in"}`} className="flex items-center justify-center w-full h-10 p-2 mr-4 bg-amber-500 text-keshar-saffronRedDark lg:w-11 hover:text-white hover:bg-keshar-saffronRedLight">
                      <MapPinned />
                    </Link>
                  </div>
                  <div className="mb-2">
                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 bg-amber-500 text-keshar-saffronRedDark lg:w-11 hover:text-white hover:bg-keshar-saffronRedLight">
                      <Star />
                    </button>
                  </div>                  
                </div>
                <div className="flex gap-4 mb-6">
                  <a href="/dadabadis" className="w-full px-4 py-3 text-center text-gray-100 bg-amber-500 text-keshar-saffronRedDark hover:bg-keshar-saffronRedLight hover:text-white rounded-xl">
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


