import styleOf from './Notification.module.scss'

const Notification = ({notificationNumber}) => {
  return (
    <div
      className={`
        top-1
        right-1
        text-xs
        absolute
        text-white
        rounded-full
        bg-red-500
        inline-block
        ${styleOf.bubble}
      `}
    >
      {notificationNumber}
    </div>
  )
}

export default Notification;
