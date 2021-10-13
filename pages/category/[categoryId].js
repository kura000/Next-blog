import { client } from "../../libs/client";
import Layout from "../../components/Layout";
import BlogList from "../../components/BlogList";
import TextLink from "../../components/TextLink";

export default function CategoryId({blog, category}){


  return (
    <Layout title="記事一覧">
      <div className="">
        <section key={category.id} className="mt-24">
          <BlogList blogData={blog} category={category} color={category.color} ></BlogList>
        </section>

        <TextLink to="/" text="トップページへ" arrowPosition="left" ></TextLink>

      </div>
    </Layout>
  );
}

// 静的生成ためのパスを指定する。
export const getStaticPaths = async () => {
  const data = await client.get({endpoint: "category"});

  const paths = data.contents.map((content) => `/category/${content.categoryId}`);
  return {paths, fallback:false};
}

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context) => {
  const categoryId = context.params.categoryId;
  const data = await client.get({endpoint:"blog"});
  const category = await client.get({endpoint:"category"});

  let pickedCategory = new Object();
  category.contents.map((cate) => {
    if (cate.categoryId === categoryId) {
      pickedCategory = cate;
    }
  });

  return {
    props: {
      blog: data.contents,
      category: pickedCategory,
    },
  };
};
