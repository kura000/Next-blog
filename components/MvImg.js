import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const MyImage = (props) => {
  return (
    <Image
      loader={myLoader}
      src="mvImage.svg"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}

export default myLoader