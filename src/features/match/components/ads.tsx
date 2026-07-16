import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel'
import { FC, useEffect, useState } from 'react'
import Apparel1 from '@/shared/images/apparel-1.jpg'
import Apparel2 from '@/shared/images/apparel-2.jpg'
import Apparel3 from '@/shared/images/apparel-3.jpg'
import Image from 'next/image'

const MatchAds: FC = () => {
  const ads: import('next/image').StaticImageData[] = [
    Apparel1,
    Apparel3,
    Apparel2,
  ]
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="text-sm text-center font-medium my-2">
          🥇 Kaos Juara 🥇
        </div>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {ads.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image}
                  alt={`apparel-${index + 1}`}
                  width={800}
                  height={800}
                  className="rounded-lg aspect-square"
                  loading="eager"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious size="icon-lg" />
          <CarouselNext size="icon-lg" />
        </Carousel>
        <div className="py-2 text-center text-xs text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </div>
  )
}

export default MatchAds
