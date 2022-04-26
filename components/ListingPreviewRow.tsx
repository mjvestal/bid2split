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
    <div className="flex items-center px-2 py-2 space-x-4">
      <a href={url} target="_blank" rel="noreferrer noopener">
          <img
            className="rounded object-fill w-48"
            src={image}
            alt={title}
          />
      </a>
      <div className="flex-grow ms">
        <div className="line-clamp-2">
          <a href={url} target="_blank" rel="noreferrer noopener">{title}</a>
        </div>
        <div className="mt-1 uppercase text-xs">{domain}</div>
        <div className="mt-1"><strong>${price}</strong> total price</div>
      </div>
    </div>
  )
}