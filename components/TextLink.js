import Link from "next/link";

const TextLink = (props) => {
  const { to, text, arrowPosition } = props

  return (
    <div className="text-right">

      { arrowPosition === 'left' &&
        <Link href={to}>
          <a className="inline-block py-2 mt-8 text-lg md:text-xl font-bold hover-underline">
            <img
              src="/arrow.svg"
              alt="arrow"
              width="17"
              height="17"
              className="transform rotate-180 inline-block mr-2 pt-1"
            />
            <span>{text}</span>
          </a>
        </Link>
      }

      { arrowPosition === 'right' &&
        <Link href={to}>
          <a className="inline-block py-2 mt-8 text-lg md:text-xl font-bold hover-underline">
            <span>{text}</span>
            <img
              src="/arrow.svg"
              alt="arrow"
              width="17"
              height="17"
              className="inline-block ml-2 pb-1"
             />
          </a>
        </Link>
      }

    </div>
  )
}

export default TextLink