'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageViewer from '@/components/ImageViewer';

export default function Home() {
  const [showAccordion, setShowAccordion] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<boolean[]>([]);
  const [docId, setDocId] = useState("SF-2024-0001");
  const [formCount, setFormCount] = useState(1);

  // Reset accordion states when form count changes
  useEffect(() => {
    setOpenAccordions(new Array(formCount).fill(false));
  }, [formCount]);

  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev => prev.map((state, i) => i === index ? !state : state));
  };

  const renderAccordion = (index: number) => (
    <div key={index} className="w-full border-t border-gray-100">
      <button
        onClick={() => toggleAccordion(index)}
        className={`w-full mt-8 p-6 flex items-center justify-between text-[#111827] font-medium bg-white rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50/80 transition-all duration-500 group hover:scale-[1.01] ${openAccordions[index] ? 'shadow-lg ring-1 ring-gray-100' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full bg-[#111827] transition-all duration-500 ${openAccordions[index] ? 'scale-150 animate-pulse' : ''}`} />
          <span className={`text-lg group-hover:text-[#111827] transition-all duration-300 ${openAccordions[index] ? 'font-semibold scale-[1.02]' : ''}`}>
            {docId} Form: {Math.floor(index / 2) + 1} Page: {(index % 2) + 1} Signature: {index + 1}
          </span>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 group-hover:text-[#111827] ${openAccordions[index] ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openAccordions[index] ? 'max-h-[2400px] opacity-100 transform-gpu' : 'max-h-0 opacity-0'}`}>
        <div className="bg-gray-50 rounded-xl p-10 space-y-16 mt-8 transform-gpu transition-all duration-500 hover:shadow-xl">
          {/* Form Review Section */}
          <div className="p-10 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.01] group">
            <h3 className="text-[#111827] text-2xl font-bold mb-8 group-hover:translate-x-1 transition-transform duration-300">Form Validation Overview</h3>
            
            <div className="flex gap-12">
              {/* Image Section - Left Side */}
              <div className="w-2/5 shrink-0">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <ImageViewer
                    src="/coffee.jpg"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Table Section - Right Side */}
              <div className="flex-1">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-center py-4 px-4 text-sm font-bold text-[#111827] w-1/3">Form Fields</th>
                          <th className="text-center py-4 px-4 text-sm font-bold text-[#111827] w-1/3">System Results</th>
                          <th className="text-center py-4 px-4 text-sm font-bold text-[#111827] w-1/3">Disagree</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((item) => (
                        <tr key={item} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Field {item}</td>
                          <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Result {item}</td>
                          <td className="py-5 px-4 text-center">
                            <input 
                              type="checkbox" 
                              className="w-5 h-5 rounded border-gray-300 text-[#111827] focus:ring-[#111827] cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Field 5</td>
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Result 5</td>
                        <td className="py-5 px-4 text-center">
                          <div className="space-y-2">
                            <p className="text-xs text-gray-500">Disagree with evaluation

</p>
                            <select 
                              className="w-full py-2.5 px-3 text-base border-gray-200 rounded-lg focus:border-[#111827] focus:ring-[#111827] cursor-pointer bg-white shadow-sm text-gray-700"
                            >
                              <option value="" className="text-gray-700">Select</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="py-6 text-center">
                          <label className="inline-flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              className="w-5 h-5 rounded border-gray-300 text-[#111827] focus:ring-[#111827]"
                              onChange={(e) => {
                                const label = e.target.nextSibling;
                                if (label) {
                                  label.textContent = e.target.checked ? 'This form is NOT human legible' : 'This form is human legible';
                                }
                              }}
                            />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">This form is human legible</span>
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Validation */}
          <div className="p-10 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-[#111827] text-2xl font-bold mb-8">Signature Validation</h3>
            
            <div className="flex gap-12">
              {/* Signature Validation */}
              <div className="w-2/5 shrink-0">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <ImageViewer
                    src="/coffee.jpg"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="flex-1 pt-2">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-center py-4 px-4 text-sm font-bold text-[#111827] w-1/3">Form Fields</th>
                          <th className="text-center py-4 px-4 text-sm font-bold text-[#111827] w-1/3">System Results</th>
                          <th className="text-center py-4 px-4 text-sm font-bold text-[#111827] w-1/3">Disagree</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Signature Field 1</td>
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Signature Result 1</td>
                        <td className="py-5 px-4 text-center">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded border-gray-300 text-[#111827] focus:ring-[#111827] cursor-pointer"
                          />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Signature Field 2</td>
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Signature Result 2</td>
                        <td className="py-5 px-4 text-center">
                          <div className="space-y-2">
                            <p className="text-xs text-gray-500">Disagree with evaluation

</p>
                            <select 
                              className="w-full py-2.5 px-3 text-base border-gray-200 rounded-lg focus:border-[#111827] focus:ring-[#111827] cursor-pointer bg-white shadow-sm text-gray-700"
                            >
                              <option value="" className="text-gray-700">Select</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Additional Info 1</td>
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Additional Info 2</td>
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Additional Info 3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Printed Name */}
          <div className="p-10 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-[#111827] text-2xl font-bold mb-8">Printed Name</h3>
            
            <div className="flex gap-12">
              {/* Printed Name */}
              <div className="w-2/5 shrink-0">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
                  <ImageViewer
                    src="/coffee.jpg"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="flex-1 pt-2">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-center py-4 px-4 text-sm font-bold text-[#111827] w-1/3">Form Fields</th>
                        <th className="text-center py-4 px-4 text-sm font-bold text-[#111827] w-1/3">System Results</th>
                        <th className="text-center py-4 px-4 text-sm font-bold text-[#111827] w-1/3">Disagree</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Name Field 1</td>
                        <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Name Result 1</td>
                        <td className="py-5 px-4 text-center">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded border-gray-300 text-[#111827] focus:ring-[#111827] cursor-pointer"
                          />
                        </td>
                      </tr>
                      {[2, 3, 4, 5].map((item) => (
                        <tr key={item} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center">Name Field {item}</td>
                          <td className="py-5 px-4 text-sm font-medium text-gray-700 text-center italic">Coming soon</td>
                          <td className="py-5 px-4 text-center">
                            {/* <input 
                              type="checkbox" 
                              className="w-5 h-5 rounded border-gray-300 text-[#111827] focus:ring-[#111827] cursor-pointer"
                            /> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="w-full bg-[#111827]/10 backdrop-blur-lg border-b border-[#111827]/5 p-6 flex justify-between items-center fixed top-0 z-20">
        <div className="flex items-center gap-5">
          {/* Company Logo Placeholder */}
          <div className="w-9 h-9 bg-[#111827] rounded-xl flex items-center justify-center text-white text-sm font-medium shadow-lg shadow-gray-200">
            SF
          </div>
          {/* Company Title */}
          <h1 className="text-lg font-medium text-[#111827] tracking-tight">State Farm</h1>
        </div>
        
        {/* Avatar Placeholder */}
        <div className="w-9 h-9 relative rounded-full ring-4 ring-white shadow-md overflow-hidden">
          <Image
            src="/coffee.jpg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-32">
        <div className="flex flex-col items-center bg-white rounded-2xl p-8 shadow-xl shadow-gray-100/50">
          {/* Input Label */}
          <label className="text-sm text-[#111827]/80 mb-3 self-start font-medium">
            Enter the iSEIT Key or document ID to get started.
          </label>
          
          {/* Input Group */}
          <div className="flex w-full gap-3 items-center">
            {/* Input with Tooltip */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="iSEIT Key or Doc ID *"
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111827]/20 focus:border-[#111827] placeholder-gray-400 text-gray-900 font-medium transition-all duration-300 hover:shadow-inner"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
                <button 
                  className="text-gray-400 hover:text-[#111827] w-5 h-5 flex items-center justify-center transition-all duration-300 hover:rotate-12"
                >
                  ?
                </button>
                <div className="absolute right-0 top-8 w-48 p-3 bg-[#111827] text-white/90 text-xs rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 shadow-xl shadow-gray-900/10 transform-gpu group-hover:translate-y-0 translate-y-2">
                  This is a helpful tooltip explaining what the key is for
                </div>
              </div>
            </div>

            {/* Form Count Selector */}
            <div className="w-40">
              <select
                value={formCount}
                onChange={(e) => setFormCount(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111827]/20 focus:border-[#111827] text-gray-900 font-medium bg-white cursor-pointer transition-all duration-200"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Form{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Enter Button */}
            <button 
              onClick={() => !showAccordion && setShowAccordion(true)}
              className="px-8 py-3 bg-[#111827] text-white rounded-xl hover:shadow-lg hover:shadow-gray-200 transition-all duration-300 font-medium text-sm relative overflow-hidden group hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Enter</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          {/* Accordion Sections */}
          {showAccordion && (
            <div className="w-full space-y-8 mt-8 animate-fadeIn">
              {/* Results Heading */}
              <div className="w-full text-center animate-slideDown">
                <h2 className="text-3xl font-bold text-[#111827] mb-8 hover:scale-105 transition-transform duration-300">Results</h2>
              </div>

              {/* Dynamic Accordions */}
              {Array.from({ length: formCount }, (_, i) => renderAccordion(i))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-[#111827]/5 bg-[#111827]/10 backdrop-blur-lg fixed bottom-0 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="font-bold text-[#111827] mb-2">Notice</p>
            <p className="text-sm text-gray-600">All form data is securely processed and validated in real-time.</p>
          </div>
        </div>
      </footer>

      {/* Add padding bottom to account for fixed footer */}
      <div className="pb-28"></div>
    </main>
  );
}
