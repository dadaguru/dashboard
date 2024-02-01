import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { fetchFilteredDadabadis } from '@/app/lib/dadabadidata';

import { MapPinned, Utensils, BedDouble, ThumbsUp} from 'lucide-react';
import { DadabadiTable } from '../lib/dadabadidefinitions';
import Link from 'next/link';
import {DetailDadabadi} from '@/app/components/buttons'

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
  const dadabadis = await fetchFilteredDadabadis(query, currentPage);
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers"/> */}
      {dadabadis?.map((dadabadi) => (
        <Card key={dadabadi.id} dadabadi={dadabadi} title={dadabadi.title} value={dadabadi.titlehin} type="bhojanshala" />
      ))}
      
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
        <>{Icon ? <Icon className="h-6 w-6 bg-gray-200 text-gray-700 p-1 rounded-md border-2 border-gray-600" /> : null}</>
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
      <div className="rounded-xl bg-gray-200 p-2 shadow-sm">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="ml-1 text-sm font-medium">
              <a href='#'>{dadabadi.title}</a>
            </h3>
            <div className="flex justify-between gap-1 text-base font-medium text-gray-900">
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
            {(dadabadi.image1 !== "") ? <img
              src={dadabadi.image1}
              alt='alt'
              className="h-full w-full object-cover object-center"
            /> : <img
            src='/images/landingpage.jpg'
            alt='alt'
            className="h-full w-full object-cover object-center"
          />}
          </div>

          <div className="ml-2 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3 className="antialiased text-lg font-semibold">
                  <a href='#'>{dadabadi.titlehin}</a>
                </h3>
                {/* <p className="ml-4">20 rs</p> */}
              </div>
              <p className="mt-1 text-sm text-gray-500">{dadabadi.city}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500">{dadabadi.contactnumber}</p>
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
