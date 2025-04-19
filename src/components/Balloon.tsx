import { useState } from "react"
import { motion } from "motion/react"

type BalloonState = "deflated" | "inflating" | "flying" | "popped"

const Balloon = () => {
  const [balloonState, setBalloonState] = useState<BalloonState>("deflated")
  const [size, setSize] = useState<number>(100)
  const [pumpCount, setPumpCount] = useState<number>(0)

  const pumpBalloon = () => {
    if (balloonState === "deflated") {
      setBalloonState("inflating")
    }
    setSize(size + 20)
    setPumpCount(pumpCount + 1)

    if (pumpCount >= 4) {
      setBalloonState("flying")
    }
  }

  const popBalloon = () => {
    if (balloonState === "flying") {
      setBalloonState("popped")

      setTimeout(() => {
        setBalloonState("deflated")
        setSize(100)
        setPumpCount(0)
      }, 2000)
    }
  }

  return (
    <>
      <div className="bg-white p-2 rounded shadow mb-4 flex justify-center font-mono">
        {balloonState === "deflated" && "Press the pump button"}
        {balloonState === "inflating" && "Keep pumping"}
        {balloonState === "flying" && "Tap the baloon to pop it"}
        {balloonState === "popped" && "Balloon Popped"}
      </div>

      <div className="flex justify-center items-center">
        {balloonState !== "popped" && (
          <motion.img
            src="./src/images/Balloon.png"
            onClick={popBalloon}
            className="cursor-pointer"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              objectFit: "contain",
            }}
            animate={
              balloonState === "flying" && {
                x: [0, 100, -50, 150, -100, 50, 0],
                y: [0, -50, -30, -80, -20, -60, 0],
              }
            }
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}

        {balloonState === "popped" && (
          <div className="flex justify-center items-center text-4xl font-bold text-red-500">
            POP!
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow disabled:bg-gray-400 font-mono"
          onClick={pumpBalloon}
          disabled={balloonState === "flying" || balloonState === "popped"}
        >
          Pump Air
        </button>
      </div>
    </>
  )
}

export default Balloon
