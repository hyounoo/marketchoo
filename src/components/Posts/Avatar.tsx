import Image from 'next/image'
import { urlForImage } from '../../lib/sanity'
import { Author } from '../../models/Author'

export default function Avatar({ name, picture }: Author) {
  const src = urlForImage(picture).height(96).width(96).fit('crop').url()
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        {src && <Image src={src} layout="fill" className="rounded-full" alt={name} />}
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}
