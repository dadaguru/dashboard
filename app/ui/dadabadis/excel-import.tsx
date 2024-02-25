'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import { mukta } from '@/app/ui/fonts';
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { uploadDadabadi } from '@/app/lib/dadabadiactions';
import { DadabadiTable } from '@/app/lib/dadabadidefinitions';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function ExcelImport() {
  const [items, setItems] = useState([]);
  const [insertErrors, setInsertErrors] = useState<ValidateFields[]>();
  const [insertSuccess, setInsertSuccess] = useState<ValidateFields[]>();
  
  const insertData = async (data: any) => {
    /* loop through the data rows */
    const tempData = JSON.parse(JSON.stringify(data));
    const tempErrorArray: ValidateFields[] = [];
    const tempSuccessArray: ValidateFields[] = [];
    for (let [index, row] of tempData.entries()) {
      const result = await uploadDadabadi(JSON.parse(JSON.stringify(row)), index);
      console.log("result :", result);
      if (result.errors !== null) {         
        await tempErrorArray.push(result);
      } else {
        await tempSuccessArray.push(result);        
      }
    }
    console.log("tempErrorArray is :", tempErrorArray);
    await setInsertErrors(tempErrorArray);
    console.log("tempErrorArray is :", tempErrorArray);
    await setInsertSuccess(tempSuccessArray);    
  }

  const readExcel = (file: File) => {
    setInsertErrors([]);
    setInsertSuccess([]);
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer"
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { raw: false });
        insertData(data);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d: any) => {
      setItems(d);
    });
  };
  return (
    <>
      <div>
        <form>
          <label htmlFor="file-input-medium" className="sr-only">Choose file</label>
          <input type="file" name="file-input-medium" id="file-input-medium" className="block w-full bg-white text-red border border-keshar-saffronRedDark shadow-sm rounded-lg text-sm focus:z-10 focus:border-amber-500 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none
            file:bg-amber-500 file:border-0
            file:me-2
            file:py-3 file:px-4"
            onChange={(e: any) => {
              const file = e.target.files[0];
              readExcel(file);
            }} />
          <p className="m-2 text-sm text-keshar-saffronRedDark" id="file_input_help">MS Excel (.xlsx) files only.</p>
          {insertSuccess && (
            <>
              <div className='mt-4 mb-4'>
                <label>Data uploaded successfully</label>               
              </div>
              {insertSuccess.map((succ, index) => (
                <div key={index} className="mb-2 text-xs">
                  <p>
                    Data inserted at Row no. <span>{succ.index + 1}</span>
                  </p>
                </div>
              ))}              
            </>
          )}

          {insertErrors && (
            <>
              <div className='mt-4 mb-4'>
                <label>Error in data of excel file</label>               
              </div>
              {insertErrors.map((err, index) => (
                <div key={index} className="mb-2 text-xs">
                  <p>
                    Error at Row no. <span>{err.index + 1}</span>
                  </p>                  
                  <>
                    {Object.entries(err.errors).map(([key, value]) => (
                      <div key={key}>
                        <p>
                          {key} : {err.errors[key]}
                        </p>
                      </div>
                    ))}
                  </>
                </div>
              ))}              
            </>
          )}

        </form>
      </div>
    </>

  );
}


interface ValidateFields {
  errors: any; message: string; index: number;
}
