import Image from 'next/image';

export default function ListingPreviewCard({
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
    <div className="rounded-lg shadow bg-slate-100">
      <a href={url} target="_blank" rel="noreferrer noopener">
          <img
            className="rounded-tl-lg rounded-tr-lg w-full aspect-video object-fill"
            src={image}
            alt={title}
          />
      </a>
      <div className="px-2 py-2">
        <div className="text-lg line-clamp-2">
          <a href={url} target="_blank" rel="noreferrer noopener">{title}</a>
        </div>
        <div className="mt-1 uppercase text-xs">{domain}</div>
        <div className="mt-1"><strong>${price}</strong> total price</div>
      </div>
    </div>
  )
}