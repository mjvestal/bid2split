import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react';

export default function ShareSplitInput({
  splitUid,
}: {
  splitUid: string,
}) {
  const value = `https://bid2split.com/split/${splitUid}`;
  const [done, setDone] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value).then(() => {
      setDone(true);
    });
  };

  return (
    <>
      <div className="flex w-full">
        <input 
          type="url" 
          className="rounded-none rounded-l-lg border-gray-300 shadow-sm focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50 block flex-1 min-w-0 w-full text-sm p-2.5" 
          readOnly={true}
          value={value}
        />
        <button 
          className="inline-flex items-center px-3 text-lg text-cyan-800 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300"
          onPointerDown={copyToClipboard}>
          <FontAwesomeIcon icon={faCopy} size="lg" />
        </button> 
      </div>
      {done && <p className="mt-2">Copied to clipboard!</p>}
    </>
  )
}