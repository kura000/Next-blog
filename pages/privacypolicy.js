import { client } from "../libs/client";
import Layout from "../components/Layout";
import TextLink from "../components/TextLink";

export default function PrivacyPolicy({data}){

  return (
    <Layout title="privacy policy">
      <div className="policy">
        <section className="markdown">
          <h1 className="text-center font-bold text-2xl">{data.title}</h1>

          <div className="mt-8" dangerouslySetInnerHTML={{ __html:data.body }}></div>

        </section>

        <TextLink text="もどる" to="/" arrowPosition="left"></TextLink>

      </div>
    </Layout>
  );
};

// データを取得してテンプレートに受け渡す処理
export const getStaticProps = async () => {
  const data = await client.get({endpoint:"page"});
  let policy = new Object();
  data.contents.map((page) => {
    if (page.pageId === 'policy'){
      policy = page;
    };
  });

  return {
    props: {
      data: policy,
    },
  };
};

