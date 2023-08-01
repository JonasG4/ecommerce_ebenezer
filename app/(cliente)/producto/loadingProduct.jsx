export default function LoadingProduct() {
  return (
    <section className='w-full flex gap-5 py-2'>
        <article className='flex flex-col gap-2'>
            <div className='relative w-full h-[20px] bg-gray-200 skeleton'></div>
            <div className='relative w-full h-[400px] bg-gray-200 skeleton'></div>
                <div className='flex gap-2 w-full mt-2'>
                    <div className='relative w-[100px] h-[100px] bg-gray-200 skeleton'></div>
                    <div className='relative w-[100px] h-[100px] bg-gray-200 skeleton'></div>
                    <div className='relative w-[100px] h-[100px] bg-gray-200 skeleton'></div>
                    <div className='relative w-[100px] h-[100px] bg-gray-200 skeleton'></div>
                    <div className='relative w-[100px] h-[100px] bg-gray-200 skeleton'></div>
                </div>
            <div className='relative w-full h-[150px] bg-gray-200 skeleton'></div>
              
        </article>
        <article className='flex flex-col gap-2 w-full'>
            <div className='relative w-full h-[40px] bg-gray-200 skeleton'></div>
            <div className='relative w-full h-[20px] bg-gray-200 skeleton'></div>
            <div className='relative w-[100px] h-[40px] mt-4 bg-gray-200 skeleton'></div>
            <div className='relative w-full h-[350px] bg-gray-200 skeleton'></div>
              <div className="flex flex-col gap-2 mt-4 ml-auto">
                <div className='relative w-[250px] h-[40px] bg-gray-200 skeleton'></div>
                <div className='relative w-[250px] h-[40px] bg-gray-200 skeleton'></div>
              </div>
        </article>
    </section>
  )
}

