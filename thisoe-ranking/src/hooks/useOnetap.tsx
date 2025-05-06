"use client"

import { publicEnv } from "@/lib/env"
import { OneTapOptions } from "@/lib/ts"
import { signIn } from "next-auth/react"
import { useCallback } from "react"

export function useOneTap(options: OneTapOptions = {}) {
  const init = useCallback(() => {
    if (typeof window === "undefined") return
    const { google } = window

    if (google?.accounts?.id) {
      google.accounts.id.initialize({
        client_id: publicEnv.GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          if (response.credential) {
            try{
              // Use the standard Google provider instead of a custom credential flow
              await signIn("google", {
                redirect: false,
              })
            }catch (error){
              console.error("Google sign-in error:", error)
            }
          }
        },
        auto_select: options.auto_select ?? true,
        cancel_on_tap_outside: options.cancel_on_tap_outside ?? false,
      })

      // Render the button or prompt One Tap
      if (options.prompt_parent_id) {
        google.accounts.id.renderButton(document.getElementById(options.prompt_parent_id) as HTMLElement, {
          theme: "outline",
          size: "large",
          type: "standard",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left",
        })
      } else {
        google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.error("[ERR] OneTap not displayed:", notification.getNotDisplayedReason())
          } else if (notification.isSkippedMoment()) {
            console.error("[ERR] OneTap skipped:", notification.getSkippedReason())
          } else if (notification.isDismissedMoment()) {
            console.error("[ERR] OneTap dismissed:", notification.getDismissedReason())
          }
        })
      }
    }
  }, [options])

  return { init }
}
