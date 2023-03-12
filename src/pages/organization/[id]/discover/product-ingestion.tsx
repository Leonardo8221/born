import React from "react";
import AddProduct from "@/components/page-components/showcase/AddProduct";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/page-components/showcase/Header";

export default function ProductIngestion() {
  return (
    <div>
      <Header heading="Product ingestion tool" />
      <AddProduct />
      <Footer />
    </div>
  );
}
