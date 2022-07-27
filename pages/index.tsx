import { getLayout } from "@layouts/default-layout";
import Page, { Meta } from "@layouts/page";
import Home from "@templates/home";
import { PageProps, PageWithLayout } from "@types";

interface Props extends PageProps {}

const HomePage: PageWithLayout<Props> = ({}) => {
  const meta: Meta = {
    title: "Home Page",
    description: "Some Desc",
  };

  return (
    <Page meta={meta}>
      <Home />
    </Page>
  );
};

HomePage.getLayout = (page, props) => getLayout(page, { ...props }, {});
