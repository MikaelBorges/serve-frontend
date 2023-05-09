import { connect } from 'react-redux'
import 'swiper/css'
import 'swiper/css/scrollbar'
//import './swiper-custom.scss'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect } from 'react'
import { retrieveUserAd } from '../api/ads'
import { useParams } from 'react-router-dom'

function ViewAdPage({user, handleSearchBarVisibility}) {
  const { urlId } = useParams()
  const [ad, setAd] = useState({})

  useEffect(() => {
    handleSearchBarVisibility(false)

    retrieveUserAd(urlId)
    .then((res) => {
      console.log('res', res)
      setAd(res.adRetrieved)
    })
  }, [])

  return(
    <>
      <Swiper className='aspect-square swiper-custom-scrollbar' scrollbar={{hide: false}} navigation={true} modules={[Navigation, Scrollbar]}>
        {ad.imagesWork?.map((imageWork, index) =>
          <SwiperSlide
            key={ad._id}
            onClick={() => console.warn('display image bigger')}
          >
            <img
              src={imageWork}
              alt='image du service' />
          </SwiperSlide>
        )}
      </Swiper>
      <div className='p-2 dark:text-white'>
      <p className='text-xs'>Annonce mise en ligne le {ad.dateOfPublication}</p>
        <h1 className='text-3xl dark:text-white'>{ad.title}</h1>
        <p className='text-2xl'>{ad.price} €/h</p>
        <p>{ad.description}</p>
        <p className='inline-block'>Contacter {ad.firstname} au : <a href="tel:0646478608" className='underline'>06 46 47 86 08</a></p>
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
