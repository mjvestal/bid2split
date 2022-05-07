import { useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head';
import { faCopy } from '@fortawesome/free-regular-svg-icons'

function iosCopyToClipboard(element: HTMLInputElement) {
  const oldContentEditable = element.contentEditable;
  const oldReadOnly = element.readOnly;
  const range = document.createRange();

  element.contentEditable = 'true';
  element.readOnly = false;
  range.selectNodeContents(element);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  element.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

  element.contentEditable = oldContentEditable;
  element.readOnly = oldReadOnly;

  document.execCommand('copy');

  selection?.removeAllRanges();
}

export default function ShareSplitInput({
  splitUid,
}: {
  splitUid: string,
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const value = `https://bid2split.com/split/${splitUid}`;
  const [done, setDone] = useState(false);
  const copyToClipboard = () => {
    if (inputRef.current != null && navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      iosCopyToClipboard(inputRef.current);
      setDone(true);
      return;
    }
    navigator.clipboard.writeText(value).then(() => {
      setDone(true);
    });
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div className="flex w-full">
        <input 
          type="url" 
          className="rounded-none rounded-l-lg border-gray-300 shadow-sm focus:border-cyan-300 focus:ring focus:ring-cyan-200 focus:ring-opacity-50 block flex-1 min-w-0 w-full text-sm p-2.5" 
          readOnly={true}
          ref={inputRef}
          value={value}
        />
        <button 
          className="inline-flex items-center px-3 text-lg text-cyan-800 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300"
          onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faCopy} size="lg" />
        </button> 
      </div>
      {done && <p className="mt-2 text-cyan-800">Copied to clipboard!</p>}
    </>
  )
}