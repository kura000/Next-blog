import { client } from "../libs/client";
import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import TextLink from "../components/TextLink";

export default function Home({blog, category}){
  return (
    <Layout title="ホーム">
      <div className="index">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="lg:mr-20">
            <p className="text-3xl font-bold">my memos</p>
            <p className="mt-10 leading-loose">web制作についての発見や<br />日常の試行錯誤をメモしています。</p>
          </div>
          <div className="mt-10 md:mt-0 max-w-2xl">
            <img src="/mvImage.svg" />
          </div>
        </div>

        {category.map((cate)=>{
          return (
            <section key={cate.id} className="mt-24">
              <BlogList blogData={blog} category={cate} color={cate.color} ></BlogList>

              <TextLink to={`/category/${cate.categoryId}`} text="一覧ページへ" arrowPosition="right" ></TextLink>

            </section>
          )
        })}

      </div>
    </Layout>
  );
};

// データを取得してテンプレートに受け渡す処理
export const getStaticProps = async () => {
  const data = await client.get({endpoint:"blog"});
  const category = await client.get({endpoint:"category"});

  return {
    props: {
      blog: data.contents,
      category: category.contents,
    },
  };
};

