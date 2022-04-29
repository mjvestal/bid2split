import ListingDomain from "./ListingDomain";

export default function ListingPreviewRow({
  domain,
  image,
  price,
  title,
  url,
}: {
  domain: string,
  image: string,
  price: number,
  title: string,
  url: string,
}) {
  return (
    <div className="w-full bg-slate-100 shadow-md overflow-hidden">
      <div className="flex">
        <div className="shrink-0">
          <a className="h-full w-24" href={url} target="_blank" rel="noreferrer noopener">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="object-cover h-full w-24"
              src={image}
              alt={title}
            />
          </a>
        </div>
        <div className="p-2">
          <ListingDomain domain={domain} />
          <a 
            className="text-lg leading-tight font-medium line-clamp-2 hover:underline"
            href={url} 
            target="_blank" 
            rel="noreferrer noopener">
            {title}
          </a>
          <div className="mt-1"><strong>${price}</strong> total price</div>
        </div>
      </div>
    </div>
  )
}