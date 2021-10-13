import { client } from "../../libs/client";
import Link from "next/link";
import Layout from "../../components/Layout";
import dayjs from 'dayjs';
import cheerio from 'cheerio';
import 'highlight.js/styles/night-owl.css';
import hljs from 'highlight.js';
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export default function BlogId({blog, toc, layout}){

  return (
    <Layout title="記事詳細">
      <div className={`detail ${layout}`}
      >

        <div className="lg:flex justify-between">

          <div className="detail__sideBar lg:order-2 lg:block hidden">
            <ul className="detail__nav bg-white m-0 p-4 sticky">
              <li className="detail__navTitle border-b border-gray-300 font-bold">INDEX</li>
              {toc.map((content) => (
                <li className={`detail__navItem detail__nav${content.name}`} key={content.id}>
                  <ScrollLink
                    to={content.id}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    >
                    {content.text}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail__body markdown lg:order-1">
            <div className="flex justify-start">
              <span className="blog-cate pr-4 lg:pr-8 text-sm lg:text-md">
                {blog.category && `${blog.category.categoryName}`}
              </span>
              <span className="blog-date text-sm lg:text-md">
                {dayjs(blog.publishedAt).format('YYYY-MM-DD')}
              </span>
            </div>

            <h1 className="blog-title font-bold my-8 lg:my-12 text-2xl lg:text-3xl">
              {blog.title}
            </h1>

            <div className="detail__sideBar lg:hidden block">
              <ul className="detail__nav bg-white m-0 p-4">
                <li className="detail__navTitle border-b border-gray-300 font-bold">INDEX</li>
                {toc.map((content) => (
                  <li className={`detail__navItem detail__nav${content.name}`} key={content.id}>
                    <ScrollLink
                      to={content.id}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      >
                      {content.text}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {blog.body.map((bodyItem, index)=>{
                return(
                  <div dangerouslySetInnerHTML={{ __html:bodyItem.content }} key={index}></div>
                )
              })}
            </div>
          </div>
        </div>
      </div>


      <div className="btn text-center mt-32">
        <Link href={`/category/${blog.category.categoryId}`}>
          <a className={`inline-block p-6 w-full text-white font-semibold text-lg rounded-sm bg-${blog.category.color}-500 border border-${blog.category.color}-500 hover:bg-${blog.category.color}-600 duration-500`}>記事一覧に戻る</a>
        </Link>
      </div>

    </Layout>
  );
}

// 静的生成ためのパスを指定する。
export const getStaticPaths = async () => {
  const data = await client.get({endpoint: "blog"});

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {paths, fallback:false};
}

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({endpoint:"blog", contentId: id});


  // 本文内:リッチエディタブロックを加工する
  let $;
  let toc = new Array();
  data.body.map((bodyItem)=>{
    if (bodyItem.fieldId === 'editor' && bodyItem.content !== "") {

      // シンタックスハイライトを入れる
      $ = cheerio.load(bodyItem.content);
      $('pre code').each((_, elm) => {
        const result = hljs.highlightAuto($(elm).text());
        $(elm).html(result.value);
        $(elm).addClass('hljs');
      })
      bodyItem.content = $.html();

      // 目次の抜き出し
      const headings = $('h1, h2, h3').toArray();
      headings.map((data, index) => {
        const item = {
          text: data.children[0].data,
          id: data.attribs.id,
          name: data.name
        }
        toc.push(item);
      });
    }
  })


  // カテゴリー毎にレイアウトを変更する
  let layout = '';
  if (data.category.categoryId === 'code' ){
    // コードスニペットのみ１カラム
    layout = 'layout--1col';
  } else {
    layout = 'layout--2col';
  }

  return {
    props: {
      blog: data,
      toc: toc,
      layout: layout,
    },
  };
};
