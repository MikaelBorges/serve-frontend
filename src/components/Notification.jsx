import styleOf from './Notification.module.scss'

const Notification = ({notificationNumber}) => {
  return (
    <div
      className={`
        top-0
        right-0
        text-xs
        absolute
        text-white
        rounded-full
        text-center
        bg-red-500
        inline-block
        ${styleOf.bubble}
      `}
    >
      {notificationNumber}
    </div>
  )
}

export default Notification
