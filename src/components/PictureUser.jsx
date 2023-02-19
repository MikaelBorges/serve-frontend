import styleOf from './PictureUser.module.scss'

const PictureUser = ({imageUser}) => {
  return (
    <div
      className={`
        flex
        m-auto
        flex-col
        cursor-pointer
        justify-center
        ${styleOf.minWidthPictureContainer}
      `}>
      <img
        src={imageUser}
        alt="image de l'utilisateur"
        className='rounded-full'
      />
    </div>
  )
}

export default PictureUser;
