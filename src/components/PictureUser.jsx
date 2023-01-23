import styleOf from './PictureUser.module.scss'

const PictureUser = ({imageUser, layoutOneColumn}) => {
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
        className={`${layoutOneColumn ? 'max-w-none h-full rounded-full' : 'rounded-full'}`}
      />
    </div>
  )
}

export default PictureUser;
