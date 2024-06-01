import React from "react";
// next imports
import Link from "next/link";
// seo
import Container from "@components/Container";
// layout
import DefaultLayout from "@layouts/DefaultLayout";
import Button from "@components/buttons";

const Home = () => {
  const seoMetaInformation = {
    title: "Index",
  };

  return (
    <>
      <Container meta={seoMetaInformation}>
        <DefaultLayout>
          <div className="text-center container mx-auto min-h-[500px] p-10 flex justify-center items-center">
            <div className="space-y-5">
              <div className="text-3xl font-medium text-violet-100">Zuperscore</div>
              <div>
                Lets get you all set up so that you can begin your journey towards finishing your
                goal
              </div>
              <div className="flex justify-center items-center gap-4">
                <Link href="/signin">
                  <a>
                    <Button>Sign In</Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </Container>
    </>
  );
};

export default Home;
