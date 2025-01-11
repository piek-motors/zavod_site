"use client"
import { useEffect } from "react"

export default function CodeCopy() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre code")

    codeBlocks.forEach((block: any) => {
      const code = block.textContent || block.innerText

      // Create the "Copy" button using MUI Joy Button
      const button = document.createElement("button")
      button.innerText = "Copy"
      button.style.position = "absolute"
      button.style.top = "8px"
      button.style.right = "8px"

      // MUI Joy Button styles
      button.classList.add("mui-copy-button")
      button.style.padding = "4px 12px"
      button.style.fontSize = "14px"
      button.style.cursor = "pointer"
      button.style.backgroundColor = "rgba(0, 0, 0, 0.3)" // Slight background for visibility
      button.style.border = "none"
      button.style.borderRadius = "4px"
      button.style.transition = "background-color 0.3s ease" // Smooth transition effect for hover
      button.style.zIndex = "1"

      // Add the "Copy" button to the code block container
      block.parentElement.style.position = "relative" // Ensure the container has relative positioning
      block.parentElement?.appendChild(button)

      // Copy code to clipboard on button click
      button.addEventListener("click", () => {
        navigator.clipboard.writeText(code).then(
          () => {
            // Change button text to "Copied!" for 2 seconds
            button.innerText = "Copied"
            button.style.backgroundColor = "#4caf50" // Green background for success
            setTimeout(() => {
              button.innerText = "Copy"
              button.style.backgroundColor = "rgba(0, 0, 0, 0.1)" // Reset color
            }, 2000)
          },
          (err) => {
            console.error("Failed to copy text: ", err)
          }
        )
      })
    })
  }, [])

  return <></>
}
