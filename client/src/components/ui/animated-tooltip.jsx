import React, { useState } from 'react'
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring
} from 'framer-motion'
import { Link } from 'react-router-dom'

export const AnimatedTooltip = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0) // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  )
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  )
  const handleMouseMove = event => {
    const halfWidth = event.target.offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth) // set the x value, which is then used in transform and rotate
  }
  const visibleItems = items?.slice(0, 6)
  const remainingCount = items?.length - visibleItems?.length

  return (
    <div className='flex items-center gap-x-6'>
      {visibleItems?.map((item, idx) => (
        <div
          className='-mr-4  relative group'
          key={item?.username}
          onMouseEnter={() => setHoveredIndex(item?._id)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence mode='wait'>
            {hoveredIndex === item?._id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 10
                  }
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: 'nowrap'
                }}
                className='absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2'>
                <div className='absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px ' />
                <div className='absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px ' />
                <div className='font-bold text-white relative z-30 text-base'>
                  <Link to={`profile/${item?._id}`}>{item?.username}</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            onMouseMove={handleMouseMove}
            height={10}
            width={10}
            src={item?.avatar}
            alt={item?.username}
            className='object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500'
          />
        </div>
      ))}
      {remainingCount > 6 && (
        <div className='-mr-4 relative group'>
          <div className='font-bold text-white relative z-30 text-base'>
            +{remainingCount}
          </div>
        </div>
      )}
    </div>
  )
}
