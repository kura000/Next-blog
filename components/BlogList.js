import Link from "next/link";
import dayjs from 'dayjs';

const BlogList = (props) => {
  const { blogData, category, color } = props
  const bgColor = `bg-${color}-500`

  return(
    <div>
        <h2 className="text-2xl font-bold"> {category.categoryName} </h2>
        <ul className="mt-8">
        { blogData.map((blog) => {
          return (
            category.id === blog.category.id &&
            <li key={blog.id} className="mt-4">
              <Link href={`/blog/${blog.id}`}>
                <a className={"block md:flex md:items-center w-full p-6 md:px-8 md:py-4 text-white rounded-md shadow-2xl transform hover:scale-105 transition duration-500 " + bgColor }>

                  <p className="blog__date md:mr-8 text-sm md:text-md">
                    {dayjs(blog.updatedAt).format('YYYY-MM-DD')}
                  </p>

                  <p className="blog__title font-bold text-md md:text-xl mt-2 md:mt-0 md:mr-8">
                    {blog.title}
                  </p>

                  <div className="flex">
                    { blog.tag.length &&
                      blog.tag.map((item, index) => {
                        return (
                          <p className="blog__tag" key={index}>
                            <span className="inline-block ml-2 py-2 px-3 border border-white rounded-full text-xs md:text-sm mt-4 md:mt-0">
                              {item.tagName}
                            </span>
                          </p>
                        )
                      })
                    }
                  </div>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BlogList