import React from "react"

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="max-w-6xl lg:mx-auto p-5 md:px-10 lg:px-0 w-full grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-8">
          <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]">
            RentRite: Feel at Home, Whatever You Are!
          </h1>

          <p className="text-[20px] md:text-[24px] font-normal leading-[30px] md:leading-9 tracking-[2%]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
            repudiandae nihil fuga iusto corporis vel obcaecati a inventore,
            neque quas, ipsa odio similique eligendi error in unde quibusdam
            molestiae possimus! Molestias eos ut pariatur voluptatem consequatur
            modi! Quia, ab ratione!
          </p>
        </div>

        <img
          src="https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=1024x1024&w=is&k=20&c=Fx6PnBDpDp2ayw7hA3EABr6a8aDGldqN8zVVuquYgYI="
          alt=""
          width={1000}
          height={1000}
          className="max-h-[70vh] object-contain object-center"
        />
      </div>
    </div>
  )
}

export default Hero
