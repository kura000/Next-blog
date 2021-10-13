import { client } from "../libs/client";
import Layout from "../components/Layout";
import TextLink from "../components/TextLink";

export default function About({data, mail}){

  return (
    <Layout title="about">
      <div className="about">
        <section className="markdown">
          <h1 className="text-center font-bold text-2xl">{data.title}</h1>
          <div className="flex justify-center">
            <div className="mt-8" dangerouslySetInnerHTML={{ __html:data.body }}></div>
          </div>
        </section>
        <section className="mt-24">
          <h2 className="text-center font-bold text-2xl">お問い合わせ</h2>
          <div className="flex justify-center">
            <div className="mt-8" dangerouslySetInnerHTML={{ __html:mail.body}}></div>
          </div>
        </section>

        <TextLink text="もどる" to="/" arrowPosition="left"></TextLink>
      </div>
    </Layout>
  );
};

// データを取得してテンプレートに受け渡す処理
export const getStaticProps = async () => {
  const data = await client.get({endpoint:"page"});
  let about = new Object();
  let mail = new Object();
  data.contents.map((page) => {
    if (page.pageId === 'about'){
      about = page;
    } else if (page.pageId === 'mail') {
      mail = page;
    };
  });

  return {
    props: {
      data: about,
      mail: mail,
    },
  };
};

