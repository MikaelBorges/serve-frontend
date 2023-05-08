import { connect } from 'react-redux'
import 'swiper/css'
import 'swiper/css/scrollbar'
//import './swiper-custom.scss'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import image1 from '../assets/images/test/images.jpeg'
import image2 from '../assets/images/test/Screen-Shot-2022-09-23-at-2.54.16-PM.webp'
import image3 from '../assets/images/test/volkswagen-thing-thing-white_8526352698.jpeg'

function ViewAdPage({user}) {

  return(
    <>
      <Swiper className='aspect-square swiper-custom-scrollbar' scrollbar={{hide: false}} navigation={true} modules={[Navigation, Scrollbar]}>
        <SwiperSlide onClick={() => console.warn('display image bigger')}><img src={image1} alt="" /></SwiperSlide>
        <SwiperSlide onClick={() => console.warn('display image bigger')}><img src={image2} alt="" /></SwiperSlide>
        <SwiperSlide onClick={() => console.warn('display image bigger')}><img src={image3} alt="" /></SwiperSlide>
      </Swiper>
      <div className='p-2 dark:text-white'>
      <p className='text-xs'>Annonce mise en ligne le 07/05/2023</p>
        <h1 className='text-3xl dark:text-white'>Titre de l'annonce</h1>
        <p className='text-2xl'>10 €/h</p>
        <p>Description de l'annonce...</p>
        <span>Contacter John au : </span><a href="tel:0618564666" className='underline'>06 18 56 46 66</a>
      </div>
    </>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    likedAd: store.likedAd
  }
}

export default connect(mapStateToProps)(ViewAdPage)
