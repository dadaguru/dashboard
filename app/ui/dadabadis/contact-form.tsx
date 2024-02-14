'use client';
import { createDadabadi } from '@/app/lib/dadabadiactions';
import { useFormState } from 'react-dom';
import { FormEvent, useRef, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() { 
  const ref = useRef<HTMLFormElement>(null)

  const sendEmail = async (e: FormEvent) => {
    console.log("reached here")
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      // Proceed with form submission      
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get("name") as string,
          senderEmail: formData.get("senderEmail") as string,
          senderNumber: formData.get("senderNumber") as string,
          message: formData.get("message") as string
        }),
      });
      const resp = await response.json();
      if (resp.message) {
        formData.set("name", "");
        formData.set("senderEmail", "");
        formData.set("senderNumber", "");
        formData.set("message", "");
        toast(resp.message);
        ref.current?.reset();
      } else {
        toast("Internal server error");
      }
    } catch (error) {
      // Handle validation errors
      console.log("error in try catch ", error);
    }
  }

  return (
    <>
      <ToastContainer />
      <form ref={ref} className="space-y-8" onSubmit={sendEmail} >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your Name
          </label>
          <input type="text" id="name" name="name" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Enter your Name" required maxLength={250} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Enter your email
          </label>
          <input type="email" id="senderEmail" name="senderEmail" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="name@dadaguru.in" required maxLength={500} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Enter your Mobile Number
          </label>
          <input type="text" id="senderNumber" name="senderNumber" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="1234567890" required maxLength={30} />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Enter your message
          </label>
          <textarea id="message" name="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Enter your message or Leave a comment..." maxLength={3000}></textarea>
        </div>
        <button type='submit' className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Send message</button>
      </form>
    </>
  );
}
