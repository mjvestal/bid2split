import ListingDomain from "./ListingDomain";
import formatPrice from "lib/formatPrice";

export default function ListingPreviewCard({
  currency,
  domain,
  image,
  price,
  title,
  url,
}: {
  currency: string,
  domain: string,
  image: string,
  price: number,
  title: string,
  url: string,
}) {
  return (
    <div className="max-w-md mx-auto bg-slate-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <a className="h-48 w-full md:h-full md:w-48" href={url} target="_blank" rel="noreferrer noopener">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={image}
              alt={title}
            />
          </a>
        </div>
        <div className="p-6 md:pt-8">
          <ListingDomain domain={domain} />
          <a 
            className="text-lg leading-tight mt-1 font-medium line-clamp-2 hover:underline"
            href={url} 
            target="_blank" 
            rel="noreferrer noopener">
            {title}
          </a>
          <div className="mt-1"><strong>{formatPrice(price, currency)}</strong> total price</div>
        </div>
      </div>
    </div>
  )
}