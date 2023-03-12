import React from 'react';
import AddProduct from '@/components/page-components/showcase/AddProduct';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/page-components/showcase/Header';
import { useRouter } from 'next/router';

export default function ProductIngestion() {
  const router = useRouter();

  return (
    <div>
      <Header
        heading="Product ingestion tool"
        href={`/organization/${router.query.id}/discover?tab=products`}
      />
      <AddProduct />
      <Footer />
    </div>
  );
}
