import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ShowcaseLayout from '@/components/layouts/ShowcaseLayout';
import Tabs from '@/components/molecules/Tab/Tabs';
import Collections from '@/components/page-components/showcase/Collections';
import ShowcaseLogo from '@/components/page-components/showcase/Logo';
import Products from '@/components/page-components/showcase/Products';
import Story from '@/components/page-components/showcase/Story';
import { Button } from '@/components/molecules/Button';
import { Icon } from '@/components/molecules/Icon';
import { useQuery } from '@apollo/client';
import { ORGANIZATION_QUERY } from '@/queries/organizations';
import Loading from '@/components/page-components/Loading';

const StoryPage = () => {
  const [activeTab, setActiveTab] = useState<string | number>('story');
  const [isAddCollections, setIsAddCollections] = useState(false);
  const router = useRouter();
  const tab = router?.query?.tab;

  const { data, loading } = useQuery(ORGANIZATION_QUERY, {
    variables: { organizationId: Number(router?.query?.id) },
    fetchPolicy: 'cache-and-network',
  });
  const organization = data?.organizationByOrganizationId || {};

  const tabs = [
    {
      id: 'story',
      label: 'Story',
      content: loading ? (
        <Loading message="Fetching data..." />
      ) : (
        <Story
          onViewCollections={() => handleTabChange('collections')}
          organization={organization}
        />
      ),
    },
    {
      id: 'products',
      label: 'Products',
      content: <Products />,
    },
    {
      id: 'collections',
      label: 'Collections',
      content: (
        <Collections
          addCollectionsModal={isAddCollections}
          toggleCollectionsModal={setIsAddCollections}
        />
      ),
    },
  ];

  const handleTabChange = (id: string | number) => {
    if (!router?.query?.id) return;
    router.push(`/organization/${router?.query?.id}/discover?tab=${id}`);
    setActiveTab(id);
  };

  useEffect(() => {
    if (router.isReady) {
      const activeTab = (router.query?.tab || 'story') as string | number;
      handleTabChange(activeTab);
    }
  }, [router.isReady]);

  return (
    <ShowcaseLayout>
      <div className="mx-auto overflow-x-hidden">
        <div className="mx-auto w-full max-w-[1440px] flex justify-between px-[64px]">
          <div className="flex-1"></div>
          <div className="flex-1">
            <ShowcaseLogo logoUrl={organization?.logo_url} name={organization?.name || ''} />
          </div>
          <div className="flex-1">
            {tab && tab !== 'story' && (
              <div className="mt-8">
                <Button
                  as={tab === 'products' ? 'a' : 'button'}
                  variant="link"
                  onClick={() =>
                    tab === 'collections' && setIsAddCollections(true)
                  }
                  href={
                    tab === 'products'
                      ? `/organization/${router?.query?.id}/discover/product-ingestion`
                      : undefined
                  }
                  className="!max-w-[205px] !ml-auto !mr-0"
                >
                  <Icon name="icon-add" />{' '}
                  {tab === 'collections' ? 'Add Collections' : 'Add Products'}
                </Button>
              </div>
            )}
          </div>
        </div>
        <Tabs
          tabs={tabs}
          active={activeTab}
          className="justify-center w-fit mx-auto [&>div]:w-[124px] [&>div:nth-child(2)]:mx-2"
          onTabChange={handleTabChange}
        />
      </div>
    </ShowcaseLayout>
  );
};

export default StoryPage;
