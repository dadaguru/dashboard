import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { eczar } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { fetchFilteredDadabadisPublished } from '@/app/lib/dadabadidata';

import { MapPinned, Utensils, BedDouble, ThumbsUp} from 'lucide-react';
import { DadabadiTable } from '../lib/dadabadidefinitions';
import Link from 'next/link';
import {DetailDadabadi} from '@/app/components/buttons'
import Image from 'next/image';

const iconMap = {
  socialmediaurl: ThumbsUp,
  maplink: MapPinned,
  bhojanshala: Utensils,
  dharmshala: BedDouble,
};

export default async function CardWrapper({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  let dadabadis = await fetchFilteredDadabadisPublished(query, currentPage);  
  
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers"/> */}
       {dadabadis ?.map((dadabadi) => (
        <Card key={dadabadi.id} dadabadi={dadabadi} title={dadabadi.title} value={dadabadi.titlehin} type="bhojanshala" />
      ))}

      {/* {dadabadis?.map((dadabadi) => (

        (dadabadi.published === 'published') ?
          <><Card key={dadabadi.id} dadabadi={dadabadi} title={dadabadi.title} value={dadabadi.titlehin} type="bhojanshala" /></>
          : null))} */}

    </>
  );
}

export function GetIcon({ 
  type, val
}: { 
  type: 'socialmediaurl' | 'maplink' | 'bhojanshala' | 'dharmshala';
  val:any
}) {
  const Icon = iconMap[type];
  return (    
    <>
    { (val !== '' || val === true) ? 
        <>{Icon ? <Icon className="h-4 w-4 bg-keshar-saffronRedDark text-orange-200 mr-1" /> : null}</>
       : <> </>
    }
    
    </> 
  );
}


export function Card({
  dadabadi,
  title, 
  value,
  type,
}: {
  dadabadi : DadabadiTable
  title: string;
  value: number | string;
  type: 'socialmediaurl' | 'maplink' | 'bhojanshala' | 'dharmshala';
}) {
  const Icon = iconMap[type];
  return (
    <>
      <div className="rounded bg-keshar-saffronRedDark p-2 shadow-sm">
        <div>
          <div className="flex justify-between text-base font-medium text-white">
            <h3 className="ml-1 text-sm font-medium">
              <a href='#'>{dadabadi.titlehin}</a>
            </h3>
            <div className="flex justify-between gap-1 text-base font-medium text-keshar-saffronRedDark">
              <GetIcon type="dharmshala" val={dadabadi.dharmshala} />
              <GetIcon type="bhojanshala" val={dadabadi.bhojanshala} />
              <GetIcon type="socialmediaurl" val={dadabadi.socialmediaurl} />
              <GetIcon type="maplink" val={dadabadi.maplink} />
              
              {/* {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
              {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
              {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
              {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} */}
            </div>
          </div>          
        </div>
        
        <div className="flex py-2">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            {(dadabadi.image1 !== "") ? <Image
              src={dadabadi.image1} width={500} height={500}  alt={dadabadi.title}
              
              className="h-full w-full object-cover object-center"
            /> : <Image
            src='/images/landingpage.jpg'
            alt={dadabadi.title}
            className="h-full w-full object-cover object-center"
          />}
          </div>

          <div className="ml-2 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-white">
                <h3 className="antialiased text-lg font-semibold">
                  <a href='#'>{dadabadi.title}</a>
                </h3>
                {/* <p className="ml-4">20 rs</p> */}
              </div>
              <p className="mt-1 text-sm text-amber-500">{dadabadi.city}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-orange-200">{dadabadi.contactnumber}</p>
              <div className="flex px-1">
              <DetailDadabadi id={dadabadi.id} />
                
                {/* <a href='/detail/'{dadabadi.id} className="text-gray-500 rounded-md bg-gray-50 hover:text-gray-900 hover:bg-gray-100 font-medium text-sm">
                  Detail
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



{/* <div className="rounded overflow-hidden shadow-lg flex flex-col">
            <a href="#"></a>
            <div className="relative"><a href="#">
                    <img className="w-full"
                        src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                        alt="Sunset in the mountains" />
                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>
                </a>
                <a href="#!">
                    <div
                        className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        Cooking
                    </div>
                </a>
            </div>
            <div className="px-6 py-4 mb-auto">
                <a href="#"
                    className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">Simplest
                    Salad Recipe ever</a>
                <p className="text-gray-500 text-sm">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    
                    <span className="ml-1">6 mins ago</span>
                </span>

                <span  className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                        </path>
                    </svg>
                    <span className="ml-1">39 Comments</span>
                </span>
            </div>
        </div> */}