import Link from "next/link";
import { CollectionCard } from "@/components/molecules/CollectionCard";
import Footer from "@/components/layouts/Footer";
import backgroundImageSrc from "@/assets/images/collection-card/collection-card-background-image.png";
import imageSrc from "@/assets/images/collection-card/inner-collection-card-image.png";

const CollectionsPage = () => {
  const collections = [
    {
      slug: 1,
      backgroundImageSrc,
      label: "SS23",
      imageSrc,
      author: 'by Irene Lance',
      description: 'For the past 40 years Ballot-Flurin has been leading the industry and provide wellness solutions.',
    },
    {
      slug: 2,
      backgroundImageSrc,
      label: "SS23",
      imageSrc,
      author: 'by Irene Lance',
      description: 'For the past 40 years Ballot-Flurin has been leading the industry and provide wellness solutions.',
    },
    {
      slug: 3,
      backgroundImageSrc,
      label: "SS23",
      imageSrc,
      author: 'by Irene Lance',
      description: 'For the past 40 years Ballot-Flurin has been leading the industry and provide wellness solutions.',
    },
  ]
  return (
    <div className="mt-12">
      <div className="min-h-[calc(100vh-120px)]">
        {
          collections.map(item => (
            <div key={item.slug} className="mb-[96px]">
              <Link href={`/organization/1/discover/collections/${item.slug}`}>
                <CollectionCard
                  backgroundImageSrc={item.backgroundImageSrc}
                  label={item.label}
                  author={item.author}
                  imageSrc={item.imageSrc}
                />
              </Link>
              <div className="mt-8">
                <p className="max-w-[544px] mx-auto text-shades-black text-center text-[18px] tracking-[0.06em] leading-[32px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  )
}

export default CollectionsPage;
