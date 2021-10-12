import { Carousel } from 'react-responsive-carousel';

export default function CallToAction({ slice }) {
  console.log(slice)
  return (
    <div style={{ maxWidth: '600px', margin: '2em auto' }}>
      <Carousel>
        {
          slice.items.map((it, i) => (
            <div key={`it-${i + 1}`}>
              <img src={it.img.url} />
              <p className="legend">Legend {i + 1}</p>
            </div>
          ))
        }
      </Carousel>
      <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
        { slice.primary.buttonText }
      </a>
    </div>
  )
}